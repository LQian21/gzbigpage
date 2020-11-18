const path = require('path')
// import path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

// console.log(process.env.NODE_ENV)
module.exports = {
  //   publicPath: process.env.NODE_ENV === 'production' ? '/robot/dist/' : '',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',
  css: {
    // 是否开启 CSS source maps
    sourceMap: true,
    loaderOptions: {
      //   sass: {
      //     // @/ 是 src/ 的别名
      //     // 所以这里假设你有 `src/variables.sass` 这个文件
      //     // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
      //     additionalData: `@import "~@/assets/scss/common.scss"`
      //   },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/assets/scss/common.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
    // vue默认@指向src目录
    config.resolve.alias.set('@', path.resolve('src'))
  },
  devServer: {
    compress: true,
    // hot: true,
    host: '0.0.0.0',
    port: 9001,
    proxy: {
      '/login': {
        target: 'http://192.168.1.167:8750/',
        changeOrigin: true,
        secure: false
        // pathRewrite: { '^/cpms/mnpl': '' }
      },
      '/channelBigScreen/': {
        target: 'http://192.168.1.167:8750/',
        changeOrigin: true,
        secure: false
        // pathRewrite: { '^/cpms/mnpl': '' }
      },
      '/bigScreen/': {
        target: 'http://192.168.1.167:8750/',
        changeOrigin: true,
        secure: false
        // pathRewrite: { '^/cpms/mnpl': '' }
      },
      '/channel/': {
        target: 'http://192.168.1.167:8750/',
        changeOrigin: true,
        secure: false
        // pathRewrite: { '^/cpms/mnpl': '' }
      }
    }
  }
  //   pluginOptions: {
  //     'style-resources-loader': {
  //       preProcessor: 'scss',
  //       patterns: [path.resolve(__dirname, 'src/assets/scss/common.scss')]
  //     }
  //   }
}
