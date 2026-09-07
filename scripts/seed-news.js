/**
 * Idempotent seed script adding a couple more `information` entries so the
 * landing page's AECCTI NEWS carousel has more than one item to cycle
 * through. Safe to re-run - skips entries whose title already exists.
 *
 * Usage: node scripts/seed-news.js
 */
const fs = require('fs');
const path = require('path');
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const ENTRIES = [
  {
    title: 'Nuevo laboratorio de ciberseguridad',
    author: 'Administración',
    date: '2026-02-14',
    photo_description: 'Inauguración del laboratorio de ciberseguridad.',
  },
  {
    title: 'Resultados de la feria de proyectos',
    author: 'Administración',
    date: '2026-03-02',
    photo_description: 'Estudiantes presentando sus proyectos finales.',
  },
];

async function getOrUploadPlaceholder(app) {
  const existing = await app.query('plugin::upload.file').findOne({
    where: { name: 'placeholder.png' },
  });
  if (existing) return existing;

  const filepath = path.join(__dirname, '..', 'favicon.png');
  const stats = fs.statSync(filepath);
  const [file] = await app.plugin('upload').service('upload').upload({
    data: {
      fileInfo: { name: 'placeholder.png', alternativeText: 'placeholder', caption: 'placeholder' },
    },
    files: {
      filepath,
      originalFilename: 'placeholder.png',
      mimetype: 'image/png',
      size: stats.size,
    },
  });
  return file;
}

async function run() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  const placeholder = await getOrUploadPlaceholder(app);

  for (const entry of ENTRIES) {
    const existing = await app.documents('api::information.information').findFirst({
      filters: { title: entry.title },
    });
    if (existing) {
      console.log('already exists, skipping:', entry.title);
      continue;
    }
    await app.documents('api::information.information').create({
      data: { ...entry, photo: placeholder.id },
      status: 'published',
    });
    console.log('created:', entry.title);
  }

  await app.destroy();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
