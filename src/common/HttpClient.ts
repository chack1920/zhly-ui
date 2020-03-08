// 默认利用axios的cancelToken进行防重复提交。
// 如需允许多个提交同时发出。则需要在请求配置config中增加 neverCancel 属性，并设置为true

import axios from 'axios';
import router from './routerConfig'
import store from "store";

// import loadingurls from '../config/loadurls.json'

/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let name: string;
// let loadingUrlList: Array<any> = loadingurls;
let loadingUrlList: Array<any> = [];
const CancelToken: any = axios.CancelToken;


const removePending: any = (config: any, f: any) => {
  // 获取请求的url
  const flagUrl = config.url;
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f('您操作太快了'); // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    if (f) {
      pending.push(flagUrl);
    }
  }
};

/* 创建axios实例 */
const service = axios.create({
  timeout: 200000, // 请求超时时间
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

// 下载函数
function downLoad(data, name) {
  let blob = []
  blob.push(data)
  let url = window.URL.createObjectURL(new Blob(blob, { type: "application/vnd.ms-excel;charset=utf-8" }))
  let a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', `${name}.xlsx`)
  document.body.appendChild(a)
  a.click()
}

/* request拦截器 */
service.interceptors.request.use((config: any) => {
  config.headers.Authorization = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  // neverCancel 配置项，允许多个请求
  // if (!config.neverCancel) {
  //     // 生成cancelToken
  //     config.cancelToken = new CancelToken((c: any) => {
  //         removePending(config, c);
  //     });
  // }
  // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
  //   if (store.getters.sessionId) {
  //     config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
  //   }
  name = config.params ? config.params : ''
  if (loadingUrlList.includes(config.url.split("?")[0])) {
    store.commit('changeLoading', true);
  }
  return config;
}, (error: any) => {
  Promise.reject(error);
});

/* respone拦截器 */
service.interceptors.response.use(

  (response: any) => {
    // if (pending.length === 0 ) {
    //     store.commit('changeLoading', false);
    // }
    store.commit('changeLoading', false);
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config);
    if (response.status) {
      if (response.status != 200) {
        throw response.data.message;
      }
    }
    if (response.data) {
      if (response.data.status != 0 && response.data.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        throw response.data.message;
      } else if (response.data.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        downLoad(response.data, name)
      }
      const data = response.data;
      return data;
    }

  },
  (error: any) => {

    // 异常处理
    console.log(error)

    pending = [];
    if (error.response != undefined) {
      if (error.response.status == 401) {
        router.push("/login");
        return;
      }
    }
    if (error.message === '您操作太快了') {
      error.message = false;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default service;


/****使用例子****/
//
// // api/main.ts
// import request from '@/common/HttpClient';
//
// // get
// request.get(URL)
//
// // post
// request.post(URL, data)