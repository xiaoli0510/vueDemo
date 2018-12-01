'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {

  dev: {//dev环境
    // Paths
    assetsSubDirectory: 'static',//编译输出的二级目录
    assetsPublicPath: '/',//编译发布的根目录。可配置为资源服务器域名或CDN域名
    proxyTable: {},//需要proxyTable代理的接口 （可跨域）

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true//是否开启cssSourceMap
  },
  build: {//production环境
    //必须是本地文化系统上的绝对路径
    // Template for index.html  带着插入的资源路径会被生成 _dirname指的是../dist/index.html的绝对路径不包含inde
    index: path.resolve(__dirname, '../dist/index.html'),//编译输入的index.html文件
    one:path.resolve(__dirname,'../dist/one.html'),

    // Paths
    //应该指向包含应用程序的所有静态资产的根目录  被webpack编译处理过得资源文件都会在assetsRoot
    assetsRoot: path.resolve(__dirname, '../dist'),//编译输出的静态资源路径
    //那么 被webpack编译处理过得资源文件都会在assetsRoot/static即../dist/static
    //static/目录的文件会直接被在构建过程中，直接拷贝到这个目录，如果你改变这个规则，那么所有你依赖于static/中文件的绝对地址，需需要改变
    assetsSubDirectory: 'static',//编译输出的二级目录
    //是通过http服务器运行的url路径 在大多情况下是/ 如果后台框架对静态资源url前缀要求，仅需要改变这个参数，在内部，这是被webpack当做output.publicPath来处理的
    //后台有要求的话一般加上./或者具体目录添加 不然引用不到静态资源
    assetsPublicPath: '/',//编译发出的根目录 可配置为资源服务器域名或CDN域名

    /**
     * Source Maps
     */
     //在构建生成环境版本时是否开启source map
    productionSourceMap: true,//是否开启cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,//是否开启gzip
    productionGzipExtensions: ['js', 'css'],//需要使用gzip压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
