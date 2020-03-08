/*
 * @Date         : 2020-03-05 12:32:01
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-07 00:22:52
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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    path: '',
  },
  mutations: {
    changeLoading(state, setBoolea) {
      state.loading = setBoolea;
    },
    changePath(state, path) {
      state.path = path;
    },
  },
});

