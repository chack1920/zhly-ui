/*
 * @Date         : 2020-03-07 17:25:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 15:09:11
 * @FilePath     : /config/dev.env.js
 */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
