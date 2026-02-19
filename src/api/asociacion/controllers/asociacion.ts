/**
 * asociacion controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::asociacion.asociacion', ({ strapi }) => ({
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));