/**
 * Idempotent seed script for the asociacion-info / podcast-crew / podcast
 * youtube_link fixes. Safe to re-run after wiping the DB or repeatedly
 * against an already-seeded one.
 *
 * Usage: node scripts/seed-fixes.js
 */
const fs = require('fs');
const path = require('path');
const { compileStrapi, createStrapi } = require('@strapi/strapi');

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

  // 1. asociacion-info: ensure exactly one entry exists.
  const existingInfo = await app.documents('api::asociacion-info.asociacion-info').findFirst();
  if (existingInfo) {
    console.log('asociacion-info already has an entry, skipping create.');
  } else {
    await app.documents('api::asociacion-info.asociacion-info').create({
      data: {
        descripcion:
          'AECCTI es la asociación de estudiantes que organiza actividades, charlas y proyectos ' +
          'para la comunidad de Ingeniería en Sistemas a lo largo del año académico.',
        foto: placeholder.id,
      },
    });
    console.log('created asociacion-info entry.');
  }

  // 2. podcast-crew: update proposito + hero_image on the existing singleton.
  const crew = await app.documents('api::podcast-crew.podcast-crew').findFirst();
  if (crew) {
    await app.documents('api::podcast-crew.podcast-crew').update({
      documentId: crew.documentId,
      data: {
        proposito:
          "Desde que arrancamos, el equipo de Jack's Cave se ha dedicado a conversar sobre " +
          'tecnología, ciberseguridad y vida universitaria con invitados de la comunidad.',
        hero_image: placeholder.id,
      },
    });
    console.log('updated podcast-crew proposito/hero_image.');
  } else {
    console.log('no podcast-crew entry found, skipping update.');
  }

  // 3. podcast: backfill youtube_link on existing episodes that don't have one yet.
  const episodes = await app.documents('api::podcast.podcast').findMany({});
  for (const episode of episodes) {
    if (episode.youtube_link) continue;
    await app.documents('api::podcast.podcast').update({
      documentId: episode.documentId,
      data: { youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    });
    console.log('backfilled youtube_link for episode', episode.documentId);
  }

  await app.destroy();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
