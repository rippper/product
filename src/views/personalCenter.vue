/**
* 个人中心
*/
<template>
  <div class="personalCenter container_bottom">
    <header-fix title="个人中心">
      <router-link slot="left" >
        <img src="../assets/message-icon.png" alt="">
      </router-link>
      <router-link slot="right" to="/courseSearch"><img src="../assets/scan-code-img.png" alt=""></router-link>
    </header-fix>
    <div class="wrapper">
      <div class="person-info">
        <div class="top">
          <div class="headImg">
            
          </div>
        </div>
        <div class="text">

        </div>
      </div>
      <div class="person-link">
        <ul>
          <li>
            <p class="num"></p>
            <p class="tip"></p>
          </li>
          <li>
            <p class="num"></p>
            <p class="tip"></p>
          </li>
          <li>
            <p class="num"></p>
            <p class="tip"></p>
          </li>
        </ul>
      </div>
    </div>
    <footer-fix selected="personCenter"></footer-fix>
  </div>
</template>
<script>
  import { Button, Cell } from 'mint-ui'
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import noPhoto from '../assets/user_avatar.png'
  import { footerFix, headerFix } from '../components'
  import { LoginOut, DelBind } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.component(Cell.name, Cell)
  Vue.component(Button.name, Button)
  export default {
    mixins: [goBack],
    data () {
      return {
        showModel: false,
        noPhoto
      }
    },
    mounted () {
      this.getUserInformation()
    },
    computed: {
      ...mapState(['userInfo', 'userAgent', 'wxLoginUrl'])
    },
    components: {
      footerFix,
      headerFix
    },
    methods: {
      ...mapActions(['getUserInformation', 'saveUserInfo']),
      async exit () {
        let data
        if (this.userAgent.weixin && this.isAllowWeiXin) {
          data = await DelBind()
        } else {
          data = await LoginOut()
        }
        if (data.IsSuccess) {
          this.saveUserInfo({})
          window.localStorage.removeItem('ASPXAUTH')
          if (this.userAgent.weixin && this.isAllowWeiXin) {
            window.location.href = this.wxLoginUrl
          } else {
            this.$router.push('/login')
          }
        }
      },
      toggleModel () {
        this.showModel = !this.showModel
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .personalCenter {
    // background: url("../assets/hq-personal-bg.png") no-repeat center top;
    background-size: 10rem toRem(390px);
    background-color: #fff;

    .header {
      width: 100%;
      background: transparent;
      background-color: #3e6ed7; 
      .webapp-left {
        font-size: 22px;
        color: #fff;
      }

      .header_title {
        color: #fff;
      }
    }

    .person_top {
      width: toRem(698px);
      height: toRem(401px);
      margin: 0 auto;
      padding-top: toRem(34px);
      align-items: center;
      .person_top1 {
        .user_avatar {
          @include square(150px);
          border-radius: 50%;
          display: block;
          margin: 0 auto;
        }

        h4 {
          text-align: center;
          color: #333;
          font-size: 20px;
          margin-top: toRem(15px);
        }
      }

      .my_info {
        @extend %clearFix;
        margin-top: toRem(25px);

        .my_info_job {
          @extend %pull-left;
          margin-left: toRem(80px);
          text-align: center;

          h2 {
            color: #333;
            font-size: 18px;
            height: 24px;
            line-height: 24px;
          }

          p {
            color: #999;
            font-size: 14px;
          }
        }

        .my_info_score {
          @extend %pull-right;
          margin-right: toRem(80px);
          text-align: center;

          h2 {
            color: #333;
            font-size: 18px;
            height: 24px;
            line-height: 24px;
          }

          p {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
    .exit {
      margin-bottom: toRem(20px);

      .mint-button--large {
        width: toRem(690px);
        margin: toRem(80px) auto 0;
        height: toRem(80px);
        line-height: toRem(80px);
        background-image: linear-gradient(to right, #fb9f22, #dd1100);
      }
    }

    .webapp {
      font-size: toRem(32px);
    }

    .mb-model_container {
      .app_code {
        margin: 0 auto;
        display: block;
        @include square(300px);
      }
    }
  }
</style>
