import {
  GET_USERINFO,
  GET_USERAGENT,
  GET_NETWORKTYPE,
  SAVE_USERINFO
} from './mutation-types.js'

export default {
  // 获取用户信息
  [GET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  // 获取userAgent
  [GET_USERAGENT] (state, userAgent) {
    state.userAgent = userAgent
  },
  // 获取网络类型
  [GET_NETWORKTYPE] (state, netWorkType) {
    state.netWorkType = netWorkType
  },
  // 保存用户信息
  [SAVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
