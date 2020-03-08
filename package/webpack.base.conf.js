/*
 * @Date         : 2020-03-07 17:25:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 15:03:40
 * @FilePath     : /package/webpack.base.conf.js
 */
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'styles': resolve('src/styles'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'request': resolve('src/request'),
      'router': resolve('src/router'),
      'store': resolve('src/store'),
      'views': resolve('src/views'),
      'static': resolve('static'),
    }
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('Home.vue')]
      },
      // jade
      {
          test : /\.jade$/,
          loader : 'jade-loader',
      },
      // pug
      {
        test : /\.pug$/,
        loader : 'pug-loader',
      },
      // stylus 如果使用vue-cli构建，无需配置此项
      {
          test : /\.styl$/,
          loader : 'stylus-loader',
      },
      {
          test: /\.less$/,
          loaders: ["style", "css", "less"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
