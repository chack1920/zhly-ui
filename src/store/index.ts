/*
 * @Date         : 2020-03-05 12:32:01
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 17:36:03
 * @FilePath     : /src/store/index.ts
 */
/*
 *  Legopg Copyright (C) 2020 liudongwang <29202938@qq.com>
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

import Vue from 'vue';
import Vuex from 'vuex';
// import {server as axios} from 'common/HttpClient';
// import msgBox from 'common/MessageUtils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    path: '',
  },
  mutations: {
    changePath(state, path) {
      state.path = path;
    },
    // // 这里对请求进行的封装
    // // datas接受一个对象
    // // url: 接口请求url
    // // data: 入参（接受两种入参，字符串拼接<默认>和json）
    // // isJson: 布尔值，默认false，为true的话就是对象入参
    // getData(state, datas = {isJson: false}) {
    //   let url:string = datas.url;
    //   let data:any = datas.data;
    //   if (datas.isJson) {
    //     new Promise((resolve, reject) => {
    //       axios.post(url + ',' + data)
    //         .then(res => {
    //           return resolve(res)
    //         })
    //         .catch(e => {
    //           return reject(e)
    //         })
    //     })
    //   } else {
    //     new Promise((resolve, reject) => {
    //       axios.post(url + '?' + data)
    //         .then(res => {
    //           return resolve(res)
    //         })
    //         .catch(e => {
    //           return reject(e)
    //         })
    //     })
    //   }
    // },
    // warning(state, msg) {
    //   msgBox.warning(msg)
    // },
    // success(state, msg) {
    //   msgBox.success(msg)
    // }
  },
});

