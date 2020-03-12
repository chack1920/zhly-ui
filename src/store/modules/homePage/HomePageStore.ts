/*
 * @Date         : 2020-03-09 18:23:35
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-09 20:07:43
 * @FilePath     : /src/store/modules/homePage/HomePageStore.ts
 */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../..";
import router from 'common/RouterConfig';
// import rest from 'common/HttpClient';
import { requestConfig } from 'request/requestConfig';

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "HomePageStore",
  store,
})
export default class HomePageStore extends VuexModule {
  public username: String = 'admin'; //state
  public password: String = '';

  @Action({ commit: 'success' })
  public async login() {
    // this.setUsername("英雄！");
    // await rest.post(requestConfig.login,'').then((data)=>{

    // }).catch((e)=>{

    // })
  }

  @Mutation
  private setUsername(data: String) {
    this.username = data;
  }

  @Mutation
  private setPassword(data: String) {
    this.password = data;
  }

  @Mutation
  private success() {
    //requestConfig.login;
  }
}