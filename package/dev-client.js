/*
 * @Date         : 2020-03-07 17:25:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 11:33:03
 * @FilePath     : /package/dev-client.js
 */
/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
