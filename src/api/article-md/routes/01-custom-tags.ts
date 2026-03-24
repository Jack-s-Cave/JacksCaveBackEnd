export default {
  routes: [
    {
      method: 'GET',
      path: '/article-mds/unique-tags',
      handler: 'api::article-md.article-md.getUniqueTags',
      config: {
        auth: false,
      },
    },
  ],
};