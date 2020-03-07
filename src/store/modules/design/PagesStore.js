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
var PagesStore = /** @class */ (function (_super) {
    __extends(PagesStore, _super);
    function PagesStore(args) {
        var _this = _super.call(this, args) || this;
        _this.pages = new Array();
        _this.currentTab = '';
        return _this;
    }
    PagesStore.prototype.remove = function (path) {
        var _this = this;
        var page = this.pages.find(function (a) { return a.path == path; });
        if (!page) {
            return;
        }
        var index = this.pages.indexOf(page);
        if (index < 0) {
            return;
        }
        var getEnablePath = function (i) {
            if (i < 0) {
                return '';
            }
            if (!_this.pages[i]) {
                return getEnablePath(i - 1);
            }
            return _this.pages[i].path;
        };
        // TODO 关闭前保存
        if (path == this.currentTab) {
            this.currentTab = getEnablePath(index - 1);
        }
        else {
            //store里需要先把currentTab置为null再重新赋值TabPane才会被选中
            path = this.currentTab;
            this.currentTab = null;
            this.currentTab = path;
        }
        this.pages[index] = false;
    };
    PagesStore.prototype.select = function (path) {
        this.currentTab = path;
    };
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], PagesStore.prototype, "remove", null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], PagesStore.prototype, "select", null);
    PagesStore = __decorate([
        Module({
            namespaced: true,
            stateFactory: true,
            dynamic: true,
            name: "PagesStore",
            store: store,
        }),
        __metadata("design:paramtypes", [Object])
    ], PagesStore);
    return PagesStore;
}(VuexModule));
export default PagesStore;
//# sourceMappingURL=PagesStore.js.map