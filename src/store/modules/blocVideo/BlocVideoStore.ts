/*
 * @Date         : 2020-04-13 14:22:51
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-22 14:12:49
 * @FilePath     : \src\store\modules\blocVideo\VideoListStore.ts
 */
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../..";
import { requestConfig } from "request/requestConfig";
import { server as axios } from "common/HttpClient";
import msg from "common/MessageUtils";
import { Vue } from "vue-property-decorator";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "BlocVideoStore",
  store,
})
export default class BlocVideoStore extends VuexModule {
  public pid: string;
  public $Vue: Vue;
  constructor(e) {
    super(e);
    this.pid = sessionStorage.getItem("pid");
  }
  @Action
  getVideoList() {
    return axios.post(`/api/hyvideo/getVideoList?cid=1`);
  }
  // @Mutation
}