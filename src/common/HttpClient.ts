// 默认利用axios的cancelToken进行防重复提交。
// 如需允许多个提交同时发出。则需要在请求配置config中增加 neverCancel 属性，并设置为true

import axios, { AxiosInstance } from 'axios';
import router from './routerConfig'
import store from "store/index";

// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let pending: any[] = [];
// 用于下载的名称
let name: string;
// 防止重复提交，利用axios的cancelToken
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
  // 获取请求的url
  const ip = 'http://47.106.71.3:8080'
  const req = config.url.includes(ip)
  const flagUrl = config.url.substring(req ? ip.length : 0, config.url.indexOf('?'));
  // 判断该请求是否在请求队列中
  if (pending.includes(flagUrl)) {
    // 如果在请求中，并存在f，f即axios提供的取消函数
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
let server = axios.create({
  timeout: 200000, // 请求超时时间
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  baseURL: "http://47.106.71.3:8080"
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
server.interceptors.request.use((config: any) => {
  // neverCancel 配置项，允许多个请求
  if (!config.neverCancel) {
    // 生成cancelToken
    config.cancelToken = new CancelToken((c: any) => {
      removePending(config, c);
    });
  }
  // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
  //   if (store.getters.sessionId) {
  //     config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
  //   }
  name = config.params ? config.params : ''
  return config;
}, (error: any) => {
  Promise.reject(error);
});

/* respone拦截器 */
server.interceptors.response.use(
  (response: any) => {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config);
    if (response.status) {
      if (response.status != 200) {
        throw response.data.message;
      }
    }
    if (response.config.responseType == "blob") {
      downLoad(response.data, name);
      return
    }
    if (response.data) {
      // if (response.data.status != 0 && response.data.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      //   throw response.data.message;
      // } else if (response.data.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      //   downLoad(response.data, name)
      // }
      return response.data;
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
export { server };
export { AxiosInstance };


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