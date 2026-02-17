/**
 * podcast-crew controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::podcast-crew.podcast-crew', ({ strapi }) => ({
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));