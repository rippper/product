/**
* 个人中心
*/
<template>
  <div class="personalCenter container_bottom">
    <header-fix title="个人中心">
      <router-link slot="left" to='/'>
        <img src="../assets/message.png" alt="">
      </router-link>
      <router-link slot="right" to="/courseSearch"><img src="../assets/scan-code-img.png" alt=""></router-link>
    </header-fix>
    <div class="wrapper">
      <div class="person-info">
        <div class="top">
          <div class="headImg">
            <img :src="userInfo.Img" alt="" v-if="userInfo.Img">
            <img src="../assets/headImg-per.png" alt="" v-else>
          </div>
          <div class="edit">
            <router-link to='/'>
              <p class="p1">{{userInfo.Username}}</p>
              <p class="p2">编辑资料<img src="../assets/edit-icon.png" alt=""></p>
            </router-link>
          </div>
        </div>
        <div class="text">
          <ul>
            <li>
              <p class="num">{{userInfo.TotalCredit}}</p>
              <p class="word">总学分</p>
            </li>
            <li>
              <p class="num">41</p>
              <p class="word">积分数</p>
            </li>
            <li>
              <p class="num">{{userInfo.Learncount || '0'}}</p>
              <p class="word">学习次数</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="person-link">
        <div class="pl-top">
          <mt-cell title="我的学分" is-link>
           <img slot="icon" src="../assets/coin-grey.png" alt="">
           <span>{{userInfo.TotalCredit}}</span>
          </mt-cell>
          <mt-cell title="我的课程" is-link>
           <img slot="icon" src="../assets/book-grey.png" alt="">
          </mt-cell>
          <mt-cell title="我的考试" is-link>
           <img slot="icon" src="../assets/exam-grey.png" alt="">
          </mt-cell>
          <mt-cell title="我的下载" is-link>
           <img slot="icon" src="../assets/downLoad-grey.png" alt="">
          </mt-cell>
        </div>
        <div class="pl-bottom">
          <mt-cell title="信息反馈" is-link>
           <img slot="icon" src="../assets/feedBack-grey.png" alt="">
           <span>提供您的宝贵意见</span>
          </mt-cell>
          <mt-cell title="软件升级" is-link>
           <img slot="icon" src="../assets/upData-grey.png" alt="">
          </mt-cell>
          <mt-cell title="设置中心" is-link>
           <img slot="icon" src="../assets/setting-grey.png" alt="">
          </mt-cell>
        </div>
      </div>
    </div>
    <footer-fix selected="personalCenter"></footer-fix>
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
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .personalCenter {
    // background: url("../assets/hq-personal-bg.png") no-repeat center top;
    .header {
      width: 100%;
      background-color: #3e6ed7; 
      height: toRem(200px);
      .webapp-left {
        font-size: 22px;
        color: #fff;
      }
      .header_left{
        display: none;
        a{
          img{
            width: toRem(38px);
            height: toRem(34px);
          }
        }
      }
      .header_right{
        display: none;
        a{
          img{
            width: toRem(38px);
            height: toRem(34px);
          }
        }
      }
      .header_title {
        color: #fff;
        display: none;
      }
    }
    .wrapper{
      background: #fff;
      .person-info{
        position: relative;
        width: toRem(690px);
        margin-left: toRem(30px);
        .top{
          width: toRem(690px);
          height: toRem(280px);
          background: #fff;
          top: toRem(-90px);
          box-shadow: 0 0 toRem(20px) #e8e8e8;
          border-radius: toRem(15px);
          position: absolute;
          @extend %clearFix;
          .headImg{
            float:left;
            margin-left: toRem(30px);
            margin-top: toRem(-20px);
            img{
              width: toRem(124px);
              height: toRem(124px);
            }
          }
          .edit{
            float: left;
            margin-left: toRem(30px);
            padding-top: toRem(20px);
            a{
              .p1{
                font-size: 16px;
                color: #333;
                font-weight: bold
              }
              .p2{
                color: #999;
                img{
                  width: toRem(22px);
                  height: toRem(22px);
                  margin-left: toRem(10px)
                }
              }
            }
          }
        }
        .text{
          position: absolute;
          width: toRem(630px);
          height: toRem(100px);
          left: toRem(30px);
          top: toRem(50px);
          ul{
            display: flex;
            justify-content: space-around;
          }
          li{
            text-align: center;
            .num{
              font-size: 20px;
              color: #333;
              font-weight: bold;
            }
            .word{
              margin-top: toRem(20px);
              color: #999;
            }
          }
          
        }
      }
      .person-link{
        padding-top: toRem(220px); 
        .pl-top{
          padding: 0 toRem(30px);
          .mint-cell{
            height: toRem(98px);
            line-height: toRem(98px);
            .mint-cell-wrapper{
              padding: 0 0;
              .mint-cell-title{
                span{
                  font-size: 14px;
                }
                img{
                  margin-right: toRem(30px); 
                }
              }
              .mint-cell-value{
                color: #dcdcdc;
                margin-right: toRem(40px);
              }
              .mint-cell-allow-right::after{
                color: #dcdcdc;
                right: toRem(7px);
              }
            }
          }
        }
        .pl-bottom{
          padding: 0 toRem(30px);
          border-top: toRem(20px) solid #f5f9ff;
          .mint-cell{
            height: toRem(98px);
            line-height: toRem(98px);
            .mint-cell-wrapper{
              padding: 0 0;
              .mint-cell-title{
                span{
                  font-size: 14px;
                }
                img{
                  margin-right: toRem(30px); 
                }
              }
              .mint-cell-value{
                color: #dcdcdc;
                margin-right: toRem(40px);
              }
              .mint-cell-allow-right::after{
                color: #dcdcdc;
                right: toRem(7px);
              }
            }
          }
        }
      }
    }
  }
</style>
