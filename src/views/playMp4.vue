/**
* Mp4播放页
*/
<template>
  <div class="play_Mp4 container_top">
    <!--头部-->
    <header-fix :title="courseDetails.CourseName" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="player">
      <!--
        webkit-playsinline="true" | playsinline: 禁止 iPhone Safari 视频自动全屏
        x-webkit-airplay="true":支持Airplay的设备（如：音箱、Apple TV)播放
      -->
      <video id="myVideo" ref="video" preload="meta" :src="courseDetails.OnlineUrl" controls
             style="object-fit:fill"
             playsinline="true"
             webkit-playsinline="true"
             x5-playsinline="true"
             x-webkit-airplay="true"
             x5-video-orientation="portraint">
      </video>
    </div>
    <div class="course_detail">
      <!-- tab-container -->
      <course-introduce :course-details="courseDetails"></course-introduce>
      <div class="contentList">
        <div class="title">
          相关课程
        </div>
        <!-- <div class="list">
          <ul>
            <li>
              <p class="label">[第一集] 习近平日内瓦演讲的意义</p>
              <img src="../assets/play-blue.png" alt="">
            </li>
            <li>
              <p class="label">[第一集] 习近平日内瓦演讲的意义</p>
              <img src="../assets/play-blue.png" alt="">
            </li>
            <li>
              <p class="label">[第一集] 习近平日内瓦演讲的意义</p>
              <img src="../assets/play-blue.png" alt="">
            </li>
          </ul>
        </div> -->
        <section  v-infinite-scroll="getRelatedCourse"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="10">
            <course-cate-list :course-data="courseData" :no-data-bg="noDataBg" :no-data="noData"></course-cate-list>
        </section>
      </div>
      <div class="course-brief">
        <div class="title">
          课程简介
        </div>
        <div class="content">
          的十二大以来经过精炼概括后明确写人党章1982年9月，
          党的十二大通过新的《中国共产党章程》，正式载入入党誓词。
          党的十三大至十九大通过的党章都沿用、重申了这一内容。
          我志愿加人中国共产党。
        </div>
      </div>
      <div class="course-ac" @click="showCommentBox"> 
         <!-- commentBox -->
        <p class="text"><img src="../assets/message-circle.png" alt=""> <span>评论</span></p>  
        <p class="num">{{commentCount}}</p>
      </div>
    </div>
    <div class="comment-wrapper">
      <mt-popup
        position="bottom"
        v-model="commentBox"
        >
        <!-- <section v-infinite-scroll="getCommentList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10"> -->
               <comment-box :close-box="closeBox" @counts="getCount" :course-id="courseId"></comment-box>
               <!--  -->
          <!-- :comment-list="commentList" -->
        <!-- </section> -->
      </mt-popup>
    </div>
    <!-- <mt-popup
        position="right"
        v-model="commentListBox"
        class="clb-popup"
      >
       <comment-list-box :back-comment="backComment"></comment-list-box>
    </mt-popup> -->
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import wx from 'weixin-js-sdk'
  import { Toast, Navbar, TabItem, Indicator, TabContainer, TabContainerItem, Popup } from 'mint-ui'
  // Indicator,
  import { goBack } from '../service/mixins'
  import {
    GetCourseDetail,
    UploadTimeNode,
    GetWechatWxAuthModel,
    RelatedCourse
    // GetCourseCommentList
  } from '../service/getData'
  import { timeFormat, isIPhone } from '../plugins/utils'

  Vue.component(Navbar.name, Navbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  Vue.component(Popup.name, Popup)
  export default {
    mixins: [goBack],
    data () {
      return {
        isIOS: false,
        isOpen: true,
        selected: 'introduce',
        courseId: '', // 课程id
        courseDetails: { // 课程详情信息
          CourseName: '视频播放',
          OnlineUrl: '',
          CommentCredit: ''
        },
        readyState: 0, // 视频是否准备就绪
        duration: 0, // 视频时长
        browseScore: 0, // 百分比进度
        myVideo: null, // video对象
        lastLocation: 0, // 记录上次播放的位置
        progressTime: 0, // 记录视频完成进度位置
        updateTimer: 0, // 提交进度定时器
        // 相关课程
        courseData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
        url: window.location.href,
        // 笔记
        notesData: [],
        showAddNotes: false, // 是否显示添加笔记
        addNotesData: {
          title: '',
          content: ''
        },
        hasChangeLocation: false,
        commentBox: null, // 评论框显示与否
        commentList: [],
        commentCount: null
      }
    },
    created () {
      this.courseId = this.$route.query.id
      this.isIOS = isIPhone()
    },
    mounted () {
      /* 初始化 打开APP */
      // eslint-disable-next-line
      // new Mlink({
      //   mlink: 'https://afaki8.mlinks.cc/A0BP?Title=&Content=&Id=' + this.courseId + '&Type=Course&Token=' +
      //     localStorage.getItem('ASPXAUTH'),
      //   button: document.querySelector('a#btnOpenApp')
      // })
      /* 获取video对象 */
      this.myVideo = document.getElementById('myVideo')
      if (this.userAgent.weixin && this.isAllowWeiXin) {
        this.getWxAuthModel()
        this.netWorkType()
      }
      /* 获取课程详情 */
      this.getCourseDetail(this.playFunc)
       /* 相关课程 */
      this.getRelatedCourse()
    },
    computed: {
      ...mapState(['userAgent'])
    },
    methods: {
      /* 微信签名 */
      async getWxAuthModel () {
        let res = await GetWechatWxAuthModel({ Url: this.url })
        if (res.Type == 1) {
          wx.config({
            debug: false,
            appId: 'wxf24d72db02fede73', // 必填，公众号的唯一标识
            timestamp: res.Data.Timestamp, // 必填，生成签名的时间戳
            nonceStr: res.Data.Nonce, // 必填，生成签名的随机串
            signature: res.Data.Signature, // 必填，签名
            jsApiList: ['checkJsApi', 'getNetworkType']// 必填，需要使用的JS接口列表
          })
        }
      },
      /* 获取网络环境 */
      netWorkType () {
        wx.ready(function () {
          wx.getNetworkType({
            success: function (res) {
              let networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
              if (networkType !== 'wifi') {
                Toast({ message: '您正在使用2G/3G/4G网络，建议在WIFI环境观看', position: 'middle' })
              }
            }
          })
        })
      },
      // 课程详情
      async getCourseDetail (cb) {
        let data = await GetCourseDetail({ Id: this.courseId })
        if (data.Type == 1) {
          this.courseDetails = data.Data
          this.lastLocation = data.Data.LastLocation
          this.browseScore = data.Data.BrowseScore
          if (typeof cb === 'function') {
            cb()
          }
        }
      },
      // 提交进度
      async updateProgress () {
        let TimeNode = timeFormat(this.myVideo.currentTime)
        let data = await UploadTimeNode({ CourseId: this.courseId, TimeNode })
        if (data.Type == 1) {
          // 提交成功
          this.getCourseDetail()
        } else if (data.Type != 401) {
          Toast({ message: data.Message, position: 'bottom' })
        }
      },
      /* 播放方法 */
      playFunc () {
        this.myVideo.load()
        let timer = setInterval(() => {
          let readyState = this.myVideo.readyState
          this.readyState = readyState
          if (readyState == 4) {
            /* 准备好可以播放时清除定时器 */
            clearInterval(timer)
            this.duration = (this.myVideo.duration).toFixed(2) // 当前时间
            this.progressTime = this.myVideo.duration * (parseFloat(this.browseScore) / 100)
            this.myVideo.currentTime = this.lastLocation
            /* 监听视频播放位置 */
            this.myVideo.addEventListener('timeupdate', () => {
              if (this.myVideo.currentTime != Math.round(this.lastLocation) && !this.hasChangeLocation) {
                this.progressTime = this.myVideo.duration * (parseFloat(this.browseScore) / 100)
                this.myVideo.currentTime = this.lastLocation
              } else {
                this.hasChangeLocation = true
                let currentTime = this.myVideo.currentTime
                if (currentTime > 0) {
                  /* 该视频未播放完成 */
                  if (parseFloat(this.browseScore) < 100) {
                    if (currentTime > this.progressTime - 2 && currentTime < this.progressTime + 1) {
                      // 视频播放位置接近时候，视频完成进度位置前进
                      this.progressTime = currentTime
                    } else if (currentTime > this.progressTime + 2) {
                      // 视频未播放区域 禁止拖拽
                      this.myVideo.currentTime = this.progressTime
                      Toast({ message: '未播放区域禁止拖拽', position: 'bottom' })
                    }
                  } else {
                    /* 该视频播放完成 */
                  }
                }
              }
            })
            /* 监听视频播放结束 */
            this.myVideo.addEventListener('ended', () => {
              /* 判断是否是拖拽到结束 */
              if (this.progressTime > this.duration - 2) {
                this.updateProgress()
                clearInterval(this.updateTimer)
              } else {
                this.myVideo.play()
              }
            })
            this.updateTimer = setInterval(() => {
              this.updateProgress()
            }, 60000)
          }
        }, 100)
      },
      showCommentBox () {
        let body = document.querySelector('body')
        this.commentBox = true
        body.style.overflow = 'hidden'
        body.style.height = '100vh'
      },
      closeBox () {
        let body = document.querySelector('body')
        this.commentBox = false
        body.style.overflow = 'auto'
        body.style.height = 'auto'
      },
      getCount (data) {
        this.commentCount = data
      },
      // 相关课程
      async getRelatedCourse () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await RelatedCourse({ CourseId: this.courseId, Page: this.page })
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data.ListData
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          list.forEach((item) => {
            item.isSelected = false
            if (item.Id == this.courseId) {
              item.isSelected = true
            }
          })
          this.courseData = this.courseData.concat(list)
          console.log(this.courseData)
          this.loading = false
          this.page += 1
        }
      }
    },
    beforeDestroy () {
      this.updateProgress()
      clearInterval(this.updateTimer)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .play_Mp4 {
    background: #fff;
    .open_app {
      position: fixed;
      left: 0;
      bottom: 0;
      text-indent: 1rem;
      font-size: 14px;
      @include ht-lineHt(105px);
      background: rgba(0, 0, 0, 0.8);
      width: 100%;
      color: $color-text-reverse;

      .openApp {
        color: #fff;
        padding: toRem(15px) toRem(30px);
        background: $brand-primary;
        margin-left: 1rem;
        border-radius: toRem(12px);
      }

      .close_tip {
        font-size: 20px;
        position: absolute;
        right: toRem(10px);
        bottom: 0;
        top: toRem(10px);
        height: toRem(40px);
        line-height: toRem(40px);

        .webapp-close {
          color: #fff;
        }

      }
    }

    .player {
      padding-top: 0.2rem;
      width: 10rem;
      height: 5.8rem;
      margin: 0 auto;
      position: relative;
      background: #000;

      video {
        height: 100%;
        width: 100%;
        margin: 0 auto;
      }
    }

    .add_notes_btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;

      .mint-button--large {
        border-radius: 0;
      }
    }

    .notes_container {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #fff;
    }

    .course_notes {
      padding-bottom: toRem(100px);
    }
    .contentList{
      margin-top: toRem(50px);
      padding: 0 0.4rem;
      .title{
        color: #333;
        font-size: 15px;
      }
    }
    .course-brief{
      margin-top: toRem(50px);
      padding: 0 toRem(30px);
      border-bottom: toRem(5px) solid #e8e8e8;
      .title{
        font-size: 15px;
        color: #333;
        font-weight: bold;
      }
      .content{
        margin-top: toRem(20px);
        padding-bottom: toRem(80px);
        text-indent: toRem(24px);
        font-size: 13px;
        color: #333;
        line-height: toRem(48px);
      }
    }
    .course-ac{
      display: table;
      margin: 0 auto;
      padding: toRem(25px) 0;
      p{
        display: table-cell;
        font-size: 16px;
        color: #333;
        img{
          width: toRem(44px);
          height: toRem(42px);
          margin-right: toRem(10px);
        }
        span{
          margin-right: toRem(10px);
        }
        &.num{
          background: #d1022a;
          color: #fff;
          font-size: 12px;
          border-radius: toRem(25px);
          padding: toRem(8px) toRem(12px);
        }
      }
    }
    .comment-wrapper{
      .mint-popup{
        top: 5rem;
        width: 100%;
        .commentBox{
          .cb-con{
            height: toRem(750px);
          }
        }
      }
    }
    .clb-popup{
      width: 100%;
      height: 100vh;
    }
  }
</style>
