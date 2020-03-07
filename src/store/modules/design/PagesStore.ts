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

import store from '../../index'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { getModule } from 'vuex-module-decorators';
import TreeNodeStore, {DirInfo, PageInfo} from './TreeNodeStore';
import {Message} from 'iview';
import FileHelper from '../../../utils/FileHelper'


@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "PagesStore",
    store,
})
export default class PagesStore extends VuexModule {
    public pages: Array<PageInfo> | boolean;
    public currentTab: string;

    constructor(args) {
        super(args);
        this.pages = new Array();
        this.currentTab = '';
    }

    @Mutation
    remove(path: string) {

        let page = (<Array<PageInfo>>this.pages).find(a=>a.path == path);
        if(!page) {
            return ;
        }
        let index = (<Array<PageInfo>>this.pages).indexOf(page);
        if(index < 0) {
            return;
        }

        let getEnablePath = i=> {

            if(i<0) {
                return '';
            }

            if(!this.pages[i]) {
                return getEnablePath(i-1);
            }

            return this.pages[i].path;
        }

        // TODO 关闭前保存

        if(path == this.currentTab) {
            this.currentTab = getEnablePath(index-1);
        }
        else {
            //store里需要先把currentTab置为null再重新赋值TabPane才会被选中
            path = this.currentTab;
            this.currentTab = null;
            this.currentTab = path;
        }

        this.pages[index] = false;
    }

    @Mutation
    select(path: string) {
        this.currentTab = path;
    }
}