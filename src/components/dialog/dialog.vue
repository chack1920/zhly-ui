<!--
 * @Date         : 2020-03-10 15:27:32
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-10 16:18:44
 * @FilePath     : /src/components/dialog/dialog.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Index extends Vue {
  @Prop({ default: false, type: Boolean }) show: boolean;
  @Prop({ default: "提 示", type: String }) title: string;
  @Prop({ default: "确 定", type: String }) button: string;
  @Prop({ default: "50%", type: String }) width: string;
  public visible: boolean = this.show;
  constructor() {
    super();
  }
  @Watch("show")
  getShow(val, old) {
    this.visible = this.show;
  }
  confirm() {
    this.$emit("confirm");
  }

  close() {
    this.$emit("update:show", false);
    this.$emit("clear");
  }
}
</script>
<template lang="pug" src="./dialog.pug" />
<style lang="stylus" src='./dialog.stylus' />