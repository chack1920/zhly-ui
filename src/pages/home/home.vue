<script lang="ts">
    import Navigation from "@/components/Navigation.vue";
    import "@/assets/css/common.css";

    import { Component, Vue, Prop } from 'vue-property-decorator';

    import { getModule } from 'vuex-module-decorators';
    import store from '../../store';
    import PagesStore from '../../store/modules/design/PagesStore';
    const pagesStore = getModule(PagesStore, store);
    import * as Config from '../../../package.json'
    import FileHelper from '../../utils/FileHelper'
    import {Message} from 'iview'

     @Component({
        components:{
            Navigation,
        },
        directives: {
            focus: {
                // 自定义指令
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        mounted() {
            this.$Message.config({
                top: 25,
                duration: 2.5
            });
        }
    })

    export default class Home extends Vue {

        splitWidth = 0.2;
        root = (<any>Config).root;

        constructor() {
            super()
        }

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        }

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }

        getRelativePath(fullpath) {

            if(fullpath == -1) {
                return '';
            }
            let path = fullpath;
            let root = (<any>Config).root + '/localhost';
            root = root + '/';

            if(path.indexOf(root) == 0) {
                path = path.substring(root.length);
            }

            return path;
        }

        showPath() {

            if(!this.$store.state.PagesStore.currentTab) {
                return false;
            }

            let path = this.getRelativePath(this.$store.state.PagesStore.currentTab);
            if(!path) {
                return false;
            }

            let paths = path.split('/');
            if(paths && paths.length > 0) {
                return paths;
            }

            return false;
        }

        save() {

            let path = this.$store.state.PagesStore.currentTab;
            let info = this.$store.state.PagesStore.pages.find(a=>a.path==path);

            FileHelper.saveTextFile(info.path, info.content);
            path = this.getRelativePath(info.path);

            (<any>Message).success('文件['+path+']保存成功');

            return path;
        }

        saveAndPreview() {
            let path = this.save();
            const config = require('../../../' + this.root + '/config.json');
            let port = config.sites.localhost.port;
            let url = "http://localhost:"+port+"/"+path;
            window.open(url, '预览['+url+']');
        }
    }
</script>

<style scoped src="@/styles/home.css" />
<template lang="pug" src="@/views/home.pug" />
