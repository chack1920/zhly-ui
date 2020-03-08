/*
 * @Date         : 2020-03-07 17:25:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-07 23:11:22
 * @FilePath     : /package/webpack.publish.conf.js
 */
var path = require('path')
var utils = require('./utils')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var publishRoot = path.resolve(__dirname, '../publish');

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: false
    })
  },
  devtool: false,
  output: {
    path: publishRoot
  },
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../package.json'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../service'),
        to: publishRoot + '/service',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../lib'),
        to: publishRoot + '/lib',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../dist'),
        to: publishRoot + '/dist',
        ignore: ['*.map', '*.hot-update.js', '*.hot-update.json']
      },
      {
        from: path.resolve(__dirname, '../main.js'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../app.png'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../app.ico'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../app.icns'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../mime.json'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../proxy.js'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../server.js'),
        to: publishRoot
      },
      {
        from: path.resolve(__dirname, '../server.html'),
        to: publishRoot
      }
    ])
  ]
})

module.exports = webpackConfig
