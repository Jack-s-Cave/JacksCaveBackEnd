/**
 * article-md controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article-md.article-md', ({ strapi }) => ({

    /**
     * Sobrescribe el controlador core 'find' para Article_MD.
     * * @description 
     * Este hook intercepta las peticiones GET a /api/article-mds.
     * Actualmente actúa como un passthrough que permite a Strapi procesar
     * nativamente los filtros avanzados (tags, fechas, full-text search)
     * enviados mediante la sintaxis qs (Query String) en la URL.
     * * @example
     * // Los filtros avanzados soportados incluyen:
     * // - Búsqueda por texto: ?filters[$or][0][Titulo][$containsi]=termino
     * // - Filtro por tags: ?filters[tags][$eq]=Linux
     * // - Rangos de fecha: ?filters[fecha_de_publicacion][$gte]=2025-01-01
     * // - Ordenamiento: ?sort[0]=fecha_de_publicacion:desc
     * * @param {Object} ctx - El contexto de la petición Koa (contiene ctx.query con los filtros).
     * @returns {Object} El objeto con { data, meta } estructurado por Strapi.
     */
    async find(ctx) {
        // Aquí podemos pre-procesar ctx.query antes de llamar a la base de datos
        // Ej: forzar que solo devuelva artículos publicados, o auditar quién hace la petición.

        const { data, meta } = await super.find(ctx);

        // Aquí podemos post-procesar la 'data' antes de enviarla al frontend
        // Ej: Ocultar campos sensibles o calcular métricas dinámicas.

        return { data, meta };
    }
}));