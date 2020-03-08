/*
 * @Date         : 2020-03-05 15:48:41
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 15:45:35
 * @FilePath     : /src/store/modules/login/LoginStore.ts
 */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "store";
import router from 'common/RouterConfig';
// import rest from 'common/HttpClient';
import msg from 'common/MessageUtils'
import { requestConfig } from 'request/requestConfig';
import md5 from 'md5';

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "LoginStore",
  store,
})
export default class LoginStore extends VuexModule {
  public username: string; //state
  public password: string;
  constructor(args) {
    super(args);
    this.username = '';
    this.password = '';
  }

  // @Action({ commit: 'success' })
  // public async login() {
  @Mutation
  public login() {
    if (this.username && this.password) {
      msg.success('发送请求')
    } else if (!this.username) {
      msg.warning('请输入账号')
    } else if (!this.password) {
      msg.warning('请输入密码')
    }
    // router.push({ path: '/home' })
    /*await rest.post(requestConfig.login,'').then((data)=>{

    }).catch((e)=>{

    })*/
  }

  // @Mutation
  // private setUsername(data: String) {
  //   this.username = data;
  // }

  // @Mutation
  // private setPassword(data: String) {
  //   this.password = data;
  // }

  @Mutation
  private success() {
    //requestConfig.login;
  }
}
