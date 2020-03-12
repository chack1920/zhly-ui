/*
 * @Date         : 2020-03-09 20:03:02
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-12 14:12:01
 * @FilePath     : /src/store/modules/company/CompanyStore.ts
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
  name: "CompanyStore",
  store,
})
export default class CompanyStore extends VuexModule {
  public name: string = ''; //state
  public searchName: string = ''; //state
  public floor: string = ''
  public searchFloor: string = ''
  public total: number = 0
  public pageSize: number = 15;
  public pageNum: number = 1;
  public loading: boolean = false
  public pid: string
  public checked: Array<any> = []
  public id: string = ''
  public ruleForm: any = {
    companyName: '',
    floor: '',
    checkIdTime: '',
    personCharge: ''
  }
  public rules: any = {
    companyName: [
      { required: true, message: '公司名称不可为空', trigger: 'blur' }
    ]
  }
  public tableData: any = [];
  constructor(e) {
    super(e)
    this.pid = sessionStorage.getItem("pid")
  }
  @Action
  public getData(name = '', floor = ''): Promise<any> {
    this.createdData()
    return axios
      .post(`${requestConfig.company.tableData}?pid=${this.pid}&pageSize=${this.pageSize}&pageNum=${this.pageNum}&companyName=${name}&floor=${floor}`)
      .then((res: any) => {
        if (res.code == 0) {
          this.hasData(res)
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
    this.floor = this.searchFloor
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
    let data: Array<any> = await this.getData(this.searchName, this.searchFloor)
    if (data && data.length == 0) {
      msg.warning('未搜索到相关数据!')
    }
  }
  @Mutation
  public createdSearch() {
    this.searchName = this.name
    this.searchFloor = this.floor
    this.pageNum = 1
  }
  @Mutation
  async searchAlone(id) {
    return axios.post(`${requestConfig.company.tableData}?id=${id}`)
      .then((res: any) => {
        if (res.code == 0) {
          this.ruleForm.companyName = res.rows[0].companyName ? res.rows[0].companyName : ''
          this.ruleForm.floor = res.rows[0].floor ? res.rows[0].floor : ''
          this.ruleForm.checkIdTime = res.rows[0].checkIdTime ? res.rows[0].checkIdTime : ''
          this.ruleForm.personCharge = res.rows[0].personCharge ? res.rows[0].personCharge : ''
          return true
        }
      })
  }
  @Action
  private deleteCompony() {
    let list = this.getChecked
    if (list && list.length) {
      let id: string = ''
      list.forEach(a => id = id + a.id.toString() + ',')
      id = id.substring(0, id.length - 1)
      axios
        .post(`${requestConfig.company.delete}?ids=${id}`)
        .then((res: any) => {
          if (res.code == 0) {
            msg.success('删除成功!')
            this.getData()
          }
        })
    } else {
      msg.warning('请选择删除项！')
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
  @Mutation
  public clear() {
    for (const item in this.ruleForm) {
      this.ruleForm[item] = ''
    }
  }
  @Action
  public confirm(title) {
    switch (title) {
      case '新增公司':
        return axios
          .post(`${requestConfig.company.add}?companyName=${this.ruleForm.companyName}&floor=${this.ruleForm.floor}&checkIdTime=${this.ruleForm.checkIdTime}&personCharge	=${this.ruleForm.personCharge}&pid=${this.pid}`)
          .then((res: any) => {
            if (res.code == 0) {
              msg.success('新增成功')
              this.getData()
              this.clear()
              return true
            } else {
              msg.warning('新增失败')
              return false
            }
          })
        break;
      case '修改公司':
        return axios
          .post(`${requestConfig.company.update}?companyName=${this.ruleForm.companyName}&floor=${this.ruleForm.floor}&checkIdTime=${this.ruleForm.checkIdTime}&personCharge=${this.ruleForm.personCharge}&id=${this.id}`)
          .then((res: any) => {
            if (res.code == 0) {
              msg.success('修改成功')
              this.getData()
              this.clear()
              return true
            } else {
              msg.warning('修改失败')
              return false
            }
          })
    }
  }
}