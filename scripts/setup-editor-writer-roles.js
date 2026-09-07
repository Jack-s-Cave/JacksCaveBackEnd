/**
 * Idempotent setup script for the Writer/Editor admin panel roles.
 *
 * - Writer: can create, read and update article-md entries (drafts), plus
 *   upload/manage media for them. Cannot publish, so their articles never
 *   appear in the public API until an Editor reviews them (article-md
 *   already has draftAndPublish enabled, so this is Strapi's native
 *   behavior - no schema change needed).
 * - Editor: everything a Writer can do, plus publish. Editor is the only
 *   role (besides Super Admin) that can publish article-md entries.
 *
 * Both roles are scoped to article-md only - nothing else (other content
 * types, users, settings, etc.) is touched, so those stay Super Admin only.
 *
 * Safe to re-run: role lookup is by name, and assignPermissions() syncs
 * each role's permission set to exactly the list given here.
 *
 * Usage: node scripts/setup-editor-writer-roles.js
 */
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const ARTICLE_SUBJECT = 'api::article-md.article-md';

const contentManagerPermission = (action) => ({
  action: `plugin::content-manager.explorer.${action}`,
  subject: ARTICLE_SUBJECT,
  fields: null,
  conditions: [],
});

const uploadPermissions = [
  { action: 'plugin::upload.read', subject: null, fields: null, conditions: [] },
  { action: 'plugin::upload.assets.create', subject: null, fields: null, conditions: [] },
  { action: 'plugin::upload.assets.update', subject: null, fields: null, conditions: [] },
];

const WRITER_PERMISSIONS = [
  contentManagerPermission('create'),
  contentManagerPermission('read'),
  contentManagerPermission('update'),
  ...uploadPermissions,
];

const EDITOR_PERMISSIONS = [
  contentManagerPermission('create'),
  contentManagerPermission('read'),
  contentManagerPermission('update'),
  contentManagerPermission('publish'),
  ...uploadPermissions,
];

async function ensureRole(roleService, name, description) {
  let role = await roleService.findOne({ name });
  if (role) {
    console.log(`role already exists: ${name}`);
    return role;
  }
  role = await roleService.create({ name, description });
  console.log(`created role: ${name}`);
  return role;
}

async function run() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  const roleService = app.service('admin::role');

  const writerRole = await ensureRole(
    roleService,
    'Writer',
    'Can create and edit articles as drafts, but cannot publish them.'
  );
  const editorRole = await ensureRole(
    roleService,
    'Editor',
    'Reviews and publishes articles - the only role (besides Super Admin) that can publish.'
  );

  await roleService.assignPermissions(writerRole.id, WRITER_PERMISSIONS);
  console.log('synced Writer permissions.');

  await roleService.assignPermissions(editorRole.id, EDITOR_PERMISSIONS);
  console.log('synced Editor permissions.');

  await app.destroy();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
