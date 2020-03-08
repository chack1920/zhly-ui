/*
 * @Date         : 2020-03-07 10:18:43
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-08 02:03:20
 * @FilePath     : /src/common/RouterConfig.ts
 */
import router from 'router/.invoke/router';
import store from 'store';
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    store.commit('changePath', to.path);
    sessionStorage.setItem('path', to.path);
    next();
    return;
  } else {
    if (sessionStorage.getItem("loginStatus") == "login") {//判断是否有登陆状态
      store.commit('changePath', to.path);
      sessionStorage.setItem('path', to.path);
      next();
      return;
    }else{
      next({path: '/login'});
      return;
    }
  }
})
export default router