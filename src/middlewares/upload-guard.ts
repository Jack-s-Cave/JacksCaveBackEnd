/**
 * upload-guard: only real, reasonably sized images may be uploaded.
 *
 * Runs after strapi::body (so the multipart files are already on disk) and
 * before Strapi stores anything, on both upload routes: POST /upload (admin
 * panel) and POST /api/upload (content API). For every file it:
 *   1. requires an image extension (jpg, jpeg, png, webp, gif) - no SVG, HTML,
 *      JS, PDF, video, etc.
 *   2. enforces the size cap;
 *   3. checks the file's real magic bytes match that extension, so an HTML/JS
 *      file can't be smuggled in under an image name, and rewrites the
 *      client-declared mimetype to the detected one;
 *   4. checks the image actually decodes, and scales down images larger than
 *      MAX_IMAGE_DIMENSION (EXIF orientation is applied first because
 *      re-encoding drops the metadata). GIFs are left untouched.
 *
 * If any file in the request is rejected the whole request is rejected and the
 * temp files are removed (strapi::body only cleans up after successful requests).
 */
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { errors } from '@strapi/utils';
import type { Core } from '@strapi/strapi';
import { MAX_IMAGE_DIMENSION, MAX_UPLOAD_BYTES } from '../utils/upload-limits';

const { ValidationError, PayloadTooLargeError } = errors;

type ImageFormat = 'jpeg' | 'png' | 'webp' | 'gif';

// extension -> the format the file's contents must really have
const ALLOWED_EXTENSIONS: Record<string, ImageFormat> = {
  '.jpg': 'jpeg',
  '.jpeg': 'jpeg',
  '.png': 'png',
  '.webp': 'webp',
  '.gif': 'gif',
};

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const detectFormat = (head: Buffer): ImageFormat | null => {
  if (head.length >= 3 && head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) return 'jpeg';
  if (head.length >= 8 && head.subarray(0, 8).equals(PNG_SIGNATURE)) return 'png';
  const ascii6 = head.subarray(0, 6).toString('ascii');
  if (ascii6 === 'GIF87a' || ascii6 === 'GIF89a') return 'gif';
  if (
    head.length >= 12 &&
    head.subarray(0, 4).toString('ascii') === 'RIFF' &&
    head.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'webp';
  }
  return null;
};

const readHead = async (filepath: string): Promise<Buffer> => {
  const handle = await fs.open(filepath, 'r');
  try {
    const buffer = Buffer.alloc(12);
    const { bytesRead } = await handle.read(buffer, 0, 12, 0);
    return buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
};

const validateAndNormalize = async (file: any): Promise<void> => {
  const name: string = file.originalFilename ?? '';

  const expected = ALLOWED_EXTENSIONS[path.extname(name).toLowerCase()];
  if (!expected) {
    throw new ValidationError(
      `"${name}" no es un archivo permitido. Solo se aceptan imágenes JPG, PNG, WebP o GIF.`
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new PayloadTooLargeError(
      `"${name}" pesa más de ${MAX_UPLOAD_BYTES / 1024 / 1024} MB.`
    );
  }

  const actual = detectFormat(await readHead(file.filepath));
  if (actual !== expected) {
    throw new ValidationError(
      `El contenido de "${name}" no corresponde a una imagen ${expected.toUpperCase()} válida.`
    );
  }
  // never trust the mimetype the client declared
  file.mimetype = `image/${actual}`;

  let metadata: sharp.Metadata;
  try {
    metadata = await sharp(file.filepath).metadata();
  } catch {
    throw new ValidationError(`No se pudo leer "${name}" como imagen.`);
  }

  if (actual === 'gif') return; // keep animated GIFs untouched

  const longestSide = Math.max(metadata.width ?? 0, metadata.height ?? 0);
  if (longestSide > MAX_IMAGE_DIMENSION) {
    const resizedPath = `${file.filepath}.resized`;
    const pipeline = sharp(file.filepath)
      .rotate() // apply EXIF orientation before re-encoding strips it
      .resize({
        width: MAX_IMAGE_DIMENSION,
        height: MAX_IMAGE_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      });

    if (actual === 'jpeg') pipeline.jpeg({ quality: 90 });
    else if (actual === 'webp') pipeline.webp({ quality: 90 });
    else pipeline.png();

    await pipeline.toFile(resizedPath);
    await fs.rename(resizedPath, file.filepath);
    file.size = (await fs.stat(file.filepath)).size;
  }
};

const isUploadRequest = (ctx: any): boolean =>
  ctx.method === 'POST' && /^\/(api\/)?upload\/?$/.test(ctx.path);

const uploadGuard: Core.MiddlewareFactory = () => async (ctx, next) => {
  if (!isUploadRequest(ctx)) return next();

  const files = Object.values((ctx.request as any).files ?? {}).flat() as any[];

  try {
    for (const file of files) {
      await validateAndNormalize(file);
    }
  } catch (error) {
    await Promise.all(
      files.flatMap((file) => [
        fs.rm(file.filepath, { force: true }),
        fs.rm(`${file.filepath}.resized`, { force: true }),
      ])
    ).catch(() => undefined);
    throw error;
  }

  return next();
};

export default uploadGuard;
