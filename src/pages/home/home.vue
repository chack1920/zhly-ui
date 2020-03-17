<!--
 * @Date         : 2020-03-05 17:14:48
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-16 11:08:12
 * @FilePath     : /src/pages/home/home.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import HomeStore from "store/modules/home/HomeStore";
import menu from "components/menu/menu.vue";

@Component({
  components: {
    menus: menu
  }
})
export default class Home extends Vue {
  private store: any;
  public list: Array<any> = [
    {
      icon: require("static/homePage.png"),
      name: "首 页",
      path: "/home/homePage"
    },
    {
      icon: require("static/company.png"),
      name: "公 司",
      path: "/home/companyPage"
    },
    {
      icon: require("static/officeStaff.png"),
      name: "人员管理",
      path: "/home/personnelPage"
    },
    {
      icon: require("static/checkingIn.png"),
      name: "考勤记录",
      path: "/home/attendanceRecord"
    },
    {
      icon: require("static/blacklist.png"),
      name: "黑 名 单",
      path: "/home/blackListPage"
    }
  ]
  constructor() {
    super();
    this.store = getModule(HomeStore);
  }
}
</script>
<template lang="pug" src="views/home.pug" />
<style scoped lang="stylus" src='styles/home.stylus' />