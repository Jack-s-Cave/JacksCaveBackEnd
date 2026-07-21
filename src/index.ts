import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // Buscar el rol Public
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        // Endpoints que necesitan acceso libre desde el frontend
        const publicActions = [
          'api::article-md.article-md.find',
          'api::article-md.article-md.findone',
          'api::article-md.article-md.findnews', // Endpoint de noticias
          'api::asociacion-info.asociacion-info.find',
          'api::who-are-we.who-are-we.find',
        ];

        // Revisar qué permisos ya existen para no duplicarlos
        const existingPermissions = await strapi.query('plugin::users-permissions.permission').findMany({
          where: { role: publicRole.id },
        });

        // Crear solo los permisos que faltan
        for (const action of publicActions) {
          const actionExists = existingPermissions.some(
            (p: any) => p.action.toLowerCase() === action.toLowerCase()
          );

          if (!actionExists) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: action.toLowerCase(),
                role: publicRole.id,
              },
            });
            console.log(`✅ Permiso público agregado: ${action}`);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error al configurar los permisos públicos:', error);
    }
  },
};