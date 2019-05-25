module.exports = {
    devServer: {
      proxy: {
        '/musics': {
          target: 'http://localhost:8080',
          ws: true,
          changeOrigin: true
        }
      }
    }
   }