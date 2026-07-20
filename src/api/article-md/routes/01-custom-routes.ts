export default {
    routes: [
        {
            method: 'GET',
            path: '/article-mds/news',
            handler: 'article-md.findNews',
        },
    ],
};