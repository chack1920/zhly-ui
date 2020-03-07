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

import * as fs from 'fs';
import * as path from 'path';

class FileHelper {

    public fs: typeof fs;
    public path: typeof path;

    constructor() {
        this.fs = (<any>window).require('fs');
        this.path = (<any>window).require('path');
    }

    public readDir(dir: string) {
        let self = this;
        return new Promise<string[]>((resolve, reject) => {
            self.fs.readdir(dir, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }

    public getStat(path) : any {
        let self = this;
        return new Promise((resolve, reject) => {
            self.fs.stat(path, (err, stats) => {
                if(err){
                    resolve(false);
                }else{
                    resolve(stats);
                }
            })
        })
    }

    // 搜索文件
    public search(dirPath: string, suffix?: string) {

        const files = this.fs.readdirSync(dirPath);
        const stats = files.map(file => {
            return this.fs.statSync(path.join(dirPath, file));
        });

        let result = new Array();
        for(let i = 0; i < files.length; i++) {
            files[i] = path.join(dirPath, files[i]);
        }

        let datas = { stats, files };

        datas.stats.forEach(stat => {
            const isFile = stat.isFile();
            const isDir = stat.isDirectory();
            let json = {"type": "file"};
            if (isDir) {
                json["children"] = this.search(datas.files[datas.stats.indexOf(stat)], suffix);
                json["type"] = "folder";
            }

            let path: string = datas.files[datas.stats.indexOf(stat)];
            json["path"] = path;
            let arr = path.split("/");
            let filename = arr[arr.length - 1];

            if(isFile && suffix) {
                if(filename.lastIndexOf(".") < 0) {
                    return;
                }
                arr = filename.split(".");
                if(!arr || typeof(arr)!='object' || arr.length < 2) {
                    return;
                }
                if(arr[arr.length - 1].toLowerCase() != suffix.toLowerCase()) {
                    return;
                }
                arr.splice(arr.length - 1);
                filename = arr.join(".");
            }

            json["name"] = filename;

            result.push(json);
        });

        return result;
    }



    /**
     * 创建路径
     * @param {string} dir 路径
     */
    async mkdir(dir){
        let self = this;
        return new Promise((resolve, reject) => {

            self.fs.mkdir(dir, err => {

                if(err){
                    resolve(false);
                }else{
                    resolve(true);
                }
            })
        })
    }

    /**
     * 路径是否存在，不存在则创建
     * @param {string} dir 路径
     */
    ensureDir(dir) {

        let self = this;
        let isExists;
        try {
            isExists = self.fs.statSync(dir);
        } catch {}
        //如果该路径且不是文件，返回true
        if(isExists && isExists.isDirectory()){
            return true;
        }else if(isExists){     //如果该路径存在但是文件，返回false
            return false;
        }

        //如果该路径不存在
        let tempDir = self.path.parse(dir).dir;      //拿到上级路径
        if(!tempDir) { //没有上级路径创建并返回
            self.fs.mkdirSync(dir);
            return true;
        }
        //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
        let status = self.ensureDir(tempDir);

        let mkdirStatus;
        if(status){
            self.fs.mkdirSync(dir);
            return true;
        }
        return mkdirStatus;
    }

    exists(path: string): boolean {
        if(this.fs.existsSync(path)) {
            return true;
        }

        return false;
    }

    remove(path) {
        let self = this;
        if (self.fs.existsSync(path)) {
            if (self.fs.statSync(path).isDirectory()) {
                let files = self.fs.readdirSync(path);
                files.forEach((file, index) => {
                    let currentPath = path + "/" + file;
                    if (self.fs.statSync(currentPath).isDirectory()) {
                        self.remove(currentPath);
                    } else {
                        self.fs.unlinkSync(currentPath);
                    }
                });
                self.fs.rmdirSync(path);
            } else {
                self.fs.unlinkSync(path);
            }
        }
    }

    saveTextFile(path: string, content: string) {
        this.fs.writeFileSync(path, content);
    }

    readFile(path: string) : string {
        let content = this.fs.readFileSync(path, 'utf-8');

        return content;
    }
}

export default new FileHelper()
