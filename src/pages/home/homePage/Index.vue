<!--
 * @Date         : 2020-03-09 18:21:44
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-10 20:19:50
 * @FilePath     : \src\pages\home\homePage\Index.vue
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
  private firstAJAX: boolean = true;
  private pageNum: number = 1;
  private pageSize: number = 3;
  constructor() {
    super();
    this.store = getModule(HomePageStore);
  }
  mounted() {
    this.getTime();
    // this.getChart();
    this.searchTime();
    this.getCompanyPeople(this.pageNum);
    this.getPieData();
  }
  // 获取当前时间
  getTime() {
    let time = new Date();
    let mounth = time.getMonth() + 1;
    this.$store.state.HomePageStore.month =
      time.getFullYear() + "-" + (mounth < 10 ? "0" + mounth : mounth);
  }
  // 获取选择的时间
  cheackTime(val) {
    this.$store.state.HomePageStore.month = val;
  }
  // 搜索时间之后获取数据
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
      this.firstAJAX = false;
    } else {
      if (this.firstAJAX) {
        this.firstAJAX = false;
      } else {
        msg.warning("该月份没有数据");
      }
      this.getChart();
    }
  }
  // 渲染echarts
  getChart(
    XList = new Array(31).fill("无数据"),
    visit = new Array(31).fill(0),
    office = new Array(31).fill(0)
  ) {
    let chart = echarts.init(this.$refs.chart);
    chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        left: "2%",
        top: "2%",
        itemWidth: 15,
        data: ["办公人数", "访客人数"],
        icon: "rect"
      },
      grid: {
        left: "2%",
        right: "2%",
        bottom: "2%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: XList
      },
      yAxis: {
        type: "value",
        minInterval: 1
      },
      color: ["#507efe", "#ffac2e"],
      series: [
        {
          name: "办公人数",
          type: "line",
          // stack: "总量",
          // symbol:'none', //去掉折线图中的节点
          smooth: true, //true 为平滑曲线，false为直线
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#507efecc" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#fff" // 100% 处的颜色
              }
            ])
          },
          data: office
        },
        {
          name: "访客人数",
          type: "line",
          // stack: "总量",
          // symbol:'none', //去掉折线图中的节点
          smooth: true, //true 为平滑曲线，false为直线
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#ffac2ecc" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#fff" // 100% 处的颜色
              }
            ])
          },
          data: visit
        }
      ]
    });
  }
  // 清除输入的名称
  clear() {
    this.show = true;
    this.$store.state.HomePageStore.changeName = "";
  }
  // 点击修改名按钮
  async changeNameClick() {
    await this.store.changeNameClick().then(res => {
      if (res.code == 0) {
        this.$store.state.HomePageStore.buildingName = this.$store.state.HomePageStore.changeName;
        this.clear();
      } else {
        msg.warning("修改名称失败!");
      }
    });
  }
  // 修改点击
  editIcon() {
    this.show = false;
  }
  // 进度条默认值
  format() {
    return "";
  }
  // 计算进度条进度
  percentage(people, all) {
    return Math.round((people / all) * 100);
  }
  // 翻页
  paging(status) {
    let maxNum = Math.ceil(
      this.$store.state.HomePageStore.total / this.pageSize
    );
    if (status == "+") {
      if (this.pageNum < maxNum) {
        this.pageNum++;
        this.getCompanyPeople(this.pageNum);
      } else {
        msg.warning("已经是最后一页了");
      }
    } else {
      if (this.pageNum > 1) {
        this.pageNum--;
        this.getCompanyPeople(this.pageNum);
      } else {
        msg.warning("已经是第一页了");
      }
    }
  }
  // 请求人员数据
  getCompanyPeople(pageNum) {
    this.store.changePageSize(this.pageSize);
    this.store.getCompanyPeople(pageNum);
  }
  // 进度条颜色
  color(percentage) {
    if (percentage <= 20) {
      return "#f56c6c";
    } else if (percentage <= 40) {
      return "#e6a23c";
    } else if (percentage <= 60) {
      return "#1989fa";
    } else if (percentage <= 80) {
      return "#6f7ad3";
    } else {
      return "#5cb87a";
    }
  }
  // 获取饼图数据
  async getPieData() {
    await this.store.getPieData()
      .then(res => {
        if (res.code == 0) {
          let list = [];
          for (const i in res.data) {
            if (i === "zzryRecordCount") {
              list.push({
                name: "正式人员",
                value: res.data[i]
              })
            } else if (i === "fkryRecordCount") {
              list.push({
                name: "访客人员",
                value: res.data[i]
              })
            }
          }
          this.getPie(list);
        } else {
          this.getPie();
        }
      })
      .catch(e => {
        this.getPie();
      });
  }
  // 饼图echarts
  getPie(
    data = [
      { value: 0, name: "访客人数" },
      { value: 0, name: "办公人数" }
    ]
  ) {
    let chart = echarts.init(this.$refs.pie);
    chart.setOption({
      tooltip: {
        trigger: "item"
      },
      legend: {
        show: true,
        orient: "vertical",
        top: "35%",
        right: "30%"
      },
      color: ["#ffab2b", "#4e7dfd"],
      series: [
        {
          type: "pie",
          radius: "80%",
          center: ["40%", "50%"],
          data: data.sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            show: false
          },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        }
      ]
    });
  }
}
</script>
<template lang="pug" src="views/homePage.pug" />
<style lang="stylus" src='styles/homePage.stylus' />