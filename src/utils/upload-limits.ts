// Single source of truth for media upload restrictions. Used by
// config/middlewares.ts (body parser limit), config/plugins.ts (Strapi's own
// size check) and the upload-guard middleware, so they can't drift apart.

// Hard cap per uploaded file. Anything bigger is rejected.
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

// Images whose longest side is bigger than this are scaled down on upload
// (aspect ratio kept, never enlarged). Strapi's own optimization then
// re-encodes at quality 80 on top of that.
export const MAX_IMAGE_DIMENSION = 2400; // px
