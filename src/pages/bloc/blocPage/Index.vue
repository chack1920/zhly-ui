<!--
 * @Date         : 2020-04-16 18:07:34
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-19 21:52:41
 * @FilePath     : \src\pages\bloc\blocPage\Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import BlocPageStore from "store/modules/blocPage/blocPage";
import msg from "common/MessageUtils";

@Component({})
export default class BlocPage extends Vue {
  private store: any;
  private hidden: boolean = false;
  private open: Array<any> = [0];
  private treeShow: boolean = true;
  private map: any;
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
  private defaultProps: any = {
    children: "children",
    label: "companyName",
    isLeaf: "leaf"
  };
  private companyList: Array<any>;
  public markerList: Array<any> = [];
  public center: Array<any> = [116.397428, 39.90923];
  constructor() {
    super();
    this.store = getModule(BlocPageStore);
    this.store.$v = this;
  }
  async mounted() {
    this.store.getTreeList();
    await this.store.getCompanyName().then(res => {
      this.treeTopData[0].label = res.data.companyName;
    });
    this.map = new AMap.Map("map", {
      zoom: 11, //级别
      center: this.center, //中心点坐标
      viewMode: "3D" //使用3D视图
    });
    await this.store.getAllProjectNum().then(res => {
      if (res.code == 0) {
        this.$store.state.BlocPageStore.projectNum = res.data.length;
        this.mapMarkersList(res.data)
      }
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
  handleNodeClick(val) {
    // 判断点击项是否为项目
    if (!val.projectName) {
      this.$store.state.BlocPageStore.projectNum = 0;
      if (this.markerList.length) {
        this.map.remove(this.markerList);
        this.markerList = [];
      }
      this.store.treeOpen(val);
    }
  }
  getPrijectPositionWrap(val) {
    if (val.projectName) {
      if (this.markerList.length) {
        this.map.remove(this.markerList);
        this.markerList = [];
      }
      // 点击项目在地图上定位
      if (val.longitude || val.latitude) {
        let marker = new AMap.Marker({
          position: new AMap.LngLat(val.longitude * 1, val.latitude * 1),
          offset: new AMap.Pixel(2, -15),
          animation: "AMAP_ANIMATION_DROP"
        });
        let infoWindow = new AMap.InfoWindow({
          content: `<div class="prompt">${val.projectName}</div>`,
          offset: new AMap.Pixel(12, -5),
          anchor: "bottom-center"
        });
        marker.on("mouseover", () =>
          infoWindow.open(this.map, [val.longitude * 1, val.latitude * 1])
        );
        marker.on("mouseout", () => infoWindow.close());
        this.markerList = new Array(marker);
        this.map.add(this.markerList);
        this.map.setCenter([val.longitude * 1, val.latitude * 1]);
      } else {
        msg.warning("该项目没有设置经纬度");
        this.markerList = [];
      }
    }
  }
  mapMarkersList(data) {
    this.$store.state.BlocPageStore.projectNum = data.length;
    if (this.markerList.length) {
      this.map.remove(this.markerList);
      this.markerList = [];
    }
    let self = this;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].longitude || !data[i].latitude) {
        continue;
      }
      let center = [data[i].longitude * 1, data[i].latitude * 1];
      if (i === 0) {
        this.map.setCenter(center);
      }
      let marker = new AMap.Marker({
        position: new AMap.LngLat(center[0], center[1]),
        offset: new AMap.Pixel(2, -15),
        animation: "AMAP_ANIMATION_DROP"
      });
      let infoWindow = new AMap.InfoWindow({
        content: `<div class="prompt">${data[i].projectName}</div>`,
        offset: new AMap.Pixel(12, -5),
        anchor: "bottom-center"
      });
      marker.on("mouseover", () => infoWindow.open(this.map, center));
      marker.on("mouseout", () => infoWindow.close());
      this.markerList.push(marker);
    }
    this.map.add(this.markerList);
  }
}
</script>
<template lang="pug" src="views/blocPage.pug" />
<style lang="stylus" src='styles/blocPage.stylus' />