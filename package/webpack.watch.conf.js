var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const VueRouterInvokeWebpackPlugin = require('vue-router-invoke-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./package/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.sourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#source-map',
  output: {
    path: config.dev.assetsRoot
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    new VueRouterInvokeWebpackPlugin({
      'dir' : 'src/pages',
      'alias' : '../../pages',
      'routerDir' : 'src/router',
      'language' : 'typescript',
      'mode' : 'hash',
      'redirect': [{
          redirect: '/home/design',
          path: '/'
      }]
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/views/index.pug',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../src/assets/tinymce/langs'),
            to: config.build.assetsRoot + '/langs',
            ignore: ['.*']
        },
        {
            from: path.resolve(__dirname, '../src/assets/tinymce/skins'),
            to: config.build.assetsRoot + '/skins',
            ignore: ['.*']
        },
        {
            from: path.resolve(__dirname, '../src/assets/tinymce/plugins'),
            to: config.build.assetsRoot + '/plugins',
            ignore: ['.*']
        },
        {
            from: path.resolve(__dirname, '../src/assets/css'),
            to: config.build.assetsRoot + '/css',
            ignore: ['.*']
        }
    ])
  ]
})
