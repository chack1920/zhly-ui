<!--
 * @Date         : 2020-03-09 20:01:58
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-17 17:45:53
 * @FilePath     : /src/pages/home/companyPage/Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import CompanyStore from "store/modules/company/CompanyStore";
import dialog from "components/dialog/dialog.vue";
import msg from "common/MessageUtils";

@Component({
  components: {
    dialogBox: dialog
  }
})
export default class CompanyPage extends Vue {
  private store: any;
  public show: boolean = false;
  public title: string = "";
  public visible: boolean = false;
  constructor() {
    super();
    this.store = getModule(CompanyStore);
    this.store.getData();
  }
  public showDialogAdd(name) {
    this.title = name;
    this.show = true;
    this.$nextTick(() => {
      this.resetForm("ruleForm");
    });
  }
  public showDialogCompile(name) {
    this.title = name;
    let list = this.$store.state.CompanyStore.checked;
    let temp;
    switch (list.length) {
      case 0:
        msg.warning("请选择一个修改项！");
        break;
      case 1:
        temp = (async () => await this.store.searchAlone(list[0].id))();
        break;
      default:
        msg.warning("最多选择一个修改项！");
        break;
    }
    if (temp) {
      this.$store.state.CompanyStore.id = list[0].id;
      this.show = true;
      this.$nextTick(() => {
        this.resetForm("ruleForm");
      });
    }
  }
  public resetForm(formName) {
    const ref: any = this.$refs[formName];
    ref.resetFields();
  }
  public confirm(ruleForm) {
    const ref: any = this.$refs.ruleForm;
    ref.validate(async valid => {
      if (valid) {
        let temp = await this.store.confirm(this.title);
        if (temp) {
          this.show = false;
          (this.$refs.table as HTMLFormElement).clearSelection();
        }
      }
    });
  }
  public deleteCompony() {
    this.store.deleteCompony();
  }
  public selectChange(row) {
    this.$store.state.CompanyStore.checked = row;
  }
  public clear() {
    this.store.clear();
  }
  public handleCurrentChange(val) {
    this.store.handleCurrentChange(val);
  }
  public search() {
    this.store.search();
  }
  public getIndex(index): number {
    return (
      (Number(this.$store.state.CompanyStore.pageNum) - 1) *
        Number(this.$store.state.CompanyStore.pageSize) +
      index +
      1
    );
  }
}
</script>
<template lang="pug" src="views/company.pug" />
<style lang="stylus" src='styles/company.stylus' />