<!--
 * @Date         : 2020-03-09 14:34:43
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-09 18:09:13
 * @FilePath     : /src/components/menu/menu.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import router from "common/RouterConfig";

@Component({})
export default class Login extends Vue {
  @Prop() private list:Array<any>;
  indentationState:boolean = true;
  constructor() {
    super();
  }
  back() {
    sessionStorage.clear();
    router.push({ path: "/login" });
  }
  indentation() {
    if (this.indentationState) {
      this.$refs.wrap['style'].width = '0.7rem'
      this.$refs.header['style'].padding = '0 .25rem'
      this.$refs.back['style'].display = 'none'
    } else {
      this.$refs.wrap['style'].width = '1.75rem'
      this.$refs.header['style'].padding = '0 .4rem'
      this.$refs.back['style'].display = 'inline-block'
    }
    this.indentationState = !this.indentationState
  }
}
</script>
<template lang="pug" src="./menu.pug" />
<style lang="stylus" src='./menu.stylus'/>