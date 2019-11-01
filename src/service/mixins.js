import { userAgent } from '../plugins/utils'

export const goBack = {
  methods: {
    goBack: function () {
      this.$router.go(-1)
      let UA = userAgent()
      if (!window.history.state) {
        if (UA.ios) {
          window.webkit.messageHandlers.leaveWebview.postMessage('leaveWebview')
        }
        if (UA.android) {
          window.jyzx.leaveWebview()
        }
      }
    }
  }
}

export const toPlay = {
  methods: {
    toPlay: function (type, id) {
      console.log(type, id)
      if (type == 'Mp4') {
        this.$router.push({ path: '/playMp4', query: { id } })
      } else if (type == 'JYAicc') {
        this.$router.push({ path: '/playJYAicc', query: { id } })
      } else if (type == 'H5') {
        this.$router.push({ path: '/playH5', query: { id } })
      }
    }
  }
}
