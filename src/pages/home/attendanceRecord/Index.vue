<!--
 * @Date         : 2020-03-13 15:41:52
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-13 18:16:46
 * @FilePath     : /src/pages/home/attendanceRecord/Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import AttendanceRecordSrore from "store/modules/attendanceRecord/AttendanceRecordStore";
import msg from "common/MessageUtils";

@Component({})
export default class AttendanceRecord extends Vue {
  private store: any;
  public option: Array<any> = [
    {
      label: "进入",
      value: "in"
    },
    {
      label: "离开",
      value: "out"
    }
  ];
  public TEMPERATURE:number = 37.5
  constructor() {
    super();
    this.store = getModule(AttendanceRecordSrore);
    this.store.getData();
  }
  deleteCompony() {
    this.store.deleteCompony();
  }
  handleCurrentChange(val) {
    this.store.handleCurrentChange(val)
  }
  search() {
    this.store.search()
  }
  public getIndex(index):number {
    return (Number(this.$store.state.AttendanceRecordSrore.pageNum) - 1) * Number(this.$store.state.AttendanceRecordSrore.pageSize) + index + 1
  }
}
</script>
<template lang="pug" src="views/attendanceRecord.pug" />
<style lang="stylus" src='styles/attendanceRecord.stylus' />