<!--
 * @Date         : 2020-03-09 18:21:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-09 19:23:51
 * @FilePath     : /src/pages/home/homePage/Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import HomePageStore from "store/modules/homePage/HomePageStore";

@Component({})
export default class Index extends Vue {
  private store: any;
  constructor() {
    super();
    this.store = getModule(HomePageStore);
  }
}
</script>
<template lang="pug" src="views/homePage.pug" />
<style scoped lang="stylus" src='styles/homePage.stylus' />