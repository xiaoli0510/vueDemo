//此文件主要是用于生产环境npm run build打包 相对应的命令行是package里的npm 脚本 npm run build
'use strict'
require('./check-versions')()//npm node版本检查

process.env.NODE_ENV = 'production'//设置环境变量为production

const ora = require('ora')//一个命令行转圈圈动画插件
const rm = require('rimraf')//用来执行UNIX命令rm和-rf的用来删除文件夹和文件，清空旧的文件
const path = require('path')//node.js path模块
const chalk = require('chalk')//在命令行中输入不同颜色的文字
const webpack = require('webpack')//使用内置插件和webpack方法
const config = require('../config')//配置通用文件
const webpackConfig = require('./webpack.prod.conf')//生产模式下的webpack配置文件

const spinner = ora('building for production...')//开启转圈圈动画
spinner.start()

//调用rm方法 第一个蚕食是dist/static 表示删除这个路径下面的所有文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  //删除时出现错误且终止程序
  if (err) throw err
   //这个回调函数是webpack编译过程中执行
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()//停止转圈圈
    if (err) throw err
    //输出
    process.stdout.write(stats.toString({
      //status对象中保存着编译过程中的各种信息
      colors: true,//增加控制台颜色开关
      modules: false,//不增加内置模块信息
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,//允许较少的输出
      chunkModules: false//不将内置模块的信息加到包信息
    }) + '\n\n')
    //以上是在编译过程中，持续打印信息
    
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
//下面是编译成功的信息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
