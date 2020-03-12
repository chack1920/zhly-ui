<!--
 * @Date         : 2020-03-06 16:11:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-09 19:55:41
 * @FilePath     : /src/components/head/index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator';
import router from 'common/RouterConfig';

@Component({})
export default class Login extends Vue {
  name:string;
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