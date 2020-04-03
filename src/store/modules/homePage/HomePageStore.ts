/*
 * @Date         : 2020-03-09 18:23:35
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-02 11:45:38
 * @FilePath     : \src\store\modules\homePage\HomePageStore.ts
 */
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../..";
import { server as axios } from "common/HttpClient";
import { requestConfig } from "request/requestConfig";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "HomePageStore",
  store
})
export default class HomePageStore extends VuexModule {
  public buildingName: string = "";
  public companyList: string = "";
  public floor: string = "";
  public peopleList: string = "";
  public month: string = "";
  public pid: string = sessionStorage.getItem("pid");
  public data: Array<any> = [];
  public changeName: string = "";
  public total: number = 10;
  public pageSize: number = null;
  public companyPeople: Array<any> = [];

  @Action
  public getData() {
    return axios
      .post(
        `${requestConfig.homePage.getData}?pid=${this.pid}&time=${this.month}`
      )
      .then((res: any) => {
        if (res.code == 0) {
          this.createData(res);
        }
      });
  }

  @Mutation
  public createData(res) {
    this.buildingName = res.data.projectMap.projectName;
    sessionStorage.setItem("buildingName", res.data.projectMap.projectName);
    this.companyList = res.data.projectMap.companyCount;
    this.floor = res.data.projectMap.floor;
    this.peopleList = res.data.projectMap.zzryzs;
    this.data = res.data.lsList;
  }

  @Action
  private changeNameClick() {
    return axios.post(
      `${requestConfig.homePage.change}?id=${this.pid}&projectName=${this.changeName}`
    );
  }

  @Mutation
  private success() {
    //requestConfig.login;
  }

  @Mutation
  private getCompanyPeople(pageNum) {
    axios
      .post(
        `${requestConfig.homePage.getPeople}?pid=${this.pid}&pageNum=${pageNum}&pageSize=${this.pageSize}`
      )
      .then((res:any) => {
        if (res.code == 0) {
          this.companyPeople = res.data.rows;
          this.total = res.data.total;
        }
      });
  }

  @Mutation
  private changePageSize(pageSize) {
    this.pageSize = pageSize;
  }

  @Action
  private getPieData() {
    return axios.post(`${requestConfig.homePage.today}?pid=${this.pid}`);
  }
}
