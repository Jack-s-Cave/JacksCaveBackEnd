/**
 * podcast controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::podcast.podcast', ({ strapi }) => ({

    /**
     * Sobrescribe el controlador core 'find' para Podcast.
     * @description 
     * Este hook intercepta las peticiones GET a /api/podcasts.
     * Permite la obtención de episodios de podcast, soportando filtrado
     * por ID y población de relaciones como la imagen de portada.
     * @example
     * // Obtener todos los podcasts con su imagen: ?populate[image][fields][0]=url
     * // Obtener un podcast específico: ?filters[id][$eq]=1&populate[image][fields][0]=url
     * @param {Object} ctx - El contexto de la petición Koa.
     * @returns {Object} El objeto con { data, meta } estructurado por Strapi.
     */
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));