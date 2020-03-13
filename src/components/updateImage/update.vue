<!--
 * @Date         : 2020-03-12 16:45:12
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-12 20:27:55
 * @FilePath     : /src/components/updateImage/update.vue
 * 入参
 * @url          : 图片位于服务器的地址
 * @loading      : 加载loading
 * @look         : 是否查看加载后的图片
 * 出参
 * @blob         : 上传的blob图片
 * @base64       : 上传的base64图片
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import msg from "common/MessageUtils";

@Component({})
export default class Update extends Vue {
  public files: any;
  @Prop({
    type: String,
    default: ""
  })
  private url;
  @Prop({
    type: Boolean,
    default: false
  })
  private loading;
  @Prop({
    type: Boolean,
    default: false
  })
  private look;
  constructor() {
    super();
    this.hasUrl();
  }
  update() {
    (this.$refs.file as HTMLFormElement).click();
  }
  hasUrl() {
    if (this.url.length) {
      (this.$refs.img as HTMLFormElement).src = this.url;
      (this.$refs.imgWrap as HTMLFormElement).classList.add("src");
    }
  }
  getImg(e) {
    let reader;
    let blob = e.target.files[0]
    let format = /\.(jpg|png|jpeg|gif)$/.test(blob.name);
    if (e && format) {
      reader = new FileReader();
      reader.readAsDataURL(blob);
      this.$emit("blob", blob);
      reader.onload = base => {
        if (this.look) {
          (this.$refs.img as HTMLFormElement).src = base.target.result;
          (this.$refs.imgWrap as HTMLFormElement).classList.add("src");
        }
        this.$emit("base64", base.target.result);
      };
    } else {
      msg.warning("只能上传jpg、jpeg、png、gif格式的图片");
      e.target.value = null;
    }
  }
  del() {
    (this.$refs.img as HTMLFormElement).src = "";
    (this.$refs.imgWrap as HTMLFormElement).classList.remove("src");
    (this.$refs.file as HTMLFormElement).value = null;
  }
}
</script>
<template lang="pug" src="./update.pug" />
<style lang="stylus" src='./update.stylus' />