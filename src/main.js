import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import VueFilter from './filters'
import VueComponents from './components/global'
import './assets/iconfont/iconfont.css'
import { getWXUrl, setStore, userAgent, changeTitle } from './plugins/utils'
import { isAllowWeiXin } from './service/config'
import routes from './router'
import { CheckLoginStatus } from './service/getData'
import store from './store/'
import './style/base.scss'
import App from './App'
// FastClick绑定
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(VueFilter)
Vue.use(VueComponents)
Vue.use(VueRouter)

Vue.prototype.isAllowWeiXin = isAllowWeiXin
const agent = userAgent()

// 检查登录状态
const getLoginStatus = (currentUrl) => {
  let userInfo = store.state.userInfo
  CheckLoginStatus({ Mac: userInfo.Account }).then(res => {
    if (!res.IsSuccess || !res.Data.OnlineFlag) {
      store.dispatch('saveUserInfo', {})
      if (agent.ios) {
        if (window.webkit && !window.hasNotifyLogout) {
          window.hasNotifyLogout = !window.hasNotifyLogout
          window.webkit.messageHandlers.notifyLogout.postMessage('notifyLogout')
          return
        }
      }
      if (agent.android) {
        if (window.jyzx) {
          console.log('修改 main')
          window.hasNotifyLogout = true
          window.jyzx.notifyLogout()
          return
        }
      }
      if (window.hasNotifyLogout) return // 如果是app内嵌页面，则掉线后不跳到登录页
      if (agent.weixin && isAllowWeiXin) {
        window.location.href = getWXUrl('#/login')
      } else {
        router.push({ path: '/login', query: { currentUrl } })
      }
    }
  })
}
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  /* 判断mobile weixin */
  setStore('userAgent', agent)
  store.dispatch('getUserAgent')
  let fromUrl = from.fullPath
  let href = window.location.href
  if (!/\/favicon\.ico/.test(href)) {
    setStore('fromUrl', fromUrl)
  }
  let title = to.meta.title
  changeTitle(title)
  if (!to.meta.isSkip) {
    if (to.meta.bindApp && to.query.token) {
      /* myEval民主测评页面需要在app中的webview显示，所以需要token，
        并将token存储到localStorage中，在后续请求中保持登录的状态
      */
      localStorage.setItem('ASPXAUTH', to.query.token)
      store.dispatch('getUserInformation', {})
      next()
    } else if (JSON.stringify(store.state.userInfo) === '{}') {
      if (agent.weixin && isAllowWeiXin) {
        window.location.href = getWXUrl('#/login')
      } else {
        next({ path: '/login' })
      }
    }
  }
  next()
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
  /* 存入当前url */
  let currentUrl = to.fullPath
  let href = window.location.href
  if (!/\/favicon\.ico/.test(href)) {
    setStore('currentUrl', currentUrl)
  }
  if (!to.meta.isSkip) {
    getLoginStatus(currentUrl)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
