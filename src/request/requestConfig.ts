/*
 * @Date         : 2020-03-05 11:37:23
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-10 20:46:14
 * @FilePath     : /src/request/requestConfig.ts
 */
//配置所有的接口
export const requestConfig ={
  login: {
    login: '/api/system/computer/login'
  },
  company: {
    tableData: '/api/lyCompany/selectPageList',
    searchAlone: '/api/lyCompany/selectId',
    add: '/api/lyCompany/insert',
    update: '/api/lyCompany/update',
    delete: '/api/lyCompany/delete'
  }
}