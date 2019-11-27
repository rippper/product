<template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <mt-popup
      v-model="showLogin"
      position="bottom"
      class="LoginPopup"
      >
      <login-box :close-lb="closeLb" :go-reg="goReg"></login-box>
    </mt-popup>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { getStore } from './plugins/utils'
  import { Popup, Toast } from 'mint-ui'
  Vue.component(Popup.name, Popup)
  Vue.component(Toast.name, Toast)
  export default {
    data () {
      return {
        showLogin: false,
        disconnect: false // 用户是否掉线 true为掉线
      }
    },
    mounted () {
      let userInfo = getStore('userInfo')
      // console.log(userInfo)
      let body = document.querySelector('body')
      if (!userInfo || userInfo == {}) {
        // 用户掉线的情况下 弹出用户登陆框 且禁止页面滚动
        this.showLogin = true 
        body.style.overflow = 'hidden'
        body.style.height = '100vh'
        this.disconnect = true
      } else {
        this.showLogin = false
        body.style.overflow = 'auto'
        body.style.height = 'auto'
        this.disconnect = false
      }
    },
    computed: {
    },
    methods: {
      closeLb () {
        if (this.disconnect) {
          Toast({ message: '请您登录后再关闭', position: 'middle' })
        } else {
          this.showLogin = false
        }
      },
      goReg () {
        let body = document.querySelector('body')
        body.style.overflow = 'auto'
        body.style.height = 'auto'
        this.showLogin = false
        this.$nextTick(() => {
          this.$router.push('/register')
        })
      }
    }
  }
</script>

<style lang="scss">
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }

  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
  .LoginPopup{
    background: transparent;
    &.mint-popup-bottom{
      width: 100%;
    }
  }
</style>
