/**
 * article-md controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article-md.article-md', ({ strapi }) => ({
    // Hook expuesto para personalización futura en el frontend
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));