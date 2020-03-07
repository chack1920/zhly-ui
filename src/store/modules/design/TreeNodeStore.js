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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import store from '../../index';
import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import FileHelper from '../../../utils/FileHelper';
import * as Config from '../../../../package.json';
import { Message } from 'iview';
var TreeNodeStore = /** @class */ (function (_super) {
    __extends(TreeNodeStore, _super);
    function TreeNodeStore(args) {
        var _this = _super.call(this, args) || this;
        _this.info = null;
        _this.showDirDialog = false;
        _this.showPageDialog = false;
        _this.createTitle = '';
        _this.currentDirInfo = {
            name: "网页设计",
            path: Config.root + '/localhost',
            children: null,
            size: 3,
            type: "folder",
        };
        return _this;
    }
    TreeNodeStore.prototype.load = function (path) {
        var data = this.info;
        if (!data) {
            data = this.currentDirInfo;
        }
        if (!path) {
            path = data.path;
        }
        FileHelper.ensureDir(path);
        var filesOrFolders = FileHelper.search(path, "lpg");
        if (!filesOrFolders) {
            return;
        }
        data.children = new Array();
        filesOrFolders.forEach(function (node) {
            if (node.type == 'file') {
                node["width"] = 1280;
                node["content"] = '';
                node["background"] = "#fff";
                node["opened"] = false;
                node["activated"] = false;
            }
            else {
                node["size"] = 0;
            }
            node["selected"] = false;
            data.children.push(node);
        });
        this.info = data;
    };
    TreeNodeStore.prototype.removeSelected = function () {
        FileHelper.remove(this.currentDirInfo.path);
        var removeFn = function (path, node) {
            if (!node || !path) {
                return null;
            }
            if (node.path == path) {
                return node;
            }
            if (!node.children || node.children.length < 1) {
                return null;
            }
            var removeIndexs = new Array();
            node.children.forEach(function (child, index) {
                if (removeFn(path, child)) {
                    removeIndexs.push(index);
                }
            });
            for (var i in removeIndexs) {
                var index = removeIndexs[i];
                delete node.children[index];
            }
        };
        removeFn(this.currentDirInfo.path, this.info);
        this.currentDirInfo = null;
    };
    TreeNodeStore.prototype.select = function (path) {
        var _this = this;
        var selectedFn = function (path, node) {
            if (!node || !path) {
                return null;
            }
            if (node.path == path) {
                if (node.type == "file") {
                    node.content = FileHelper.readFile(node.path);
                    _this.currentPageInfo = node;
                }
                else {
                    _this.currentDirInfo = node;
                }
                return node;
            }
            if (!node.children || node.children.length < 1) {
                return null;
            }
            node.children.forEach(function (child) {
                var selected = selectedFn(path, child);
                if (selected && selected.type == "file") {
                    _this.currentDirInfo = node;
                }
            });
        };
        selectedFn(path, this.info);
    };
    TreeNodeStore.prototype.addDir = function (dirname) {
        if (!this.currentDirInfo) {
            Message.warning('请选择一个目录');
            throw new DOMException();
        }
        var fullpath = this.currentDirInfo.path + "/" + dirname;
        if (FileHelper.exists(fullpath)) {
            Message.warning('目录已经存在');
            throw new DOMException();
        }
        if (!FileHelper.ensureDir(fullpath)) {
            Message.warning('目录创建失败');
            throw new DOMException();
        }
        var dir = {
            name: dirname,
            path: fullpath,
            children: null,
            size: 0,
            type: "folder"
        };
        var addFn = function (path, node, newDir) {
            if (!node || !path) {
                return null;
            }
            if (node.path == path) {
                return node;
            }
            if (!node.children || node.children.length < 1) {
                return null;
            }
            node.children.forEach(function (childNode, index) {
                if (addFn(path, childNode, newDir)) {
                    if (!childNode.children) {
                        childNode.children = new Array();
                    }
                    childNode.children.push(newDir);
                }
            });
        };
        if (addFn(this.currentDirInfo.path, this.info, dir)) {
            if (!this.info.children) {
                this.info.children = new Array();
            }
            this.info.children.push(dir);
        }
        this.currentDirInfo = dir;
        return true;
    };
    TreeNodeStore.prototype.addPage = function (filename) {
        if (!this.currentDirInfo) {
            Message.warning('请选择一个目录');
            throw new DOMException();
        }
        var fullpath = this.currentDirInfo.path + "/" + filename + ".lpg";
        if (FileHelper.exists(fullpath)) {
            Message.warning('文件已经存在');
            throw new DOMException();
        }
        FileHelper.saveTextFile(fullpath, '');
        var file = {
            name: filename,
            path: fullpath,
            width: 1280,
            background: '#fff',
            type: "file",
            opened: true,
            activated: true,
            content: ''
        };
        var addFn = function (path, node, newPage) {
            if (!node || !path) {
                return null;
            }
            if (node.path == path) {
                return node;
            }
            if (!node.children) {
                node.children = new Array();
            }
            node.children.forEach(function (childNode, index) {
                if (addFn(path, childNode, newPage)) {
                    if (!childNode.children) {
                        childNode.children = new Array();
                    }
                    childNode.children.push(newPage);
                }
            });
        };
        if (addFn(this.currentDirInfo.path, this.info, file)) {
            if (!this.info.children) {
                this.info.children = new Array();
            }
            this.info.children.push(file);
        }
        this.currentPageInfo = file;
        return true;
    };
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeNodeStore.prototype, "load", null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TreeNodeStore.prototype, "removeSelected", null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeNodeStore.prototype, "select", null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeNodeStore.prototype, "addDir", null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeNodeStore.prototype, "addPage", null);
    TreeNodeStore = __decorate([
        Module({
            namespaced: true,
            stateFactory: true,
            dynamic: true,
            name: "TreeNodeStore",
            store: store,
        }),
        __metadata("design:paramtypes", [Object])
    ], TreeNodeStore);
    return TreeNodeStore;
}(VuexModule));
export default TreeNodeStore;
//# sourceMappingURL=TreeNodeStore.js.map