console.log(' SI SE CARGO LOS LIFECYCLE HOOKS DE article-md');

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
      
      if (url.startsWith('https://') || url.startsWith('/uploads/')) {
        console.log(` URL válida: ${url}`);
        return match;
      }
      
      if (url.startsWith('http://')) {
        console.log(` HTTP bloqueado: ${url}`);
        return `![${alt}](#solo-https)`;
      }
      
      console.log(` URL desconocida: ${url}`);
      return `![${alt}](#url-invalida)`;
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