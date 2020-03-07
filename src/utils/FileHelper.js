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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as path from 'path';
var FileHelper = /** @class */ (function () {
    function FileHelper() {
        this.fs = window.require('fs');
        this.path = window.require('path');
    }
    FileHelper.prototype.readDir = function (dir) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.fs.readdir(dir, function (err, files) {
                if (err)
                    reject(err);
                resolve(files);
            });
        });
    };
    FileHelper.prototype.getStat = function (path) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.fs.stat(path, function (err, stats) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(stats);
                }
            });
        });
    };
    // 搜索文件
    FileHelper.prototype.search = function (dirPath, suffix) {
        var _this = this;
        var files = this.fs.readdirSync(dirPath);
        var stats = files.map(function (file) {
            return _this.fs.statSync(path.join(dirPath, file));
        });
        var result = new Array();
        for (var i = 0; i < files.length; i++) {
            files[i] = path.join(dirPath, files[i]);
        }
        var datas = { stats: stats, files: files };
        datas.stats.forEach(function (stat) {
            var isFile = stat.isFile();
            var isDir = stat.isDirectory();
            var json = { "type": "file" };
            if (isDir) {
                json["children"] = _this.search(datas.files[datas.stats.indexOf(stat)], suffix);
                json["type"] = "folder";
            }
            var path = datas.files[datas.stats.indexOf(stat)];
            json["path"] = path;
            var arr = path.split("/");
            var filename = arr[arr.length - 1];
            if (isFile && suffix) {
                if (filename.lastIndexOf(".") < 0) {
                    return;
                }
                arr = filename.split(".");
                if (!arr || typeof (arr) != 'object' || arr.length < 2) {
                    return;
                }
                if (arr[arr.length - 1].toLowerCase() != suffix.toLowerCase()) {
                    return;
                }
                arr.splice(arr.length - 1);
                filename = arr.join(".");
            }
            json["name"] = filename;
            result.push(json);
        });
        return result;
    };
    /**
     * 创建路径
     * @param {string} dir 路径
     */
    FileHelper.prototype.mkdir = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        self.fs.mkdir(dir, function (err) {
                            if (err) {
                                resolve(false);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    })];
            });
        });
    };
    /**
     * 路径是否存在，不存在则创建
     * @param {string} dir 路径
     */
    FileHelper.prototype.ensureDir = function (dir) {
        var self = this;
        var isExists;
        try {
            isExists = self.fs.statSync(dir);
        }
        catch (_a) { }
        //如果该路径且不是文件，返回true
        if (isExists && isExists.isDirectory()) {
            return true;
        }
        else if (isExists) { //如果该路径存在但是文件，返回false
            return false;
        }
        //如果该路径不存在
        var tempDir = self.path.parse(dir).dir; //拿到上级路径
        if (!tempDir) { //没有上级路径创建并返回
            self.fs.mkdirSync(dir);
            return true;
        }
        //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
        var status = self.ensureDir(tempDir);
        var mkdirStatus;
        if (status) {
            self.fs.mkdirSync(dir);
            return true;
        }
        return mkdirStatus;
    };
    FileHelper.prototype.exists = function (path) {
        if (this.fs.existsSync(path)) {
            return true;
        }
        return false;
    };
    FileHelper.prototype.remove = function (path) {
        var self = this;
        if (self.fs.existsSync(path)) {
            if (self.fs.statSync(path).isDirectory()) {
                var files = self.fs.readdirSync(path);
                files.forEach(function (file, index) {
                    var currentPath = path + "/" + file;
                    if (self.fs.statSync(currentPath).isDirectory()) {
                        self.remove(currentPath);
                    }
                    else {
                        self.fs.unlinkSync(currentPath);
                    }
                });
                self.fs.rmdirSync(path);
            }
            else {
                self.fs.unlinkSync(path);
            }
        }
    };
    FileHelper.prototype.saveTextFile = function (path, content) {
        this.fs.writeFileSync(path, content);
    };
    FileHelper.prototype.readFile = function (path) {
        var content = this.fs.readFileSync(path, 'utf-8');
        return content;
    };
    return FileHelper;
}());
export default new FileHelper();
//# sourceMappingURL=FileHelper.js.map