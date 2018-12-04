'use strict'
const merge = require('webpack-merge')//合并
const prodEnv = require('./prod.env')

//合并，减少重复代码
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
