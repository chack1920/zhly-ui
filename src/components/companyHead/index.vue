<!--
 * @Date         : 2020-04-16 18:09:09
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-22 20:54:46
 * @FilePath     : \src\components\companyHead\index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator';
import router from 'common/RouterConfig';

@Component({})
export default class Login extends Vue {
  private name:string;
  private store:any;
  private buildingName = sessionStorage.getItem("buildingName") ? sessionStorage.getItem("buildingName") : "";
  private clicked:number = sessionStorage.getItem("companyHeadMenu") ? Number(sessionStorage.getItem("companyHeadMenu")) : 1;
  constructor() {
    super();
    this.name = sessionStorage.getItem('userName');
  }
  quit() {
    sessionStorage.clear()
    router.push({path: "/login"})
  }
  changeClicked(id) {
    this.clicked = id
    sessionStorage.setItem("companyHeadMenu", id)
    switch (Number(id)) {
      case 1:
        router.push({path: "/bloc/blocPage"})
        break;
      case 2:
        router.push({path: "/bloc/blocVideo"})
        break;
      default:
        break;
    }
  }
}
</script>
<template lang="pug" src="./companyHead.pug" />
<style lang="stylus" src='./companyHead.stylus'/>