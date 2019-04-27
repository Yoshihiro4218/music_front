module.exports = {
    devServer: {
      proxy: {
        '/music': {
          target: 'http://localhost:8080',
          ws: true,
          changeOrigin: true
        }
      }
    }
   }