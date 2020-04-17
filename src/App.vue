<!--
 * @Date         : 2020-02-24 14:32:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-16 18:54:01
 * @FilePath     : \src\App.vue
 -->
<template lang='pug'>
  #app
    headers(v-if="show")
    company-head(v-if="companyShow")
    router-view
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
import head from "components/head/index.vue";
import companyHead from 'components/companyHead/index.vue';
// import { getModule } from 'vuex-module-decorators';
// import LoginStore from 'store/modules/login/LoginStore';

@Component({
  name: "APP",
  components: {
    headers: head,
    companyHead
  }
})
export default class App extends Vue {
  constructor() {
    super();
    this.adapt();
    window.onresize = () => this.adapt();
  }

  private adapt(): void {
    const StandardWidth = 1920;
    const StandardFontSize = 100;
    const nowWidth =
      document.documentElement.offsetWidth < 1600
        ? 1600
        : document.documentElement.offsetWidth;
    const nowFontSize = (nowWidth / StandardWidth) * StandardFontSize;
    document.documentElement.style.fontSize = nowFontSize + "px";
  }

  get show() {
    let path = this["$route"].matched.length
      ? this["$route"].matched[0].path
      : "";
    switch (path) {
      case "/login":
        return false;
      case "/home":
        return true;
      default:
        return false;
    }
  }

  get companyShow() {
    let path = this["$route"].matched.length
      ? this["$route"].matched[0].path
      : "";
    // let path = this['$route'].path;
    switch (path) {
      case "/login":
        return false;
      case "/bloc":
        return true;
      default:
        return false;
    }
  }
}
</script>

<style lang="stylus">
@import 'assets/style/index.css';
@import 'styles/app.stylus';

.time-picker-wrap {
  font-size: 0;
}
</style>