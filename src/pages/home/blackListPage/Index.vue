<!--
 * @Date         : 2020-03-16 11:01:30
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-17 18:11:36
 * @FilePath     : /src/pages/home/blackListPage/Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import BlackListStore from "store/modules/blackList/BlackListStore";
import dialog from "components/dialog/dialog.vue";
import updateImg from "components/updateImage/update.vue";
import msg from "common/MessageUtils";

@Component({
  components: {
    dialogBox: dialog
  }
})
export default class BlackListPage extends Vue {
  private store: any;
  public option: Array<any> = [
    {
      label: "黑名单",
      value: 1
    },
    {
      label: "正常人员",
      value: 0
    }
  ];
  public disable: string = "";
  public visible_add: boolean = false;
  public visible_delete: boolean = false;
  constructor() {
    super();
    this.store = getModule(BlackListStore);
    this.store.getData();
  }
  async addBlackList() {
    if (this.disable == "0") {
      await this.store.addBlackList();
      (this.$refs.table as HTMLFormElement).clearSelection();
    } else if(this.disable == "1"){
      msg.warning('该员工在黑名单中，无法新增')
    } else {
      msg.warning('请选择人员！')
    }
  }
  async deleteBlackList() {
    if (this.disable == "1") {
      await this.store.deleteBlackList();
      (this.$refs.table as HTMLFormElement).clearSelection();
    } else if(this.disable == "0"){
      msg.warning('该员工不在黑名单中，无法删除')
    } else {
      msg.warning('请选择人员！')
    }
  }
  selectChange(row) {
    this.$store.state.BlackListStore.checked = row;
    if (row.length > 0) {
      this.disable = row[0].isBlacklist;
    } else {
      this.disable = "";
    }
  }
  handleCurrentChange(val) {
    this.store.handleCurrentChange(val);
  }
  search() {
    this.store.search();
  }
  public getIndex(index): number {
    return (
      (Number(this.$store.state.BlackListStore.pageNum) - 1) *
        Number(this.$store.state.BlackListStore.pageSize) +
      index +
      1
    );
  }
  public selectDisable(row) {
    if (row.isBlacklist == this.disable && this.disable !== "") {
      return true;
    } else if (this.disable != "") {
      return false;
    } else {
      return true;
    }
  }
}
</script>
<template lang="pug" src="views/blackList.pug" />
<style lang="stylus" src='styles/blackList.stylus' />