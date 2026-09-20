/**
 * upload-size-error: turn "file too big" into a proper 413 instead of a 500.
 *
 * strapi::body only recognizes formidable's size error when its message
 * contains "maxFileSize exceeded", but the installed formidable words it
 * "options.maxFileSize (N bytes) exceeded, ...", so an oversized upload
 * surfaces as a generic 500 Internal Server Error. Placed right before
 * strapi::body in config/middlewares.ts, this maps that error to a clear
 * "payload too large" response.
 */
import { errors } from '@strapi/utils';
import type { Core } from '@strapi/strapi';
import { MAX_UPLOAD_BYTES } from '../utils/upload-limits';

const uploadSizeError: Core.MiddlewareFactory = () => async (ctx, next) => {
  try {
    await next();
  } catch (error: any) {
    if (typeof error?.message === 'string' && /maxFileSize.*exceeded/i.test(error.message)) {
      throw new errors.PayloadTooLargeError(
        `El archivo pesa más de ${MAX_UPLOAD_BYTES / 1024 / 1024} MB.`
      );
    }
    throw error;
  }
};

export default uploadSizeError;
