<!--
 * @Date         : 2020-03-06 16:11:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-30 16:18:11
 * @FilePath     : \src\components\head\index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator';
import router from 'common/RouterConfig';

@Component({})
export default class Login extends Vue {
  private name:string;
  private store:any;
  private buildingName = sessionStorage.getItem("buildingName") ? sessionStorage.getItem("buildingName") : "";
  constructor() {
    super();
    this.name = sessionStorage.getItem('userName');
  }
  quit() {
    sessionStorage.clear()
    router.push({path: "/login"})
  }
}
</script>
<template lang="pug" src="./head.pug" />
<style lang="stylus" src='./head.stylus'/>