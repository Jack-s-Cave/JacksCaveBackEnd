/**
 * article-md controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article-md.article-md', ({ strapi }) => ({
    // Hook expuesto para personalización futura en el frontend
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },

    // NUEVO ENDPOINT: Traer únicamente noticias con tag 'News'
    async findNews(ctx) {
        // petición antes de que Strapi la procese para inyectarle el filtro y las imágenes
        ctx.query = {
            ...ctx.query,
            filters: {
                ...(typeof ctx.query.filters === 'object' ? ctx.query.filters : {}),
                tags: {
                    $eq: 'News', // Si 'tags' en tu base de datos permite seleccionar varios tags a la vez, cambia $eq por $contains
                },
            },
            populate: '*', // Esto le dice a Strapi que traiga la imagen, autor y serie automáticamente
        };

        // Búsqueda original de Strapi, pero ahora con nuestros filtros aplicados
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
}));