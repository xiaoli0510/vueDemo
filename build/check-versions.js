'use strict'
const chalk = require('chalk')//是在控制台中输出不同的颜色的字 ps:chalk.blue('Hello world')
const semver = require('semver')//对特定的版本号做判断的
const packageConfig = require('../package.json')//导入json文件
const shell = require('shelljs')//执行Unix系统命令

function exec (cmd) {
  //脚本通过child_process模块新建子进程 从而执行Unix系统命令
  //把cmd这个值转化成前后明天空格的字符串 也就是版本号
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',//node版本的信息
    currentVersion: semver.clean(process.version),//使用semver插件把版本信息转化成规定格式 也就是'=v1.2.3'=>'1.2.3'
    versionRequirement: packageConfig.engines.node//这是规定的package.json中的engines选项的node版本信息 "node":">= 6.0.0"
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),//自动调用npm --version命令 并且把参数返回给exex函数 从而获取纯净的版本号
    versionRequirement: packageConfig.engines.npm//规定的package.json中的engines选项的npm版本信息 "npm":">= 3.0.0"
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
     //如果版本号不符合package.json文件中的指定的版本号，就执行下面的代码
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      //把当前版本号用红色字体 符合版本的用绿色字体 并提示具体合适的版本
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    //提示更新版本 
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
