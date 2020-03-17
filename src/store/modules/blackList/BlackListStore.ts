/*
 * @Date         : 2020-03-16 11:03:06
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-16 19:11:57
 * @FilePath     : /src/store/modules/blackList/BlackListStore.ts
 */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../..";
import { requestConfig } from 'request/requestConfig';
import { server as axios } from 'common/HttpClient';
import msg from 'common/MessageUtils';

@Module({
  namespaced: true,
  stateFactory: true,
  dynamic: true,
  name: "BlackListStore",
  store,
})
export default class BlackListStore extends VuexModule {
  public name: string = '';
  public searchName: string = '';
  public total: number = 0
  public pageSize: number = 15;
  public pageNum: number = 1;
  public loading: boolean = false
  public pid: string
  public checked: Array<any> = []
  public id: string = ''
  public peopleName: string = ''
  public searchPeopleName: string = ''
  public isBlacklist: string | number = ''
  public searchIsBlacklist: number | string = ''
  public tableData: any = [];
  constructor(e) {
    super(e)
    this.pid = sessionStorage.getItem("pid")
  }
  @Action
  public getData(): Promise<any> {
    this.createdData()
    return axios
      .post(`${requestConfig.blackList.tableData}?pid=${this.pid}&pageSize=${this.pageSize}&pageNum=${this.pageNum}&companyName=${this.searchName}&isBlacklist=${this.searchIsBlacklist}&empName=${this.searchPeopleName}`)
      .then((res: any) => {
        if (res.code == 0) {
          this.hasData(res.data)
          return this.tableData
        } else {
          return
        }
      })
  }
  @Mutation
  public createdData() {
    this.loading = true
    this.name = this.searchName
    this.peopleName = this.searchPeopleName
    this.isBlacklist = this.searchIsBlacklist
  }
  @Mutation
  public hasData(res) {
    this.total = res.total
    this.tableData = res.rows
    this.loading = false
  }
  @Action
  private async search() {
    this.createdSearch()
    let data: Array<any> = await this.getData()
    if (data && data.length == 0) {
      msg.warning('未搜索到相关数据!')
    }
  }
  @Mutation
  public createdSearch() {
    this.searchName = this.name
    this.searchPeopleName = this.peopleName
    this.searchIsBlacklist = this.isBlacklist
    this.pageNum = 1
  }
  @Action
  private deleteBlackList() {
    let list = this.getChecked
    if (list && list.length) {
      let ids = ''
      for (let i = 0; i < list.length; i++) {
        ids = ids + list[i].id + ','
      }
      ids = ids.substring(0, ids.length - 1)
      return axios
        .post(`${requestConfig.blackList.delete}?ids=${ids}`)
        .then((res: any) => {
          if (res.code == 0) {
            msg.success('成功!')
            this.getData()
          }
        })
    }
  }
  get getChecked() {
    return this.checked
  }
  @Action
  public handleCurrentChange(val) {
    this.setPage(val)
    this.getData()
  }
  @Mutation
  public setPage(val) {
    this.pageNum = val
  }
  @Action
  addBlackList() {
    let list = this.getChecked
    if (list && list.length) {
      let ids = ''
      for (let i = 0; i < list.length; i++) {
        ids = ids + list[i].id + ','
      }
      ids = ids.substring(0, ids.length - 1)
      return axios
        .post(`${requestConfig.blackList.add}?ids=${ids}`)
        .then((res: any) => {
          if (res.code == 0) {
            msg.success('成功!')
            this.getData()
          }
        })
    }
  }
}