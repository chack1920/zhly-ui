/*
 * @Date         : 2020-03-09 18:23:35
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-17 14:24:40
 * @FilePath     : /src/store/modules/homePage/HomePageStore.ts
 */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../..";
import { server as axios } from 'common/HttpClient';
import { requestConfig } from 'request/requestConfig';

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "HomePageStore",
  store,
})
export default class HomePageStore extends VuexModule {
  public buildingName: string = 'admin'; //state
  public companyList: string = ""
  public floor: string = ""
  public peopleList: string = ""
  public month: string = ""
  public pid: string = sessionStorage.getItem("pid")
  public data: Array<any> = []

  @Action
  public getData() {
    return axios
      .post(`${requestConfig.homePage.getData}?pid=${this.pid}&time=${this.month}`)
      .then((res: any) => {
        if (res.code == 0) {
          this.createData(res)
        }
      })
  }

  @Mutation
  public createData(res) {
    this.buildingName = res.data.projectMap.projectName
    this.companyList = res.data.projectMap.companyCount
    this.floor = res.data.projectMap.floor
    this.peopleList = res.data.projectMap.zzryzs
    this.data = res.data.lsList
  }

  @Mutation
  private setPassword(data: String) {
  }

  @Mutation
  private success() {
    //requestConfig.login;
  }
}