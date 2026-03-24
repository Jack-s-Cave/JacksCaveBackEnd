/**
 * asociacion controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::asociacion.asociacion', ({ strapi }) => ({

    /**
     * Sobrescribe el controlador core 'find' para Asociaciones.
     * @description 
     * Este hook intercepta las peticiones GET a /api/asociaciones.
     * Gestiona la obtención de las juntas directivas por año académico,
     * permitiendo filtrar por año y ordenar los resultados.
     * @example
     * // Obtener asociaciones con miembros y fotos: ?populate[Miembro][populate][foto][fields][0]=url
     * // Filtrar por año específico: ?filters[year][$eq]=2024
     * // Ordenar por año descendente: ?sort[0]=year:desc
     * @param {Object} ctx - El contexto de la petición Koa.
     * @returns {Object} El objeto con { data, meta } estructurado por Strapi.
     */
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));