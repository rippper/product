import { setStore, userAgent } from '../plugins/utils'
import { GetUserInfo } from '../service/getData'
import { GET_USERAGENT, GET_USERINFO, SAVE_USERINFO } from './mutation-types.js'

export default {
  async getUserInformation ({ state, commit }, payload) {
    let data = await GetUserInfo(payload)
    if (data.Type === 1) {
      setStore('userInfo', data.Data)
      commit(GET_USERINFO, data.Data)
    }
  },
  saveUserInfo ({ state, commit }, payload) {
    setStore('userInfo', payload)
    commit(SAVE_USERINFO, payload)
  },
  getUserAgent ({ state, commit }, payload) {
    let data = userAgent()
    commit(GET_USERAGENT, data)
  }
}
