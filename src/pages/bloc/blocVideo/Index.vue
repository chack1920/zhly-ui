<!--
 * @Date         : 2020-04-13 14:18:30
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-22 20:44:00
 * @FilePath     : \src\pages\bloc\blocVideo\Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import BlocVideoStore from "store/modules/blocVideo/BlocVideoStore";
import msg from "common/MessageUtils";

@Component({})
export default class VideoListPage extends Vue {
  private store: any;
  private className: string = "el-icon-caret-left";
  private videoList: Array<any> = [];
  private educationShow: number = null;
  private schoolId: number = null;
  private educationId: number = null;
  private videoId: number = null;
  private videoSize: number = 16;
  private videoSrc: Array<any> = [];
  constructor() {
    super();
    this.store = getModule(BlocVideoStore);
    this.store.$Vue = this;
  }
  created() {
    for (let i = 1; i <= this.videoSize; i++) {
      let obj = (this.videoSrc[i - 1] = {});
      obj["id"] = `player${i}`;
      obj["src"] = "";
    }
  }
  async mounted() {
    await this.store.getVideoList().then(res => {
      if (res.code == 0) this.videoList = res.data;
    });
    let urlList = this.getUrl(this.videoList);
    this.videoStart(urlList);
    this.getDeleteIcon();
  }
  getUrl(videoList: Array<any>): Array<any> {
    let temp = new Array();
    videoList.forEach(a => {
      if (a.pid) {
        a.videoList.forEach(b => {
          if (b.hdUrl) {
            temp.push({
              url: b.hdUrl,
              videoSn: b.videoSn
            });
          }
        });
      } else {
        if (a.hdUrl) {
          temp.push({
            url: a.hdUrl,
            videoSn: a.videoSn
          });
        }
      }
    });
    return temp;
  }
  videoStart(urlList) {
    let urlNum = 0;
    for (let i = 1; i <= this.videoSize; i++) {
      if (this.videoSrc[i - 1].src) {
        continue;
      } else if (urlList.length) {
        (document.getElementById(`player${i}`) as HTMLMediaElement).src =
          urlList[urlNum].url;
        this.$set(this.videoSrc[i - 1], "src", urlList[urlNum].url);
        this.$set(this.videoSrc[i - 1], "videoSn", urlList[urlNum].videoSn);
        urlNum++;
        this[`player${i}`] = new EZUIPlayer(`player${i}`);
        this[`player${i}`].play();
      }
    }
  }
  getDeleteIcon() {
    let wrap = document.getElementsByClassName("video-wrap");
    for (let i = 0; i < wrap.length; i++) {
      (wrap[i] as HTMLElement).onmouseover = () => {
        if (
          wrap[i]
            .getElementsByTagName("video")[0]
            .src.toString()
            .match(/blob/)
        ) {
          wrap[i].getElementsByTagName("i")[0].style.display = "inline-block";
        }
      };
      (wrap[i] as HTMLElement).onmouseout = () => {
        wrap[i].getElementsByTagName("i")[0].style.display = "none";
      };
    }
  }
  beforeDestroy() {
    this.videoStop();
  }
  videoStop() {
    for (let i = 1; i <= this.videoSize; i++) {
      if (typeof this[`player${i}`] === "object") {
        this[`player${i}`].stop();
      }
    }
  }
  changeClassName() {
    switch (this.className) {
      case "el-icon-caret-left":
        this.className = "el-icon-caret-right";
        break;
      case "el-icon-caret-right":
        this.className = "el-icon-caret-left";
        break;
      default:
        break;
    }
  }
  getProject(list) {
    this.educationId = this.educationId == list.pid ? null : list.pid;
    if (this.educationId) {
      let videoList = this.getUrl(list.videoList);
      let videoUrl = this.verifyVideo(videoList);
      this.videoStart(videoUrl);
    }
  }
  playOnly(list) {
    this.schoolId = this.schoolId == list.hdUrl ? null : list.hdUrl;
    if (this.schoolId) {
      let temp: Array<any> = new Array();
      temp.push(list);
      let videoList = this.getUrl(temp);
      let videoUrl = this.verifyVideo(videoList);
      this.videoStart(videoUrl);
    }
  }
  delVideo(id) {
    this[id].stop();
    let ele = document.getElementById(id);
    let parent = ele.parentElement;
    let video = document.createElement("video");
    video.id = id;
    video.src = "";
    video.controls = true;
    video.muted = true;
    parent.removeChild(ele);
    parent.appendChild(video);
    let newEle = document.getElementById(id);
    newEle.style.width = "100%";
    newEle.style.height = "100%";
    this.videoSrc.forEach((item, index) => {
      if (item.id == id) {
        this.videoSrc[index].src = "";
        this.videoSrc[index].videoSn = "";
      }
    });
  }
  verifyVideo(list: Array<any>): Array<any> {
    let videoList: Array<any> = JSON.parse(JSON.stringify(list));
    let noRepet: boolean = true;
    let location: number = 0;
    this.videoSrc.forEach(item => {
      if (!item.src) location++;
      videoList.forEach((a, index) => {
        if (a["url"] == item.src) {
          noRepet = false;
          videoList.splice(index, 1);
        }
      });
    });
    if (!noRepet && list.length == 1) {
      this.schoolId = null;
      msg.warning("该视频已播放，无法重复播放");
      return [];
    } else if (!noRepet && !videoList.length) {
      msg.warning("所有视频已播放，无法重复播放");
      this.educationId = null;
      return [];
    } else {
      if (videoList.length > location && location) {
        msg.warning(`选中视频超过可播放总数，仅播放前${location}个`);
        return videoList.splice(videoList.length - location, videoList.length);
      } else if (videoList.length > location && !location) {
        msg.warning(`当前没有可播放的位置，请先关闭部分视频`);
        this.educationId = null;
        this.schoolId = null;
        return videoList.splice(videoList.length - location, videoList.length);
      } else {
        return videoList;
      }
    }
  }
  clearAll() {
    this.educationId = null;
    this.videoStop();
    for (let i = 1; i <= this.videoSize; i++) {
      this.delVideo(`player${i}`);
      this.$set(this.videoSrc[i - 1], "src", "");
      this.$set(this.videoSrc[i - 1], "videoSn", "");
    }
  }
}
</script>
<template lang="pug" src="views/blocVideo.pug" />
<style lang="stylus" src='styles/blocVideo.stylus' />