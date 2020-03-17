<!--
 * @Date         : 2020-03-09 18:21:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-17 19:47:33
 * @FilePath     : /src/pages/home/homePage/Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import HomePageStore from "store/modules/homePage/HomePageStore";
import echarts from "echarts";
import msg from "common/MessageUtils";

@Component({})
export default class HomePage extends Vue {
  private store: any;
  private show: boolean = true;
  constructor() {
    super();
    this.store = getModule(HomePageStore);
  }
  mounted() {
    this.getTime();
    this.getChart();
    this.searchTime();
  }
  getTime() {
    let time = new Date();
    let mounth = time.getMonth() + 1;
    this.$store.state.HomePageStore.month =
      time.getFullYear() + "-" + (mounth < 10 ? "0" + mounth : mounth);
  }
  cheackTime(val) {
    this.$store.state.HomePageStore.month = val;
  }
  async searchTime() {
    await this.store.getData();
    if (this.$store.state.HomePageStore.data.length) {
      let Xlist = new Set(),
        visit: Array<any> = new Array(),
        office: Array<any> = new Array();
      this.$store.state.HomePageStore.data.forEach(item => {
        Xlist.add(item.time);
        if (item.type == 2) {
          visit.push(item.inout);
        } else {
          office.push(item.inout);
        }
      });
      this.getChart(Array.from(Xlist), visit, office);
    } else {
      msg.warning("该月份没有数据");
      this.getChart();
    }
  }
  getChart(XList = [], visit = [], office = []) {
    let chart = echarts.init(this.$refs.chart);
    chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ["办公人员", "访客人数"]
      },
      grid: {
        left: "4%",
        right: "4%",
        top: "8%",
        bottom: "8%"
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        },
        right: "4%"
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: XList
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "办公人员",
          type: "bar",
          barMaxWidth: "50",
          data: office,
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#99d9ea"
                },
                {
                  offset: 1,
                  color: "#0090ff"
                }
              ])
            }
          }
        },
        {
          name: "访客人数",
          type: "bar",
          barMaxWidth: "50",
          data: visit,
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#FEAEB3"
                },
                {
                  offset: 1,
                  color: "#fd5101"
                }
              ])
            }
          }
        }
      ]
    });
  }
  clear() {
    this.show = true
    this.$store.state.HomePageStore.changeName = ''
  }
  async changeNameClick() {
    await this.store.changeNameClick()
      .then(res => {
        if (res.code == 0) {
          this.$store.state.HomePageStore.buildingName = this.$store.state.HomePageStore.changeName
          this.clear()
        } else {
          msg.warning('修改名称失败!')
        }
      })
  }
  editIcon() {
    this.show = false
  }
}
</script>
<template lang="pug" src="views/homePage.pug" />
<style lang="stylus" src='styles/homePage.stylus' />