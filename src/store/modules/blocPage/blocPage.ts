/*
 * @Date         : 2020-04-17 09:27:33
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-19 21:47:34
 * @FilePath     : \src\store\modules\blocPage\blocPage.ts
 */
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Vue } from "vue-property-decorator";
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
  public companyList: Array<any> = [];
  public blocPage: any = requestConfig.blocPage;
  public projectNum: number = 0;
  public $v: Vue;
  constructor(e) {
    super(e);
    this.cid = sessionStorage.getItem("cid");
  }
  @Action
  async getTreeList() {
    await this.getCompanyListWrap(this.cid);
    this.getProjectList(this.cid);
  }
  @Action
  async getCompanyListWrap(cid) {
    await axios
      .post(`${this.blocPage.companyList}?companyId=${cid}`)
      .then(async (res) => {
        if (res.data.code == 0 && res.data.total) {
          await this.getCompanyList(res.data.rows);
        }
      });
  }
  @Mutation
  getCompanyList(res) {
    this.companyList = res;
    return;
  }
  @Mutation
  getProjectList(cid) {
    axios
      .post(`${this.blocPage.projectList}?companyId=${cid}&region=0`)
      .then((res: any) => {
        if (res.code == 0 && res.data.length) {
          res.data.forEach((a) => {
            // 控件prop，显示名称和是否含有下拉三角
            a.companyName = a.projectName;
            a.leaf = true;
            this.companyList.push(a);
          });
        }
      });
  }
  @Action
  getCompanyName() {
    return axios.post(`${this.blocPage.comoanyName}?id=${this.cid}`);
  }
  @Action
  getAllProjectNum() {
    return axios
      .post(`${this.blocPage.allProjectNum}?cid=${this.cid}&projectName=`)
  }
  @Action
  treeOpen(val) {
    axios
      .post(`${this.blocPage.companyList}?companyId=${val.id}`)
      .then((res: any) => {
        // 判断公司下时候还有子公司，没有的话就请求项目数据
        if (res.code == 0 && res.data.total == 0) {
          this.getPriject(val);
        } else if (res.code == 0 && res.data.total != 0) {
          // 含有子公司，将子公司添加到列表里
          // 如果没有子数据在渲染，否则会多次叠加
          if (!val.children) {
            this.$v.$set(val, "children", res.data.rows);
          }
          let companySize = res.data.total;
          axios
            .post(`${this.blocPage.projectList}?companyId=${val.id}&region=0`)
            .then((res: any) => {
              // 判断是否有项目
              if (res.code == 0) {
                for (let i = 0; i < res.data.length; i++) {
                  // 控件prop，显示名称和是否含有下拉三角
                  res.data[i].companyName = res.data[i].projectName;
                  res.data[i].leaf = true;
                }
                // 如果没有子数据在渲染，否则会多次叠加
                if (val.children.length == companySize) {
                  for (let i = 0; i < res.data.length; i++) {
                    val.children.push(res.data[i]);
                  }
                }
                // 渲染公司下的项目
                this.$v["mapMarkersList"](res.data);
              }
            });
        }
      });
  }

  @Action
  getPriject(data) {
    axios
      .post(`${this.blocPage.projectList}?companyId=${data.id}&region=0`)
      .then((res: any) => {
        // 判断是否有项目
        if (res.code == 0 && res.data.length == 0) {
          msg.warning("该公司下没有项目");
        } else if (res.code == 0) {
          for (let i = 0; i < res.data.length; i++) {
            // 控件prop，显示名称和是否含有下拉三角
            res.data[i].companyName = res.data[i].projectName;
            res.data[i].leaf = true;
          }
          // 如果没有子数据在渲染，否则会多次叠加
          if (!data.children) {
            this.$v.$set(data, "children", res.data);
          }
          // 渲染公司下的项目
          this.$v["mapMarkersList"](res.data);
        }
      });
  }
}
