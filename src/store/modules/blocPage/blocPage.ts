/*
 * @Date         : 2020-04-17 09:27:33
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-17 14:08:00
 * @FilePath     : \src\store\modules\blocPage\blocPage.ts
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
  name: "BlocPageStore",
  store,
})
export default class BlocPageStore extends VuexModule {
  public store: any; //state
  public cid: string;
  public companyList: any;
  public blocPage: any = requestConfig.blocPage;
  public projectSum: number = 0;
  constructor(e) {
    super(e);
    this.cid = sessionStorage.getItem("cid");
  }
  @Action
  getTreeList() {
    this.getCompanyList();
    this.getProjectList();
  }
  @Mutation
  getCompanyList() {
    axios
      .post(`${this.blocPage.companyList}?companyId=${this.cid}`)
      .then((res) => {
        if (res.data.code == 0 && res.data.total) {
          this.companyList = res.data.rows;
        }
      });
  }
  @Mutation
  getProjectList() {
    axios
      .post(`${this.blocPage.projectList}?companyId=${this.cid}&region=0`)
      .then((res) => {
        res.data.forEach((a) => {
          // 控件prop，显示名称和是否含有下拉三角
          a.companyName = a.projectName;
          a.leaf = true;
          this.companyList.push(a);
        });
      });
  }
  @Action
  getCompanyName() {
    return axios.post(`${this.blocPage.getComoanyName}?id=${this.cid}`)
  }
}
