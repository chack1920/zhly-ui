/*
 * @Date         : 2020-03-07 17:25:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-17 20:09:18
 * @FilePath     : /config/index.js
 */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDist: path.resolve(__dirname, '../dist/dist'),
    assetsService: path.resolve(__dirname, '../dist/service'),
    assetsLibrary: path.resolve(__dirname, '../dist/lib'),
    assetsStatic: 'static',
    assetsPublicPath: './',
    sourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3325,
    autoOpenBrowser: true,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDist: path.resolve(__dirname, '../dist/dist'),
    assetsStatic: 'static',
    assetsPublicPath: './',
    proxyTable: {},
    sourceMap: true
  }
}
