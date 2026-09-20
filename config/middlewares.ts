import { MAX_UPLOAD_BYTES } from '../src/utils/upload-limits';

export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  // Must stay right before strapi::body (maps its size error to a 413).
  'global::upload-size-error',
  {
    name: 'strapi::body',
    config: {
      // Stop oversized uploads at the parser instead of buffering up to
      // koa-body's much larger default.
      formidable: { maxFileSize: MAX_UPLOAD_BYTES },
    },
  },
  // Must stay right after strapi::body (needs the parsed files).
  'global::upload-guard',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
