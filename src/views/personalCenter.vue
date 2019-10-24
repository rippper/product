/**
* 个人中心
*/
<template>
  <div class="personalCenter container_bottom">
    <header-fix title="个人中心"></header-fix>
    <div class="person_top">
      <div class="person_top1">
        <error-img class="user_avatar" :src="userInfo.UserPhoto" :error-src="noPhoto" alt="头像"></error-img>
        <h4>{{userInfo.Username}}</h4>
      </div>
      <div class="my_info">
        <div class="my_info_job">
          <h2>{{userInfo.UserZW || '无'}}</h2>
          <p>我的职务</p>
        </div>
        <div class="my_info_score">
          <h2>{{userInfo.TotalCredit}}</h2>
          <p>我的学分</p>
        </div>
      </div>
    </div>
    <div class="person-link">
      <ul>
        <li>
          <router-link :to="{name: 'thoughtReport'}">
            <!-- <img src="../assets/hq-personal-ico-5.png" alt="思想汇报"> -->
            <p>思想汇报</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myCourse">
            <!-- <img src="../assets/hq-personal-course.png" alt="我的课程"> -->
            <p>我的课程</p>
          </router-link>
        </li>
        <li>
          <router-link to="/myExam">
            <img src="../assets/my-exam-icon.png" alt="我的考试">
            <p>我的考试</p>
          </router-link>
        </li>
        <li>
          <router-link to="/rankList">
            <!-- <img src="../assets/hq-personal-rank.png" alt="排行榜"> -->
            <p>排行榜</p>
          </router-link>
        </li>
        <li>
          <div class="qrcode" @click="toggleModel">
            <!-- <img src="../assets/hq-personal-code.png" alt="APP二维码"> -->
            <p>APP二维码</p>
          </div>
        </li>
        <li>
          <router-link to="/setting">
            <!-- <img src="../assets/hq-personal-set-up.png" alt="更多设置"> -->
            <p>更多设置</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="exit">
      <mt-button v-if="userAgent.weixin&&isAllowWeiXin" @click.native="exit" type="primary" size="large">
        解除微信绑定
      </mt-button>
      <mt-button v-else @click.native="exit" type="primary" size="large">安全退出</mt-button>
    </div>
    <footer-fix selected="personalCenter"></footer-fix>
    <mb-model :isShow.sync="showModel">
      <img class="app_code" src="../assets/app_code.png" alt="app二维码">
    </mb-model>
  </div>
</template>
<script>
  import { Button, Cell } from 'mint-ui'
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import noPhoto from '../assets/user_avatar.png'
  import { errorImg, footerFix, headerFix, mbModel } from '../components'
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
      headerFix,
      errorImg,
      mbModel
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
      background: url(../assets/hq-personal-shinebg.png) center top;
      background-size: toRem(698px) toRem(401px);

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

    .person-link {
      ul {
        @extend %clearFix;

        li {
          width: 50%;
          text-align: center;
          @extend %pull-left;
          margin-top: toRem(75px);

          img {
            width: toRem(61px);
            height: toRem(61px);
          }

          p {
            color: #333;
            font-size: 14px;
            margin-top: toRem(10px);
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
