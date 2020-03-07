/*
 *  Legopg Copyright (C) 2019 linlurui <rockylin@qq.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router/.invoke/router'

import iView from 'iview'
import 'iView/dist/styles/iview.css'

Vue.use(iView)


Vue.config.productionTip = false

import store from './store';

/* eslint-disable no-new */

router.beforeEach((to, from ,next) => {
    next()
})

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
