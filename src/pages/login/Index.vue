<!--
 * @Date         : 2020-03-05 16:54:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 16:32:37
 * @FilePath     : /src/pages/login/Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import LoginStore from 'store/modules/login/LoginStore';

@Component({})
export default class Login extends Vue {
  private store: any;
  constructor() {
    super();
    this.store = getModule(LoginStore);
  }
}
</script>
<template lang="pug" src="views/login.pug" />
<style lang="stylus" src="styles/login.stylus" />