import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'
import qs from 'qs'
// import { getStore, getWXUrl, userAgent } from '../plugins/utils'
// import { isAllowWeiXin, pathname } from '../service/config'
import { getStore, userAgent } from '../plugins/utils'
import { isAllowWeiXin } from '../service/config'
/**
 * ajax请求
 */
let timeLimit = true
axios.defaults.baseURL = ''
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 拦截器
axios.interceptors.request.use(config => {
  // 将aspxauth添加到请求头
  let aspxauth = localStorage.getItem('ASPXAUTH')
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  if (aspxauth) {
    config.headers.ASPXAUTH = aspxauth
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  Indicator.close()
  // 如果http状态码正常，则直接返回数据
  if (response) {
    // 存储aspxauth身份验证
    let aspxauth = response.headers.aspxauth || response.headers.ASPXAUTH
    if (aspxauth) {
      window.localStorage.setItem('ASPXAUTH', aspxauth)
    }
    if (response.data.Data && response.data.Data.xxx) {
      window.localStorage.setItem('ASPXAUTH', response.data.Data.xxx)
    }
    if (timeLimit) {
      // 用户掉线
      if (response.data.Type == 401) {
        timeLimit = false
        // var currentUrl = window.localStorage.getItem('currentUrl')
        window.localStorage.removeItem('ASPXAUTH')
        let UA = userAgent()
        if (UA.ios) {
          if (window.webkit && !window.hasNotifyLogout) {
            window.hasNotifyLogout = !window.hasNotifyLogout
            window.webkit.messageHandlers.notifyLogout.postMessage('notifyLogout')
            return
          }
        }
        if (UA.android) {
          if (window.jyzx) {
            console.log('修改 fetch')
            window.hasNotifyLogout = true
            window.jyzx.notifyLogout()
            return
          }
        }
        if (window.hasNotifyLogout) return // 如果是app内嵌页面，则掉线后不跳到登录页
        if (getStore('userAgent').weixin && isAllowWeiXin) {
          Toast({ message: '账号掉线，请重新登录', position: 'bottom' })
          // window.location.href = getWXUrl('#/login?currentUrl' + encodeURIComponent(currentUrl))
        } else {
          Toast({ message: '账号掉线，请重新登录', position: 'bottom' })
          // window.location.href = `${pathname}/#/login?currentUrl=${encodeURIComponent(
          //   currentUrl)}`
        }
      } else if (response.data.Type != 1 && response.status !== 200) {
        console.warn(`status:${response.status},statusText:${response.statusText}`)
        console.warn(response.data.Message)
      }
      let timer = setTimeout(() => {
        timeLimit = true
        clearTimeout(timer)
      }, 1000)
    }
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常：' + response.data.Message
  }
}

function checkCode (res) {
  Indicator.close()
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg)
  }
  return res
}

export default {
  post (url, data) {
    data = qs.stringify(data) || {}
    return axios({
      method: 'post',
      url,
      data
    }).then( 
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        // loading.close()
      // Message('服务器异常')
      }
    )
  },
  postFormData (url, formData, config = {}) {
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        Indicator.close()
        Toast({ message: '服务器异常', position: 'bottom' })
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params: params
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      (err) => {
        console.log(err)
        Indicator.close()
        Toast({ message: '服务器异常', position: 'bottom' })
      }
    )
  }
}
