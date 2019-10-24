<template>
  <div class="home_index container_both">
   <div class="header-top">
     <div class="info">
       <div class="no-login">
         <img src="../assets/headImg-default.png" alt="" class="headImg">
         <div class="text">
           <p>未登陆</p>
           <router-link to="/login">立即登录</router-link>
         </div>
       </div>
       <div class="logined">

       </div>
     </div>
     <div class="handle">
        <p class="search-btn"><img src="../assets/search-img1.png" alt=""></p>
        <p class="history-btn"><img src="../assets/history.png" alt=""></p>
     </div>
   </div>
    <div class="container">
      <!-- <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in swipeData" :key="item.Id">
          <router-link :to="'/newsDetails?id='+item.Url">
            <error-img :src="item.Icon"></error-img>
          </router-link>
        </mt-swipe-item>
      </mt-swipe> -->
      <section class="banner">
        <!-- <div>

        </div> -->
      </section>
      <section class="party_news">
        <div class="party_news_title">
          <router-link :to="{name: 'newsCenter', query: {code: 'dqsd', title:'公告'}}">
            <img src="../assets/ggtext.png" alt="公告">
          </router-link>
        </div>
        <div class="party_news_con">
          <ul class="marquee_list" :class="{marquee_top:animate}">
            <li v-for="item in NoticeData" :key="item.Id" @click="goArticleDetail(item.Id)">
              <a>{{item.Name}}</a>
            </li>
          </ul>
        </div>
        <div class="notice-more">
          <router-link to="/newsCenter">更多</router-link>
        </div>
      </section>
      <section class="resource-link">
        <div class="rl-top">
          <div class="title">
            <img src="../assets/resource-img.png" alt="资源">
          </div>
          <div class="con">
            <ul>
              <li>
                <router-link to="/"><img src="../assets/book-icon.png" alt="图书">图书</router-link>
              </li>
              <li>
                <router-link to="/"><img src="../assets/showRoom-icon.png" alt="展馆">展馆</router-link>
              </li>
              <li>
                <router-link to="/"><img src="../assets/exam-icon.png" alt="考试">考试</router-link>
              </li>
              <li>
                <router-link to="/"><img src="../assets/train-icon.png" alt="培训">培训</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="rl-bd">
          <div class="title">
            <img src="../assets/other-img.png" alt="其他">
          </div>
          <div class="con">
            <ul>
              <li>
                <router-link to="/mallCenter"><img src="../assets/mall-icon.png" alt="商城">商城</router-link>
              </li>
              <li>
                <router-link to="/"><img src="../assets/more-icon1.png" alt="全部">全部</router-link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="recommend_course">
        <div class="recommend_title">
          <div class="recommend_title_left">
            <span class="primary_line"></span>最新课程
          </div>
          <div class="recommend_title_right">
            <router-link to="/courseCenter">
              <p>更多+</p>
            </router-link>
          </div>
        </div>
        <div class="recommend_course_list">
          <ul>
            <li v-for="item in recommendCourseData" :key="item.Id">
              <div class="recommend_course_item" @click="toPlay(item.CourseType,item.CourseId)">
                <a>
                  <error-img :src="item.CourseImg" :error-src="noCourse"></error-img>
                  <p class="course_title">{{item.CourseName}}</p>
                </a>
                <p class="clearFix">
                  <span class="teacher pull-left">讲师：{{item.TeacherName}}</span>
                  <!-- <span class="highlight pull-right">{{item.Credit}}学分</span> -->
                </p>
              </div>
            </li>
          </ul>
          <div class="no-data" v-if="recommendCourseData.length == 0">暂无数据</div>
        </div>
      </section>
      <section class="party_acti">
        <div class="party_acti_title">
          <div class="party_acti_title_left">
            <span class="primary_line"></span>党员活动
          </div>
          <div class="party_acti_title_right">
            <router-link to="/newsCenter?title=党员活动&code=党员活动">
              <p>更多+</p>
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <footer-fix selected="home"></footer-fix>
  </div>
</template>
<script>
  import { MessageBox, Popup, Swipe, SwipeItem } from 'mint-ui'
  // Toast
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import noNews from '../assets/latestNews.png'
  import noCourse from '../assets/noCourse.png'
  import { getQueryString, getStore, setStore } from '../plugins/utils'
  import allApi from '../service/getData'
  import { toPlay } from '../service/mixins'

  const {
    GetCourseDetail,
    // GetLink,
    // GetMessageUnreadCount,
    GetCourseInfoList,
    // GetNoticeInfoList,
    NoticeList,
    // CheckPartyDate,
    GetActicleInfoCount,
    Login
  } = allApi
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Popup.name, Popup)
  export default {
    name: 'home',
    mixins: [toPlay],
    data () {
      return {
        showModel: false,
        swipeData: [],
        recommendCourseData: [],
        noNews,
        NoticeData: [],
        noCourse,
        code: '',
        keyword: '',
        animate: false
      }
    },
    created () {
      let code = getQueryString().code
      if (this.userAgent.weixin && this.isAllowWeiXin && !code) {
        window.location.href = this.wxIndexUrl
      }
      if (code) {
        this.code = code.split('#/')[0]
        this.login()
      }
      this.getUserAgent()
    },
    mounted () {
      this.getRecommendCourse()
      // this.getSwipeData()
      this.getPartyExpress()
      this.getCount()
      setInterval(this.showMarquee, 5000)
    },
    computed: {
      ...mapState(['userAgent', 'wxLoginUrl', 'wxIndexUrl', 'defaultIcons', 'userInfo'])
    },
    methods: {
      ...mapActions(['getUserAgent', 'getUserInformation']),
      async login () {
        let res = await Login({ Code: this.code })
        if (res.IsSuccess) {
          this.getUserInformation()
        }
      },
      // 推荐课程
      async getRecommendCourse () {
        let data = await GetCourseInfoList({ Page: 1, Rows: 4, Sort: 'CreateDate' })
        if (data.Type == 1) {
          this.recommendCourseData = data.Data.List
        }
      },

      // 轮播
      // async getSwipeData () {
      //   let data = await GetLink({ LinkType: 'IndexBannerList' })
      //   if (data.IsSuccess) {
      //     this.swipeData = data.Data
      //   }
      // },
      async getCourseDetail (Id) {
        let data = await GetCourseDetail({ Id })
        if (data.Type == 1) {
          this.toPlay(data.Data.CourseType, Id)
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }
      },
      toggleModel () {
        this.showModel = !this.showModel
      },
      goArticleDetail (id) {
        this.$router.push({ path: '/newsDetails', query: { id } })
      },
      search () {
        this.$router.push({ path: '/newsSearch' })
      },
      showMarquee: function () {
        this.animate = true
        setTimeout(() => {
          this.NoticeData.push(this.NoticeData[0])
          this.NoticeData.shift()
          this.animate = false
        }, 500)
      },
      judgeUrl (type, id) {
        let path = ''
        switch (type) {
          case 'CourseList':
            path = `/courseCenter`
            break
          case 'Article':
            path = `/newsDetails`
            break
          case 'Course':
            this.getCourseDetail(id)
            break
          case 'ArticleList':
            path = `/newsCenter`
            break
        }
        this.$router.push({ path, query: { id } })
      },
      // 编辑/完成 切换
      toggleEditIcons () {
        this.isEditIcons = !this.isEditIcons
        this.isFixedBlock = !this.isFixedBlock
        if (!this.isEditIcons) {
          this.setMargin(false)
          let store = getStore('selectedIcons') || {}
          store[this.userInfo.UserAccount] = this.selectedIcons
          setStore('selectedIcons', store)
        } else {
          this.setMargin(true)
        }
      },
      // 公告
      async getPartyExpress (CategoryCode) {
        let data = await NoticeList({
          Page: 1,
          Rows: 8,
          Sort: 'Id',
          Order: 'desc'
        })
        if (data.Type == 1) {
          this.NoticeData = data.Data.ListData
        }
      },
      setMargin (isFixed) {
        // 通过isFixed判断当前是否是fixed状态
        const fixedBlock = this.$refs.fixedBlock
        const marBlock = this.$refs.marBlock[0]
        let fixedHeight = 0
        if (isFixed) {
          fixedHeight = fixedBlock.clientHeight
        }
        marBlock.style.marginTop = fixedHeight + 'px'
      },
      setRemind (key) {
        this[key].flag = !this[key].flag
        this[key].date = String(+new Date())
        setStore(key, this[key])
      },
      getDetail (route) {
        this.$router.push(route)
      },
      async getCount () {
        let res = await GetActicleInfoCount({ CategoryCode: '党建要闻' })
        this.djCount = res.Value || 0
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .home_index {
    &.container_both{
      padding-top: 0px;
    }
    .header-top{
      background: #fff;
      padding: toRem(9px) toRem(30px);
      @extend %clearFix;
      .info{
        float: left;
        .no-login{
          .headImg{
            float: left;
            width: toRem(71px);
            height: toRem(71px);
          }
          .text{
            float: left;
            @extend %clearFix;
            margin-top: toRem(20px);
            p{
              float: left;
              color: #333;
              margin-left: toRem(20px);
              border-right: 1px solid #333;
              height: toRem(30px);
              line-height: toRem(30px);
              padding-right: 10px;
              font-size: 14px
            }
            a{
              float: left;
              color: #4374df;
              font-size: 14px;
              height: toRem(30px);
              line-height: toRem(30px);
              margin-left: toRem(10px)
            }
          }
        }
        .logined{

        }
      }
      .handle{
        float: right;
        @extend %clearFix;
        margin-top: toRem(20px);
        .search-btn{
          float:left;
          img{
            width: toRem(40px);
            height: toRem(40px);
          }
        }
        .history-btn{
          float:left;
          margin-left: toRem(30px);
          img{
            width: toRem(40px);
            height: toRem(40px);
          }
        }
      }
    }
    .info_content {
      background: url(../assets/info_bg.png) no-repeat center bottom;
      background-size: toRem(571px) toRem(345px);
      height: toRem(533px);

      .info_layer_avatar {
        text-align: center;
        line-height: toRem(60px);
        font-size: 12px;
      }

      .avatar {
        margin-top: toRem(18px);
        @include square(117px);
      }

      .info_detail {
        text-align: center;
        padding: toRem(100px) toRem(10px) 0 toRem(10px);

        h4 {
          font-size: 14px;
        }

        p {
          margin-top: toRem(40px);
          color: $color-text-secondary;
          font-size: 13px;
        }
      }
    }

    .mint-swipe {
      height: toRem(340px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .guide_list {
      width: 100%;
      min-height: toRem(140px);
      max-height: toRem(280px);
      background-color: $fill-base;

      .guide_container {
        @extend %clearFix;
        width: 100%;
        text-align: center;
        @include flex(flex-start);
        flex-wrap: wrap;
      }

      .guide_item {
        width: 20%;
        height: toRem(140px);
        @include flex(center);
        align-items: center;

        p {
          margin-top: toRem(20px);
          line-height: 1;
        }

        img {
          width: toRem(50px);
          height: toRem(50px);
        }
      }
    }
    .banner{
      width: 100%;
      background: url("../assets/planet-rail.png") no-repeat;
      background-size: 100% toRem(481px);
    }
    .party_news {
      display: flex;
      height: toRem(110px);
      border-top: 1px solid #fff;
      padding: 0 toRem(28px);
      background: #fff;
      margin-top: toRem(20px);
      .party_news_title {
        width: toRem(63px);
        margin-top: toRem(40px);
        height: toRem(30px);
        img {
          display: block;
          margin: 0 auto;
          width: toRem(63px);
          height: toRem(30px);
        }
      }

      .party_news_con {
        position: relative;
        display: block;
        overflow: hidden;
        width: toRem(625px);
        margin-top: toRem(42px);
        height: toRem(30px);
        ul {
          li {
            margin-left: toRem(25px);
            height: toRem(30px);
            line-height: toRem(30px);
            width: toRem(500px);
            @extend %ellipsis;
            a {
              width: 100%;
              @extend %ellipsis;
              color: #333;
              font-size: 14px;
              display: block;
            }
          }
        }
        .marquee_list {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          ul{
            li{
              height: toRem(30px);
            }
          }
        }
        .marquee_top {
          transition: all 0.5s;
          margin-top: toRem(-34px);
        }
      }
      .notice-more{
        border-left: 1px solid #a9bcc7;
        margin-left: toRem(30px);
        height: toRem(30px);
        line-height: toRem(30px);
        margin-top: toRem(40px);
        padding-left: toRem(15px);
        a{
           width: toRem(60px);
           display: block;
           font-size: 14px;
           color: #a9bcc7;
        }
      }
    }

    .recommend_course {
      margin-top: toRem(20px);
      background-color: #fff;

      .recommend_title {
        font-size: 14px;
        line-height: toRem(62px);
        @extend %clearFix;
        border-bottom: 1px solid #ddd;

        .recommend_title_left {
          @extend %pull-left
        }

        .recommend_title_right {
          @extend %pull-right;
          margin-right: toRem(30px);
        }

        .primary_line {
          position: relative;
          top: 2px;
        }
      }

      .recommend_course_list {
        padding: toRem(0px) toRem(25px) toRem(0px) toRem(25px);

        ul {
          @extend %clearFix;
        }

        li {
          @extend %pull-left;
          width: 50%;
          text-align: center;
          margin-top: toRem(30px);

          .recommend_course_item {
            padding-right: toRem(25px);
          }

          img {
            width: toRem(334px);
            height: toRem(178px);
          }

          .course_title {
            width: 100%;
            @extend %ellipsis;
            text-align: left;
            line-height: toRem(40px);
            font-size: 13px;
          }

          .clearFix {
            line-height: toRem(40px);
          }

          .teacher {
            color: $color-text-thirdly;
          }
        }
      }
    }

    .dangjian_news {
      margin: toRem(20px) 0;
      padding: 0 toRem(30px);
      background-color: #fff;
      width: 100%;
      height: toRem(80px);
      line-height: toRem(80px);
      font-size: toRem(30px);

      .highlight {
        color: $brand-primary;
        font-size: toRem(44px);
        font-style: italic;
      }

      .news_more {
        float: right;
        color: $brand-primary;
      }
    }

    .party_acti {
      margin: toRem(20px) 0;
      background-color: #fff;

      .party_acti_title {
        font-size: 14px;
        line-height: toRem(62px);
        @extend %clearFix;
        border-bottom: 1px solid #ddd;

        .party_acti_title_left {
          @extend %pull-left;
        }

        .party_acti_title_right {
          @extend %pull-right;
          margin-right: toRem(30px);
        }

        .primary_line {
          position: relative;
          top: 2px;
        }
      }

      .party_acti_list {
        padding: toRem(0px) toRem(25px) toRem(0px) toRem(25px);

        ul {
          @extend %clearFix;
        }

        li {
          width: 100%;
          @extend %clearFix;
          padding: toRem(20px) toRem(0px);
          border-bottom: 1px solid #ddd;

          .party_acti_course_item {
            padding-right: toRem(25px);
          }

          a {
            display: block;
            @extend %pull-left;

            img {
              width: toRem(240px);
              height: toRem(197px);
            }
          }

          .party_acti_list_tt {
            @extend %pull-left;
            margin-left: toRem(15px);
            width: toRem(430px);
            height: toRem(197px);
            position: relative;

            .party_acti_list_title {
              width: 100%;
              @include ellipsis_two(2);
              text-align: left;
              line-height: toRem(40px);
              font-size: toRem(28px);
            }

            .party_acti_list_views {
              margin-top: toRem(20px);
              font-size: toRem(24px);
              color: #989898;
            }

            .party_acti_list_time {
              position: absolute;
              bottom: 0;
              border: 1px solid #d5d5d5;
              color: #989898;
              font-size: toRem(20px);
              padding: toRem(0px) toRem(5px);
            }
          }
        }
      }
    }

    .icon_list_popup {
      width: 100vw;
      height: 100vh;
      overflow-y: scroll;

      &.fixed_top {
        padding-top: toRem(92px);

        .header {
          padding: 0 toRem(20px);

          .header_left, .header_right {
            flex: 1;
          }
        }
      }

      .icon_list_container {
        height: 100%;
        overflow-y: scroll;

        .icons_block {
          padding: toRem(30px);

          & + .icons_block {
            border-top: toRem(20px) solid $border-color-base;
          }

          &.fixed_block {
            position: fixed;
            top: toRem(92px);
            left: 0;
            right: 0;
            background-color: #fff;
            z-index: 1005;
            border-bottom: 1px solid $border-color-base;
          }

          &.margin_block {

          }

          .icon_list_title {
            font-size: toRem(32px);
            font-weight: bold;

            .icon_action {
              float: right;
              color: #fd961f;
              font-size: toRem(30px);
            }
          }

          .icon_list {
            @include flex(flex-start);
            align-items: center;
            flex-wrap: wrap;

            .icon_item {
              position: relative;
              margin-top: toRem(50px);
              width: 25%;
              text-align: center;

              .icon_img {
                @include square(50px);
              }

              p {
                margin-top: toRem(40px);
                line-height: 1;
              }

              .btn {
                display: none;
                position: absolute;
                top: toRem(-14px);
                right: 0;
                @include square(28px);
              }
            }
          }
        }

        &.is-edit {
          .icon_list {
            .icon_item {
              .btn {
                display: block;
              }
            }
          }
        }

      }

    }

    .commemorate_popup {
      background-color: transparent;
      text-align: center;
      max-height: 100vh;
      overflow-y: scroll;

      .close_btn {
        position: absolute;
        top: 0;
        right: 0;

        img {
          @include square(90px);
        }
      }

      .commemorate_container {
        @include wh(615px, 677px);
        line-height: 1.5;
        text-align: left;

        &.party_people_container {
          background: url("../assets/party-people-bg@2x.png") no-repeat top center;
          background-size: toRem(615px) toRem(677px);
          padding: toRem(200px) toRem(135px);
          font-size: toRem(32px);
        }

        &.join_party_container {
          background: url("../assets/join-party-bg@2x.png") no-repeat top center;
          background-size: toRem(615px) toRem(677px);
          padding: toRem(190px) toRem(135px);
          font-size: toRem(30px);
        }

        .highlight {
          font-size: toRem(35px);
        }
      }

      .commemorate_btn {
        @include wh(240px, 72px);
      }

      .no_remind_block {
        color: #fff;
        @include flex(center);
        align-items: center;

        img {
          @include square(34px);
          margin-right: toRem(10px);
        }
      }
    }
  }
</style>
