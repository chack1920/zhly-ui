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
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import FileHelper from '../../../utils/FileHelper'
import * as Config from '../../../../package.json'
import {Message} from 'iview';

@Module({
    namespaced: true,
    stateFactory: true,
    dynamic: true,
    name: "TreeNodeStore",
    store,
})
export default class TreeNodeStore extends VuexModule {

    public info: DirInfo;
    public currentPageInfo: PageInfo;
    public currentDirInfo: DirInfo;
    public showDirDialog: boolean;
    public showPageDialog: boolean;
    public createTitle: string;

    constructor(args) {
        super(args)
        this.info = null;
        this.showDirDialog = false;
        this.showPageDialog = false;
        this.createTitle = '';
        this.currentDirInfo = {
            name: "网页设计",
            path: (<any>Config).root + '/localhost',
            children: null,
            size: 3,
            type: "folder",
        }
    }

    @Mutation
    load(path:string) {
        let data = this.info;
        if(!data) {
            data = this.currentDirInfo;
        }

        if(!path) {
            path = data.path;
        }

        FileHelper.ensureDir(path);
        let filesOrFolders = FileHelper.search(path, "lpg")

        if (!filesOrFolders) {
            return;
        }

        data.children = new Array();
        filesOrFolders.forEach(node => {
            if (node.type == 'file') {
                node["width"] = 1280;
                node["content"] = '';
                node["background"] = "#fff";
                node["opened"] = false;
                node["activated"] = false;
            } else {
                node["size"] = 0;
            }

            node["selected"] = false;

            data.children.push(node);
        })

        this.info = data;
    }

    @Mutation
    removeSelected() {
        FileHelper.remove(this.currentDirInfo.path);
        let removeFn = (path: string, node: PageInfo | DirInfo) : PageInfo | DirInfo => {
            if(!node || !path) {
                return null;
            }

            if(node.path == path) {
                return node;
            }

            if(!(<DirInfo>node).children || (<DirInfo>node).children.length < 1) {
                return null;
            }

            let removeIndexs = new Array();
            (<DirInfo>node).children.forEach((child: any, index: Number)=>{
                if(removeFn(path, child)) {
                    removeIndexs.push(index);
                }
            })

            for(let i in removeIndexs) {
                let index = removeIndexs[i];
                delete (<DirInfo>node).children[index];
            }
        }

        removeFn(this.currentDirInfo.path, this.info);
        this.currentDirInfo = null;
    }

    @Mutation
    public select(path:string) {
        let selectedFn = (path: string, node: PageInfo | DirInfo) : PageInfo | DirInfo => {

            if(!node || !path) {
                return null;
            }

            if(node.path == path) {
                if(node.type == "file") {
                    (<PageInfo>node).content = FileHelper.readFile(node.path);
                    this.currentPageInfo = <PageInfo>node;
                }
                else {
                    this.currentDirInfo = <DirInfo>node;
                }
                return node;
            }

            if(!(<DirInfo>node).children || (<DirInfo>node).children.length < 1) {
                return null;
            }

            (<DirInfo>node).children.forEach((child: any)=>{
                let selected = selectedFn(path, child);
                if(selected && selected.type == "file") {
                    this.currentDirInfo = (<DirInfo>node);
                }
            })
        }

        selectedFn(path, this.info);
    }

    @Mutation
    public addDir(dirname: string) {

        if(!this.currentDirInfo) {
            (<any>Message).warning('请选择一个目录');
            throw new DOMException()
        }

        let fullpath = this.currentDirInfo.path + "/" + dirname;
        if(FileHelper.exists(fullpath)) {
            (<any>Message).warning('目录已经存在');
            throw new DOMException()
        }

        if(!FileHelper.ensureDir(fullpath)) {
            (<any>Message).warning('目录创建失败');
            throw new DOMException()
        }

        let dir = {
            name: dirname,
            path: fullpath,
            children: null,
            size: 0,
            type: "folder"
        }

        let addFn = (path: string, node: DirInfo, newDir: DirInfo) : PageInfo | DirInfo => {

            if(!node || !path) {
                return null;
            }

            if(node.path == path) {
                return node;
            }

            if(!(<DirInfo>node).children || (<DirInfo>node).children.length < 1) {
                return null;
            }

            (<DirInfo>node).children.forEach((childNode: any, index: Number)=>{
                if(addFn(path, childNode, newDir)) {
                    if(!childNode.children) {
                        childNode.children = new Array();
                    }
                    childNode.children.push(newDir);
                }
            })
        }

        if(addFn(this.currentDirInfo.path, this.info, dir)) {
            if(!this.info.children) {
                this.info.children = new Array();
            }
            this.info.children.push(dir);
        }

        this.currentDirInfo = dir;

        return true;
    }

    @Mutation
    public addPage(filename: string) {

        if(!this.currentDirInfo) {
            (<any>Message).warning('请选择一个目录');
            throw new DOMException()
        }

        let fullpath = this.currentDirInfo.path + "/" + filename + ".lpg";
        if(FileHelper.exists(fullpath)) {
            (<any>Message).warning('文件已经存在');
            throw new DOMException()
        }

        FileHelper.saveTextFile(fullpath, '');

        let file = {
            name: filename,
            path: fullpath,
            width: 1280,
            background: '#fff',
            type: "file",
            opened: true,
            activated: true,
            content: ''
        }

        let addFn = (path: string, node: DirInfo, newPage: PageInfo) : PageInfo | DirInfo => {

            if(!node || !path) {
                return null;
            }

            if(node.path == path) {
                return node;
            }

            if(!(<DirInfo>node).children) {
                (<DirInfo>node).children = new Array();
            }

            (<DirInfo>node).children.forEach((childNode: any, index: Number)=>{
                if(addFn(path, childNode, newPage)) {
                    if(!childNode.children) {
                        childNode.children = new Array();
                    }
                    childNode.children.push(newPage);
                }
            })
        }

        if(addFn(this.currentDirInfo.path, this.info, file)) {
            if(!this.info.children) {
                this.info.children = new Array();
            }
            this.info.children.push(file);
        }

        this.currentPageInfo = file;

        return true;
    }
}

export interface PageInfo {
    name: string;
    path: string;
    width: number;
    content?: string;
    background?: string;
    opened: boolean;
    activated: boolean;
    type: string;
}

export interface DirInfo {
    name: string;
    path: string;
    children?: Array<PageInfo|DirInfo>;
    size: number;
    type: string;
}
