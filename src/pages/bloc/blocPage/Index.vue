<!--
 * @Date         : 2020-04-16 18:07:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-17 14:10:04
 * @FilePath     : \src\pages\bloc\blocPage\Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import BlocPageStore from "store/modules/blocPage/blocPage";

@Component({})
export default class BlocPage extends Vue {
  private store: any;
  private hidden: boolean = false;
  private open: Array<any> = [0];
  private treeShow: boolean = true;
  private defaultPropsTop: any = {
    label: "label",
    children: "children"
  };
  private treeTopData: Array<any> = [
    {
      label: "",
      children: [{}],
      id: 0
    }
  ];
  private defaultProps: {
    children: "children";
    label: "companyName";
    isLeaf: "leaf";
  };
  constructor() {
    super();
    this.store = getModule(BlocPageStore);
  }
  async mounted() {
    this.store.getTreeList();
    await this.store.getCompanyName().then(res => {
      this.treeTopData[0].label = res.data.companyName;
    });
    let map = new AMap.Map("map", {
      zoom: 11, //级别
      center: [116.397428, 39.90923], //中心点坐标
      viewMode: "3D" //使用3D视图
    });
  }
  handleNodeClickTop() {
    this.treeShow = !this.treeShow;
    if (this.treeShow) {
      this.store.getTreeList();
    }
    if (this.open.length) {
      this.open.pop();
    } else {
      this.open.push(0);
    }
  }
}
</script>
<template lang="pug" src="views/blocPage.pug" />
<style scoped lang="stylus" src='styles/blocPage.stylus' />