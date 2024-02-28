// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://54.39.112.34:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
