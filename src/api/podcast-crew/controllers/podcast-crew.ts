/**
 * podcast-crew controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::podcast-crew.podcast-crew', ({ strapi }) => ({

    /**
     * Sobrescribe el controlador core 'find' para Podcast Crew.
     * @description 
     * Este hook intercepta las peticiones GET a /api/podcast-crew.
     * Permite obtener la información del equipo del podcast, incluyendo
     * los conductores y sus fotografías.
     * @example
     * // Obtener el equipo con sus fotos: ?populate[photos][fields][0]=url
     * @param {Object} ctx - El contexto de la petición Koa.
     * @returns {Object} El objeto con { data, meta } estructurado por Strapi.
     */
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));