// 发布路径
const publicPath = process.env.VUE_APP_PATHNAME

// 代理路径
const target = 'http://test46.jy365.net'
// const target = 'http://192.168.1.96:8005'
module.exports = {
  publicPath,

  // webpack-dev-server 配置
  devServer: {
    publicPath,
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        xfwd: true,
        headers: {
          Connection: 'keep-alive'
        }
      },
      '/lessionnew': {
        target,
        changeOrigin: true
      },
      '/Content': {
        target,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = '#source-map'
      // config.devtool = 'cheap-source-map'
    }
  }
}
