import { MAX_UPLOAD_BYTES } from '../src/utils/upload-limits';

export default () => ({
  upload: {
    config: {
      // Strapi's own per-file size check (default is ~1 GB). The upload-guard
      // middleware enforces the same cap plus file type and image dimensions.
      sizeLimit: MAX_UPLOAD_BYTES,
    },
  },
});
