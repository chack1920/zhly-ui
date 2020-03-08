<!--
 * @Date         : 2020-03-05 17:14:48
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 11:58:11
 * @FilePath     : /src/pages/home/Index.vue
 -->
<script lang="ts">

import { Component, Vue, Model, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import HomeStore from 'store/modules/home/HomeStore';

@Component({
    computed: {
        username: {
            get: () => {
                return this.username
            },
            set: (data) => { 
                this.username = data;
            }
        }
    }
})
export default class Index extends Vue {
    private store: any;
    constructor() {
        super();
        this.store = getModule(HomeStore)
    }
    
}

</script>
<template lang="pug" src="views/home.pug" />
<style scoped lang="stylus" src='styles/home.stylus' />