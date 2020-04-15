/*
 * @Date         : 2020-04-13 14:22:51
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-13 14:37:18
 * @FilePath     : \src\store\modules\videoList\VideoListStore.ts
 */
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../..";
import { requestConfig } from "request/requestConfig";
import { server as axios } from "common/HttpClient";
import msg from "common/MessageUtils";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "PersonnelStore",
  store
})
export default class PersonnelStore extends VuexModule {
  public pid: string;
  constructor(e) {
    super(e);
    this.pid = sessionStorage.getItem("pid");
  }
  // @Action
  // @Mutation
}