import { errors } from '@strapi/utils';

console.log(' SI SE CARGO LOS LIFECYCLE HOOKS DE article-md');

// Origins that count as "this backend": the configured server URL plus the
// origin the current request came in on (when there is one).
const ownOrigins = (): string[] => {
  const s = (globalThis as any).strapi;
  const origins: string[] = [];
  const configured = s?.config?.get('server.absoluteUrl');
  if (typeof configured === 'string' && configured) origins.push(new URL(configured).origin);
  const requestOrigin = s?.requestContext?.get()?.request?.origin;
  if (typeof requestOrigin === 'string' && requestOrigin) origins.push(requestOrigin);
  return origins;
};

// Returns the site-relative /uploads/... path for an image URL that points at
// this site's own media library, or null for anything else.
//
// Strapi's markdown editor inserts Media Library images with an ABSOLUTE url
// (backend origin + /uploads/x.png), so those must be accepted too. They are
// rewritten to the relative form, which drops the origin entirely: articles
// keep working if the domain changes, and a forged Host header can't smuggle
// another host into an article.
const toInternalImagePath = (url: string): string | null => {
  if (url.startsWith('/uploads/')) return url;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(parsed.protocol) || !parsed.pathname.startsWith('/uploads/')) return null;
  return ownOrigins().includes(parsed.origin) ? `${parsed.pathname}${parsed.search}` : null;
};

const sanitizeMarkdownUrls = (markdown: string): string => {
  if (!markdown) return markdown;
  
  const DANGEROUS_PROTOCOLS = /^(javascript|data|file|vbscript):/i;
  
  markdown = markdown.replace(
    /!\[([^\]]*)\]\(([^\)]+)\)/g,
    (match, alt, url) => {
      console.log(` Validando imagen: ${url}`);
      url = url.trim();
      
      if (DANGEROUS_PROTOCOLS.test(url)) {
        console.log(` URL PELIGROSA: ${url}`);
        return `![${alt}](#imagen-bloqueada)`;
      }
      
      // Internal images only: anything that isn't from the site's own media
      // library is rejected with a message, so the Writer knows to upload the
      // image instead of linking it. Remote images would leak readers' IP and
      // referrer to a third party and could be swapped after an Editor has
      // approved the article. Reference-style images (![a][ref]) aren't
      // matched by this regex; the frontend renderer enforces the same rule
      // when displaying, so it is the authoritative check.
      // url may carry a markdown title: ![a](/uploads/x.png "title")
      const urlPart = url.split(/\s+/)[0];
      const titlePart = url.slice(urlPart.length);
      const internalPath = toInternalImagePath(urlPart);
      if (internalPath) {
        console.log(` URL válida: ${url}`);
        return internalPath === urlPart ? match : `![${alt}](${internalPath}${titlePart})`;
      }

      console.log(` IMAGEN EXTERNA RECHAZADA: ${url}`);
      throw new errors.ValidationError(
        'Solo se permiten imágenes subidas a la biblioteca de medios (rutas /uploads/...). ' +
        `Sube la imagen en lugar de enlazarla. Imagen no permitida: ${url.slice(0, 120)}`
      );
    }
  );
  
  markdown = markdown.replace(
    /\[([^\]]+)\]\(([^\)]+)\)/g,
    (match, text, url) => {
      console.log(` Validando enlace: ${url}`);
      url = url.trim();
      
      if (DANGEROUS_PROTOCOLS.test(url)) {
        console.log(` ENLACE PELIGROSO: ${url}`);
        return `[${text}](#enlace-bloqueado)`;
      }
      
      if (url.startsWith('https://') || url.startsWith('/') || url.startsWith('#')) {
        return match;
      }
      
      if (url.startsWith('http://')) {
        console.log(` HTTP en enlace: ${url}`);
        return `[${text}](#enlace-invalido)`;
      }
      
      console.log(` Enlace desconocido: ${url}`);
      return `[${text}](#enlace-invalido)`;
    }
  );
  
  return markdown;
};

//  CAMBIAR module.exports por export default
export default {
  async beforeCreate(event: any) {
  
    const { data } = event.params;
    
    if (data.Article_core) {
      console.log(' Contenido original:', data.Article_core.substring(0, 100));
      const original = data.Article_core;
      data.Article_core = sanitizeMarkdownUrls(data.Article_core);
      
      if (original !== data.Article_core) {
        console.log(' CONTENIDO MODIFICADO');
        console.log(' Nuevo:', data.Article_core.substring(0, 100));
      }
    }
  },

  async beforeUpdate(event: any) {
    const { data } = event.params;
    
    if (data.Article_core) {
      console.log(' Contenido a actualizar:', data.Article_core.substring(0, 100));
      const original = data.Article_core;
      data.Article_core = sanitizeMarkdownUrls(data.Article_core);
      
      if (original !== data.Article_core) {
        console.log(' CONTENIDO MODIFICADO EN UPDATE');
      }
    }
  },

  async afterCreate(event: any) {
    console.log(' AFTER CREATE - Artículo guardado');
    const { result } = event;
    console.log(`ID: ${result.id}`);
    console.log(`Título: ${result.Titulo}`);
  },
};