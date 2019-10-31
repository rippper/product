<template>
  <div class="userLoginCom">
    <div class="head-handle">
      <p class="close" @click="closeLb"><img src="../assets/close-x.png" alt="">关闭</p>
      <router-link to='/register'>注册</router-link>
    </div>
    
    <div class="user_login">
      <div class="handle-tab">
        <p class="ttitle on">
          账号密码登录
        </p>
        <!-- <p claas="ht">
          手机登录
        </p> -->
      </div>

      <section >

      </section>
      <section>

      </section>
      <form>
        <div class="form-group">
          <img class="login_icon" src="../assets/hq-login-user.png" alt=""/>
          <input v-model="Account" class="form-control" type="text" placeholder="输入用户名/手机号">
          <span class="acError" v-if="acError">用户名不能包含汉字</span>
        </div>
        <div class="form-group">
          <img class="login_icon" src="../assets/hq-login-password.png" alt=""/>
          <input v-model="Password" class="form-control" type="password" placeholder="输入密码">
          <span class="pwError" v-if="pwError">密码长度6~16位</span>
        </div>
      </form>
      <div class="checkbox">
        <label for="remember_checkbox">
          <span class="mint-checkbox">
            <input id="remember_checkbox" v-model="Remember" type="checkbox" class="mint-checkbox-input">
            <span class="mint-checkbox-core"></span>
          </span>
          <span class="mint-checkbox-label">记住密码</span>&nbsp;
        </label>
        <a class="forget" @click="showForgetMessage">忘记密码？</a>
      </div>
      <mt-button class="login_btn" size="large" type="primary" @click.native="clickLogin">登录</mt-button> 
    </div>
  </div>
</template>
<script>
  import CryptoJS from 'crypto-js'
  import { Button, Indicator, MessageBox, Toast } from 'mint-ui'
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import { getStore, setStore, getQueryString } from '../plugins/utils'
  import { Login } from '../service/getData'

  Vue.component(Button.name, Button)

  export default {
    name: 'login',
    data () {
      return {
        Account: '',
        Password: '',
        Remember: true,
        Code: '',
        backUrl: '',
        key: 'jy365jy365jy365y',
        iv: '0392039203920300',
        pwError: false,
        acError: false
      }
    },
    components: {
    },
    created () {
      let code = getQueryString().code
      if (code) {
        this.Code = code.split('#/')[0]
      }
      this.getUserAgent()
    },
    mounted () {
      let backUrl = this.$route.query.currentUrl
      if (backUrl) {
        this.backUrl = backUrl
      } else {
        this.backUrl = { name: 'home' }
      }
      this.Account = this.decrypt(localStorage.getItem('a_app'))
      this.Password = this.decrypt(localStorage.getItem('p_app'))
      this.Remember = getStore('remember')
    },
    computed: {
      ...mapState(['userAgent', 'wxLoginUrl', 'wxIndexUrl'])
    },
    methods: {
      ...mapActions(['getUserAgent', 'getUserInformation', 'saveUserInfo']),
      // 登陆
      async clickLogin () {
        if (!this.Account || !this.Password) {
          Toast({ message: '用户名或密码不能为空', position: 'bottom' })
          return
        }
        let loginParams = {
          Account: this.Account,
          Password: this.Password,
          Code: this.Code,
          Mac: this.Account
        }
        Indicator.open()
        let res = null
        res = await Login(loginParams)
        Indicator.close()
        if (res.IsSuccess) {
          this.saveUserInfo(res.Data)
          this.getUserInformation(res)
          if (this.Remember) {
            this.encrypt('a_app', this.Account)
            this.encrypt('p_app', this.Password)
            setStore('remember', true)
          } else {
            this.encrypt('a_app', '')
            this.encrypt('p_app', '')
            setStore('remember', false)
          }
          this.$router.replace(this.backUrl)
        } else if (res.Type == 0) {
          MessageBox('警告', res.Message)
        } else {
          MessageBox('警告', '登陆异常')
        }
      },
      // 加密
      encrypt (name, value) {
        let encryptText = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        })
        localStorage.setItem(name, encryptText)
      },
      // 解密
      decrypt (value) {
        let decryptText = CryptoJS.AES.decrypt(value || ' ', CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8)
        return decryptText
      },
      showForgetMessage () {
        MessageBox.alert('如果忘记密码，请联系本单位联络员或客服0571-28990788', '温馨提示')
      }
    },
    watch: {
      Password (val) {
        if (!val) return
        let flag = false
        let length = val.length
        if (length < 6 || length > 16) {
          flag = true
        }
        this.pwError = flag
      },
      Account (val) {
        if (!val) return
        let flag = 0
        let reg = /^[\u4e00-\u9fa5]+$/
        let arr = val.split('')
        for (var i in arr) {
          if (reg.test(arr[i])) {
            flag = true
            break
          }
        }
        this.acError = flag
      }
    },
    props: {
      closeLb: {
        type: Function
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .userLoginCom {
    width: 100%;
    min-height: 100vh;
    background-color: transparent;
    .head-handle{
      @extend %clearFix;
      padding: toRem(35px) toRem(30px) 0;
      .close{
        float: left;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        img{
          width: toRem(34px);
          height: toRem(34px);
          margin-right: toRem(10px);
        }
      }
      a {
        float: right;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
    }
    
    .user_login {
      padding: toRem(116px) toRem(60px) 0 toRem(60px);
      background: #fff;
      border-radius: toRem(30px) toRem(30px) 0 0;
      margin-top: toRem(25px);
      height: 93vh;
      .handle-tab{
        padding: 0 toRem(30px) toRem(150px);
        .ttitle{
          color: #333;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
        }
      }
      .form-control {
        border: none;
        padding-left: toRem(80px);
        background-color: transparent;
        font-size: toRem(30px);
        @include ht-lineHt(98px);
      }

      .form-group {
        border-bottom: 1px solid $border-color-base;
        background: transparent;
        position: relative;
        width: 100%;
        margin-bottom: toRem(30px);

        .login_icon {
          color: $color-text-thirdly;
          position: absolute;
          top: 50%;
          left: toRem(20px);
          transform: translateY(-50%);
          width: toRem(42px);
        }
      }

      .pwError, .acError {
        position: absolute;
        right: toRem(10px);
        top: 0;
        color: $brand-error;
        @include ht-lineHt(80px);
      }

      .checkbox {
        font-size: 14px;
        margin-top: toRem(-20px);

        input[type=checkbox] {
          width: toRem(24px);
          height: toRem(24px);
          margin: 0;
        }

        .mint-checkbox-core {
          border-radius: toRem(5px);
          @include square(30px);
        }

        .mint-checkbox-core::after {
          left: 4px;
          top: 0;
          width: 5px;
          height: 10px;
        }

        .mint-checkbox-input:checked + .mint-checkbox-core {
          // background-color: $brand-primary;
          // border-color: $brand-primary;
          background-color: #4374df;
          border-color: #4374df;
        }
      }

      .forget {
        @extend %pull-right;
        display: inline-block;
        @include ht-lineHt(90px);
      }

      .login_btn {
        margin-top: toRem(180px);
        height: toRem(80px);
        border-radius: toRem(40px);
        background: #4374df;
        font-size: toRem(34px);
      }
      
    }
  }

</style>
