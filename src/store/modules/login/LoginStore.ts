/*
 * @Date         : 2020-03-05 15:48:41
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-16 18:42:43
 * @FilePath     : \src\store\modules\login\LoginStore.ts
 */
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "store";
import router from "common/RouterConfig";
import { requestConfig } from "request/requestConfig";
import { server as axios } from "common/HttpClient";
import msg from "common/MessageUtils";
import md5 from "md5";

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "LoginStore",
  store
})
export default class LoginStore extends VuexModule {
  public username: string; //state
  public password: string;
  public pid: string;
  public cid: string;
  public name: string;
  constructor(args) {
    super(args);
    this.username = "";
    this.password = "";
    this.pid = sessionStorage.getItem("pid") || null;
    this.cid = sessionStorage.getItem("cid") || null;
    this.name = sessionStorage.getItem("userName") || null;
  }

  @Mutation
  public login() {
    if (this.username && this.password) {
      axios
        .post(
          `${requestConfig.login.login}?userAccount=${
            this.username
          }&userPassword=${md5(this.password)}&entry=1`
        )
        .then(res => {
          if (res["code"] == -1) {
            msg.warning(res["msg"]);
            this.password = "";
          } else if (res["code"] == 0) {
            sessionStorage.setItem("loginStatus", "login");
            sessionStorage.setItem("userId", res.data.id);
            sessionStorage.setItem("userType", res.data.userType);
            sessionStorage.setItem("userAccount", res.data.userAccount);
            sessionStorage.setItem("userName", res.data.userName);
            this.name = sessionStorage.getItem("userName");
            if (res.data.userType == 2) {
              sessionStorage.setItem("pid", res.data.projectId);
              this.cid = sessionStorage.getItem("pid");
              router.push({ path: "/home/homePage" });
            } else {
              sessionStorage.setItem("cid", res.data.companyId);
              this.cid = sessionStorage.getItem("cid");
              router.push({ path: "/bloc/blocPage" });
            }
          }
        });
    } else if (!this.username) {
      msg.warning("请输入账号!");
    } else if (!this.password) {
      msg.warning("请输入密码!");
    }
  }
}
