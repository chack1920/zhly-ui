<!--
 * @Date         : 2020-03-12 14:41:56
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-22 17:25:22
 * @FilePath     : \src\pages\home\personnelPage\Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import PersonnelStore from "store/modules/personnel/PersonnelStore";
import dialog from "components/dialog/dialog.vue";
import updateImg from "components/updateImage/update.vue";
import msg from "common/MessageUtils";

@Component({
  components: {
    dialogBox: dialog
  }
})
export default class PersonnelPage extends Vue {
  private store: any;
  public visible: boolean = false;
  // public show: boolean = false;
  // public title: string = "";
  constructor() {
    super();
    this.store = getModule(PersonnelStore);
    this.store.getData();
  }
  // public showDialogAdd(name) {
  //   this.title = name;
  //   this.show = true;
  //   this.$nextTick(() => {
  //     this.resetForm("ruleForm");
  //   });
  // }
  // public showDialogCompile(name) {
  //   this.title = name;
  //   let list = this.$store.state.PersonnelStore.checked;
  //   let temp;
  //   switch (list.length) {
  //     case 0:
  //       msg.warning("请选择一个修改项！");
  //       break;
  //     case 1:
  //       temp = (async() => await this.store.searchAlone(list[0].id))();
  //       break;
  //     default:
  //       msg.warning("最多选择一个修改项！");
  //       break;
  //   }
  //   if (temp) {
  //     this.$store.state.PersonnelStore.id = list[0].id
  //     this.show = true;
  //     this.$nextTick(() => {
  //       this.resetForm("ruleForm");
  //     });
  //   }
  // }
  // public resetForm(formName) {
  //   const ref: any = this.$refs[formName];
  //   ref.resetFields();
  // }
  // public confirm(ruleForm) {
  //   const ref: any = this.$refs.ruleForm;
  //   ref.validate(async valid => {
  //     if (valid) {
  //       let temp = await this.store.confirm(this.title);
  //       if (temp) this.show = false;
  //     }
  //   });
  // }
  deleteCompony() {
    this.store.deleteCompony();
  }
  selectChange(row) {
    this.$store.state.PersonnelStore.checked = row;
  }
  // clear() {
  //   this.store.clear()
  // }
  handleCurrentChange(val) {
    this.store.handleCurrentChange(val)
  }
  search() {
    this.store.search()
  }
  public getIndex(index):number {
    return (Number(this.$store.state.PersonnelStore.pageNum) - 1) * Number(this.$store.state.PersonnelStore.pageSize) + index + 1
  }
  public disable(row) {
    if (row.ispresent === "0" ) {
      return true
    } else {
      return false
    }
  }
  public upDateFile(e) {
    let file = e.target.files[0]
    let excel = (/.(xls|xlsx)$/i).test(file.name)
    if (excel) {
      this.store.upDateFile(file)
    } else {
      msg.warning("请上传EXCEL格式的文件")
      e.target.value = ""
    }
  }
  public upDateImgs(id, e) {
    let file = e.target.files[0]
    let excel = (/.(png|jpg|jpeg)$/i).test(file.name)
    if (excel) {
      this.store.upDateImgs({id, img: file})
    } else {
      msg.warning("请上传png、jpg、jpeg格式图片")
      e.target.value = ""
    }
  }
  public downloadPeople() {
    this.store.downloadPeople();
  }
}
</script>
<template lang="pug" src="views/personnel.pug" />
<style lang="stylus" src='styles/personnel.stylus' />