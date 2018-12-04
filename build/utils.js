//此文件主要做了以下几项配置
// 1.设置静态文件的公共路径 用于修改src属性的值
// 2.css加载器的相关配置
// 3.css文件或者cs预处理器文件的相关处理
'use strict'
const path = require('path')//引入nodejs路径模块
const config = require('../config')//引入配置文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')//将css提取到单独的css文件中
const packageConfig = require('../package.json')//引入package.json

//导出assetsPath
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  //返回一个干净的相对根路径
  return path.posix.join(assetsSubDirectory, _path)
}

//导出cssLoaders 即css加载器的相关配置
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {//cssLoader的基本配置
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap//是否开启sourceMap
    }
  }

  const postcssLoader = {//postcss-loader的基本配置
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap//sourceMap是用于调试的
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {//合并对象
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    //extract是自定义的属性 定义在options 当为true时就把文件单独提取 false不单独提取
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
  // cssLoaders返回eg:
//   {
//     css:ExtractTextPlugin.extract({
//       use: [{
//           loader: 'css-loader',
//           options: {//合并对象
//             sourceMap: true,
//             extrace:true
//           }
//         }
//       ],
//       fallback: 'vue-style-loader'
//     })
//   }
// }

// Generate loaders for standalone style files (outside of .vue)
//处理import这种方式导入的文件类型的打包 export.cssLoaders是为这一步服务的
//对css文件和css预处理器文件进行处理
exports.styleLoaders = function (options) {
  const output = []
  //loaders是生成的css文件的loader对象
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
  // styleLoaders返回eg
  // [{
  //   test:new RegExp('\\.sass$'),
  //   use:ExtractTextPlugin.extract({
  //           use: [{
  //               loader: 'css-loader',
  //               options: {//合并对象
  //                 sourceMap: true,
  //                 extrace:true
  //               }
  //             }
  //           ],
  //           fallback: 'vue-style-loader'
  //         })
  // }]
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
