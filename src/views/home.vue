<template>
  <div class="home_index container_both">
   <div class="header-top">
     <div class="info">
       <div class="no-login" v-if="userInfo == {} || !userInfo">
         <img src="../assets/headImg-default.png" alt="" class="headImg">
         <div class="text">
           <p>未登陆</p>
           <router-link to="/login">立即登录</router-link>
         </div>
       </div>
       <div class="logined" v-else>
          <img :src="userInfo.Img" alt="" v-if="userInfo.Img" class="headImg">
          <img src="../assets/headImg-default.png" alt="" class="headImg" v-else>
         <div class="text">
           <div class="hd">
             {{userInfo.Username}},欢迎登录!
           </div>
           <div class="bd">
             <p><img src="../assets/coin-img.png" alt="">{{userInfo.TotalCredit}}分</p>
             <p><img src="../assets/medal.png" alt="">NO.{{userInfo.ScoreRank || '0'}}</p>
           </div>
         </div>
       </div>
     </div>
     <div class="handle">
       <router-link class="search-btn" to="/courseSearch"><img src="../assets/search-img1.png" alt=""></router-link>
       <router-link class="history-btn" to="/trainingcourse"><img src="../assets/history.png" alt=""></router-link>
     </div> 
     <!-- /history -->
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
        <div class="score-list">
          <p class="slp">学习次数：<span>{{userInfo.Learncount || '0'}}</span></p>
          <p class="slp">完成课程量：<span>{{userInfo.FinishCourseCount || '0'}}</span></p>
          <p class="slp actived">学分排名：<span>{{userInfo.ScoreRank || '0'}}</span></p>
          <p class="slp">文章获得学分：<span>{{userInfo.ArticleCredit || '0'}}</span>/分</p>
          <p class="slp">考试获得学分：<span>{{userInfo.ExamCredit || '0'}}</span>/分</p>
        </div>
        <div class="score-planet">
          <div class="sp-list1 spl" @click="checkPlanet(0)">
            <p class="sp1">
              <img src="../assets/planet-icon1.png" alt="">
            </p>
            <div class="num">
              01
            </div>
            <div class="arrow">
              <img src="../assets/arrow-up-black.png" alt="">
            </div>
          </div>
          <div class="sp-list2 spl" @click="checkPlanet(1)">
            <p class="sp2">
              <img src="../assets/planet-icon2.png" alt="">
            </p>
            <div class="num">
              02
            </div>
            <div class="arrow">
              <img src="../assets/arrow-up-black.png" alt="">
            </div>
          </div>
          <div class="sp-list3 spl actived" @click="checkPlanet(2)">
            <p class="sp3">
              <img src="../assets/planet-icon3.png" alt="">
            </p>
            <div class="num">
              03
            </div>
            <div class="arrow">
              <img src="../assets/arrow-up-black.png" alt="">
            </div>
          </div>
          <div class="sp-list4 spl" @click="checkPlanet(3)">
            <p class="sp4">
              <img src="../assets/planet-icon4.png" alt="">
            </p>
            <div class="num">
              04
            </div>
            <div class="arrow">
              <img src="../assets/arrow-up-black.png" alt="">
            </div>
          </div>
          <div class="sp-list5 spl" @click="checkPlanet(4)">
            <p class="sp5">
              <img src="../assets/planet-icon5.png" alt="">
            </p>
            <div class="num">
              05
            </div>
            <div class="arrow">
              <img src="../assets/arrow-up-black.png" alt="">
            </div>
          </div>
        </div>
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
      <section class="new_course">
        <div class="title">
          <div class="hd">
            新品课程
          </div>
          <div class="bd">
            <router-link to="/courseCenter">更多 <img src="../assets/nc-arrow-right.png" alt=""></router-link>
          </div>
        </div>
        <swiper :options="courseSwiperOption">
          <swiper-slide v-for="item in courseList" :key="item.Id">
            <router-link to="/">
              <img :src="item.Img" alt="">
              <p>{{item.Name}}</p>
            </router-link>
            <p class="clickCount">点击量: {{item.ClickCount}}</p>
            <p class="classify">{{item.ChannelName}}</p>
          </swiper-slide>
        </swiper>
      </section>
      <section class="new_showRoom">
        <div class="title">
          <div class="hd">
            最新展厅
          </div>
          <div class="bd">
            <div class="list">
              <p class="list-tab ns-tab on" @click="nsTab(0)">社区风采</p>
              <p class="list-tab ns-tab" @click="nsTab(1)">学员风采</p>
            </div>
            <router-link class="more" to="/">更多<img src="../assets/nc-arrow-right.png" alt=""></router-link>
          </div>
        </div>
        <swiper :options="srSwiperOption1" v-if="sqMall">
          <swiper-slide v-for="item in proList1" :key="item.Id">
            <router-link to="/">
              <div class="imgArea">
                <div class="imgB" v-if="item.EnclosureCount > 0">
                  <img :src="item.Image" alt="">
                </div>
                <div class="imgB1" v-if="item.EnclosureCount == 0">
                  <img :src="item.Image" alt="">
                </div>
                <div class="imgS" v-if="item.ProductionEnclosure.length">
                  <img :src="item.ProductionEnclosure[0].EnclosureUrl" alt="">
                  <img :src="item.ProductionEnclosure[1].EnclosureUrl" alt="">
                </div>
              </div>
              <div class="text">
                <div class="tt">
                  <div class="title2">
                    {{item.ProductionName || '暂无'}} 
                  </div>
                  <div class="time">
                    2019年10月12日
                  </div>
                </div>
                <div class="collect">
                  <img src="../assets/collect.png" alt="">
                  <p>210收藏</p>
                </div>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
        <swiper :options="srSwiperOption2" v-else>

        </swiper>
      </section>
      <section class="hot_book">
        <div class="title">
          <div class="hd">
            热门图书
          </div>
          <div class="bd">
            <div class="list">
              <p class="list-tab book-ttab on" @click="bookTab(0)">世界名著</p>
              <p class="list-tab book-ttab" @click="bookTab(1)">军事科学</p>
            </div>
            <router-link class="more" to="/">更多<img src="../assets/nc-arrow-right.png" alt=""></router-link>
          </div>
        </div>
        <swiper :options="bookSwiperOption1" v-if="famousBook">
          <swiper-slide v-for="item in bookList1" :key="item.Id">
            <router-link to="/">
              <img :src="item.Icon" alt="" class="cover">
              <p class="name">{{item.Name}}</p>
              <p class="author">{{item.Author || '暂无'}}  著</p>
            </router-link>
          </swiper-slide>
        </swiper>
        <swiper :options="bookSwiperOption2" v-if="militaryBook">
          <swiper-slide v-for="item in bookList2" :key="item.Id">
            <router-link to="/">
              <img :src="item.Icon" alt="" class="cover">
              <p class="name">{{item.Name}}</p>
              <p class="author">{{item.Author}}  著</p>
            </router-link>
          </swiper-slide>
        </swiper>
      </section>
      <section class="news">
        <div class="title">
          <div class="hd">
             新闻动态
          </div>
          <router-link to="/articletype">更多 <img src="../assets/nc-arrow-right.png" alt=""></router-link>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in articleList" :key="item.ArticleId">
              <router-link :to="{ path: '/articledetail', query: { Id: item.ArticleId, from: 'home' } }">
                <div class="text">
                  <div class="title">
                    <img src="../assets/news-first-icon.png" alt="" v-if="index == 0"> 
                    <img src="../assets/news-second-icon.png" alt="" v-if="index == 1">
                    {{item.ArticleTitle}}
                  </div>
                  <div class="info">
                    <p>{{item.ArticleCreateDate | dateFilter('yyyy-MM-dd')}}</p>
                    <p><img src="../assets/eye-img1.png" alt="">{{item.ClickCount}}</p>
                  </div>
                </div>
                <div class="pic">
                  <img :src="item.ArticleImg" alt="">
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <footer-fix selected="home"></footer-fix>
  </div>
</template>
<script>
  import { MessageBox, Popup } from 'mint-ui'
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
    NoticeList,
    BookList,
    Login,
    CourseList,
    ProductionInfoList,
    GetArticleInfoList
  } = allApi
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
        animate: false,
        bookList1: [],
        courseSwiperOption: {
          slidesPerView: 'auto',
          grabCursor: true,
          loop: true,
          freeMode: true,
          freeModeMomentum: false
        },
        srSwiperOption1: {
          slidesPerView: 'auto',
          grabCursor: true,
          loop: true,
          freeMode: true,
          freeModeMomentum: false
        },
        srSwiperOption2: {
          slidesPerView: 'auto',
          grabCursor: true,
          loop: true,
          freeMode: true,
          freeModeMomentum: false
        },
        bookSwiperOption1: {
          slidesPerView: 'auto',
          grabCursor: true,
          loop: true,
          freeMode: true,
          freeModeMomentum: false
        },
        bookSwiperOption2: {
          slidesPerView: 'auto',
          grabCursor: true,
          loop: true,
          freeMode: true,
          freeModeMomentum: false
        },
        famousBook: true,
        militaryBook: false,
        courseList: [],
        proList1: [],
        proList2: [],
        articleList: [],
        sqMall: true
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
      // this.getRecommendCourse()
      this.getPartyExpress()
      // this.getCount()
      this.getBookList1()
      this.getBookList2()
      this.getCourseList()
      this.getProductionInfoList1()
      this.getArticleInfoList()
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
      checkPlanet (i) {
        let sl1 = document.getElementsByClassName('slp')
        let sl2 = document.getElementsByClassName('spl')
        for (let j = 0; j < sl2.length; j++) {
          sl2[j].classList.remove('actived')
          sl1[j].classList.remove('actived')
          sl2[i].classList.add('actived')
          sl1[i].classList.add('actived')
        }
      },
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
      getDetail (route) {
        this.$router.push(route)
      },
      // 世界名著
      async getBookList1 () {
        let data = await BookList({ CategoryId: '1', Order: 'desc', Sort: 'Id', Page: '1', Rows: '8' })
        if (data.IsSuccess) {
          this.bookList1 = data.Data.ListData
        }
      },
      // 军事科学
      async getBookList2 () {
        let data = await BookList({ CategoryId: '4', Order: 'desc', Sort: 'Id', Page: '1', Rows: '8' })
        if (data.IsSuccess) {
          this.bookList2 = data.Data.ListData
        }
      },
      // 热门图书列表切换
      bookTab (num) {
        let tabName = document.getElementsByClassName('book-ttab')
        for (let i = 0; i < tabName.length; i++) {
          tabName[i].classList.remove('on')
          tabName[num].classList.add('on')
          if (num == 0) {
            this.famousBook = true
            this.militaryBook = false
          } else {
            this.famousBook = false
            this.militaryBook = true
          }
        }
      },
      nsTab (num) {
        let nsName = document.getElementsByClassName('ns-tab')
        for (let i = 0; i < nsName.length; i++) {
          nsName[i].classList.remove('on')
          nsName[num].classList.add('on')
          if (num == 0) {
            this.sqMall = true
          } else {
            this.sqMall = false
          }
        }
      },
      // 首页新品课程
      async getCourseList () {
        let data = await CourseList({ channelId: '347', Page: '1', Rows: '8', Order: 'desc', Sort: 'Id' })
        this.courseList = data.ListData
      },
      // 社区风采
      async getProductionInfoList1 () {
        let data = await ProductionInfoList({
          ProductionCategoryId: '11',
          Page: '1',
          Rows: '8',
          Order: 'desc', 
          Sort: 'Id'
        })
        if (data.IsSuccess) {
          this.proList1 = data.Data.List
        }
      },
      // 新闻动态
      async getArticleInfoList () {
        let data = await GetArticleInfoList({
          CategoryId: '1',
          Page: '1', 
          Rows: '4', 
          Order: 'desc', 
          Sort: 'Id'
        })
        if (data.IsSuccess) {
          this.articleList = data.Data.List
        }
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
              font-size:  14px;
              height: toRem(30px);
              line-height: toRem(30px);
              margin-left: toRem(10px)
            }
          }
        }
        .logined{
          .headImg{
            float: left;
            width: toRem(71px);
            height: toRem(71px);
          }
          .text{
            float: left;
            @extend %clearFix;
            margin-left: toRem(20px);
            .hd{
              color: #4a608c;
              font-size: 14px;
              font-weight: bold;
            }
            .bd{
              color: #4a608c;
              font-size: 12px;
              margin-top: toRem(15px);
              p{
                float: left;
                margin-right: toRem(40px);
                height: toRem(16px);
                line-height: toRem(16px);
                &:nth-child(1) {
                  img{
                    width: toRem(22px);
                    height: toRem(21px);
                    margin-right: toRem(10px);
                    vertical-align: middle;
                  }
                }
                &:nth-child(2) {
                  img{
                    width: toRem(16px);
                    height: toRem(20px);
                    margin-right: toRem(10px);
                    vertical-align: middle;
                  }
                }
              }
              
            }
          }
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
      height: toRem(567px);
      background: url("../assets/planet-rail.png") no-repeat;
      background-size: 100% toRem(481px);
      .score-list{
        p{
          color: #fff;
          padding-top: toRem(332px);
          text-align: center;
          letter-spacing: toRem(3px);
          display: none;
          &.actived{
            display: block;
          }
          span{
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
      .score-planet{
        position: relative;
        margin-top: toRem(27px);
        @extend %clearFix;
        .sp1{
          position: absolute;
          top: toRem(-2px);
          left: toRem(85px);
          height: toRem(56px);
          width: toRem(56px);
          border-radius: 50%;
          img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: toRem(46px);
            width: toRem(46px);
          }
        }
        .sp2{
          position: absolute;
          top:toRem(20px);
          left: toRem(212px);
          height: toRem(56px);
          width: toRem(56px);
          border-radius: 50%; 
          img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: toRem(46px);
            width: toRem(46px);
          }
        }
        .sp3{
          position: absolute;
          top: toRem(16px);
          left: toRem(336px);
          height: toRem(70px);
          width: toRem(70px);
          border-radius: 50%; 
          img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: toRem(60px);
            width: toRem(60px);
          }
          &.actived{
            border: toRem(2px) dashed #299cb9;
          }
        }
        .sp4{
          position: absolute;
          top:toRem(22px);
          left: toRem(476px);
          height: toRem(57px);
          width: toRem(56px);
          border-radius: 50%;
          img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: toRem(47px);
            width: toRem(46px);
          }
        }
        .sp5{
          position: absolute;
          top:toRem(-2px);
          left: toRem(612px);
          height: toRem(56px);
          width: toRem(56px);
          border-radius: 50%;
          img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: toRem(46px);
            width: toRem(46px);
          }
        }
        .sp-list1, .sp-list2, .sp-list3, .sp-list4, .sp-list5{
          float: left;
          height: toRem(150px);
          width: toRem(56px);
          text-align: center;
          .num{
            padding-top: toRem(100px);
            font-weight: bold;
          }
          .arrow{
            display: none;
            img{
              width: toRem(18px);
              height: toRem(15px);
            }
          }
        }
        .sp-list1{
           margin-left: toRem(80px);
           width: toRem(56px);
           &.actived{
            .sp1{
              border: 2px dashed #56bcc1;
            }
            .arrow{
              display: block;
            }
          }
        }
        .sp-list2{
          margin-left: toRem(75px);
          width: toRem(56px);
          &.actived{
            .sp2{
              border: toRem(2px) dashed #ff7500;
            }
            .arrow{
                display: block;
            }
          }
        }
        .sp-list3{
          margin-left: toRem(68px);
          width: toRem(71px);
          &.actived{
            .sp3{
              border: toRem(2px) dashed #299cb9;
            }
            .arrow{
                display: block;
            }
          }
        }
        .sp-list4{
          margin-left: toRem(70px);
          width: toRem(56px);
          &.actived{
            .sp4{
              border: toRem(2px) dashed #edcd3e;
            }
            .arrow{
                display: block;
            }
          }
        }
        .sp-list5{
          margin-left: toRem(80px);
          width: toRem(56px);
          &.actived{
            .sp5{
              border: toRem(2px) dashed #dae8cf;
            }
            .arrow{
                display: block;
            }
          }
        }
      }
    }
    .party_news {
      display: flex;
      height: toRem(120px);
      border-top: 1px solid #fff;
      padding: 0 toRem(28px);
      background: #ffffff url("../assets/rl-topbg.png") no-repeat;
      background-size: toRem(750px) toRem(10px);
      background-position: 0 toRem(110px);
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
            a {
              width: 100%;
              @include ellipsis_two(1);
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
    .resource-link{
      padding: 0 0.4rem;
      background: #fff;
      .rl-top{
        padding-top: toRem(45px);
        @extend %clearFix;
        .title{
          float: left;
          width: toRem(220px);
          height: toRem(180px);
          img{
            width: toRem(220px);
            height: toRem(180px);
            box-shadow:0 0 toRem(6px) #fbb258;
          }
        }
        .con{
          float: left;
          width: toRem(468px);
          ul{
            @extend %clearFix;
            li{
              float: left;
              margin-left: toRem(18px);
              width: toRem(215px);
              height: toRem(80px);
              line-height: toRem(80px);
              background: #f5f9ff;
              border-radius: toRem(5px);
              color: #333;
              text-align: center;
              font-size: 14px;
              img{
                vertical-align: middle;
                margin-right: toRem(20px);
                width: toRem(38px);
                height: toRem(40px);
              }
              &:nth-child(2) {
                margin-bottom: toRem(20px)
              }
              &:nth-child(1) {
                margin-bottom: toRem(20px)
              }
            }
          }
        }
      }
      .rl-bd{
        @extend %clearFix;
        margin-top: toRem(20px);
        .title{
          float: left;
          width: toRem(220px);
          height: toRem(80px);
          img{
            width: toRem(220px);
            height: toRem(80px);
            box-shadow: 0 0 toRem(6px) #fecbd2;
          }
        }
        .con{
          float: left;
          width: toRem(468px);
          ul{
            @extend %clearFix;
            li{
              float: left;
              margin-left: toRem(18px);
              width: toRem(215px);
              height: toRem(80px);
              line-height: toRem(80px);
              background: #f5f9ff;
              border-radius: toRem(5px);
              color: #333;
              text-align: center;
              font-size: 14px;
              // margin-top: toRem(px);
              img{
                vertical-align: middle;
                margin-right: toRem(20px);
                width: toRem(38px);
                height: toRem(40px);
              }
            }
          }
        }
      }
    }
    .new_course{
      background: #fff;
      padding-top: toRem(75px);
      .title{
        padding:0 0.4rem;
        @extend %clearFix;
        .hd{
          font-size: 20px;
          color: #333;
          float: left;
          font-weight: bold;
        }
        .bd{
          float: right;
          a{
            color: #333;
            font-size:13px;
            img{
              width: toRem(14px);
              height: toRem(24px);
            }
          }
        }
      }
      .swiper-container{
        margin-top: toRem(30px);
        width: toRem(720px);
        margin-left: toRem(30px);
        .swiper-wrapper{
          .swiper-slide{
            width: toRem(320px);
            margin-right: toRem(19px);
            a{
              img{
                width: toRem(320px);
              }
              p{
                margin-top: toRem(30px);
                @include ellipsis_two(1);
                font-size: 14px;
                color: #333;
              }
            }
            .clickCount{
              color: #a9bcc7;
              margin-top: toRem(20px);
            }
            .classify{
              margin-top: toRem(20px);
              background: #f5f9ff;
              color: #4a608c;
              height: toRem(46px);
              line-height: toRem(46px);
              padding: 0 toRem(17px);
              width: fit-content;
            }
          }
        }
      }
    }
    .new_showRoom{
      background: #fff;
      padding-top: toRem(80px);
      .title{
        padding: 0 0.4rem;
        .hd{
          font-size: 20px;
          color: #333;
          font-weight: bold;
        }
        .bd{
          margin-top: toRem(35px);
          @extend %clearFix;
         .list{
           @extend %clearFix;
           width: toRem(450px);
           float: left;
           .list-tab{
             width: toRem(180px);
             height: toRem(60px);
             line-height: toRem(60px);
             text-align: center;
             font-size: 14px;
             background: #f5f9ff;
             border-radius: toRem(30px);
             color: #4a608c;
             float: left;
             margin-right: toRem(19px);
             &.on{
               background: #4374df;
               color: #fff;
             }
           }
         }
         .more{
            float: right;
            color: #333;
            font-size:13px;
            margin-top: toRem(10px);
            img{
              width: toRem(14px);
              height: toRem(24px);
              margin-left: toRem(10px);
            }
          }
        }
      }
      .swiper-container{
        margin-top: toRem(40px);
        width: toRem(720px);
        margin-left: toRem(30px);
        .swiper-wrapper{
          .swiper-slide{
            width: toRem(660px);
            height: toRem(470px);
            border-radius: 5%;
            box-shadow: 0 0 toRem(5px) #f2f2f2;
            a{
              .imgArea{
                width: toRem(620px);
                margin-left: toRem(20px);
                margin-top: toRem(20px);
                @extend %clearFix;
                .imgB{
                  float: left;
                  img{
                    width: toRem(390px);
                    height: toRem(300px);
                  }
                }
                .imgB1{
                  float: left;
                  img{
                    width: toRem(620px);
                    height: toRem(300px);
                  }
                }
                .imgS{
                  float:left;
                  width: toRem(220px);
                  margin-left: toRem(10px);
                  img{
                    width: toRem(220px);
                    height: toRem(145px);
                    &:nth-child(1){
                      margin-bottom: toRem(10px);
                    }
                  }
                }
              }
              .text{
                margin-top: toRem(27px);
                margin-left: toRem(20px);
                @extend %clearFix;
                .tt{
                  width: toRem(470px);
                  height: toRem(80px);
                  float: left;
                  border-right:1px solid #333;
                  .title2{
                    font-size: 14px;
                    color: #333;
                    font-weight: bold;
                    @include ellipsis_two(1);
                  }
                  .time{
                    margin-top: toRem(12px);
                    color: #a9bcc7;
                  }
                }
                .collect{
                  float: right;
                  width: toRem(144px);
                  text-align: center;
                  img {
                    width: toRem(43px);
                    height: toRem(40px);
                  }
                  p{
                    margin-top: toRem(12px);
                    color: #a9bcc7;
                  }
                }
              }
            }
          }
        }
      }
    }
    .hot_book{
      background: #fff;
      padding-top: toRem(75px);
      padding-bottom: toRem(50px); 
      .title{
        padding: 0 0.4rem;
        .hd{
          font-size: 20px;
          color: #333;
          font-weight: bold;
        }
        .bd{
          margin-top: toRem(35px);
          @extend %clearFix;
         .list{
           @extend %clearFix;
           width: toRem(450px);
           float: left;
           .list-tab{
             width: toRem(180px);
             height: toRem(60px);
             line-height: toRem(60px);
             text-align: center;
             font-size: 14px;
             background: #f5f9ff;
             border-radius: toRem(30px);
             color: #4a608c;
             float: left;
             margin-right: toRem(19px);
             &.on{
               background: #4374df;
               color: #fff;
             }
           }
         }
         .more{
            float: right;
            color: #333;
            font-size:13px;
            margin-top: toRem(10px);
            img{
              width: toRem(14px);
              height: toRem(24px);
              margin-left: toRem(10px);
            }
          }
        }
      }
      .swiper-container{
        margin: toRem(40px) 0.4rem 0;
        .swiper-wrapper{
          .swiper-slide{
            width: toRem(190px);
            margin-right: toRem(60px);
            .cover{
              width: toRem(190px);
              height: toRem(281px);
            }
            .name{
              margin-top: toRem(20px);
              color: #333;
              font-weight: bold;
              font-size: 14px;
              @include ellipsis_two(1)
            }
            .author{
              margin-top: toRem(15px);
              color: #a9bcc7;
            }
          }
        }
      }
    }
    .news{
      background: #fff;
      margin-top: toRem(20px);
      .title{
        height: toRem(105px);
        border-bottom: 1px solid #dddddd;
        position: relative;
        .hd{
          position: absolute;
          left: 0;
          color: #333;
          font-size: 20px;
          height: toRem(104px);
          line-height: toRem(104px);
          width: toRem(220px);
          text-align: center;
          border-bottom: 4px solid #4374df;
          font-weight: bold;
        }
        a{
          float: right;
          margin-right: 0.4rem;
          margin-top: toRem(30px);
          color: #333;
          font-size:13px;
          img{
            width: toRem(14px);
            height: toRem(24px);
            margin-left: toRem(10px);
          }
        }
      }
      .list{
        ul{
          li{
             padding: toRem(55px) 0.4rem toRem(40px);
            a{
              @extend %clearFix;
              .text{
                width: toRem(465px);
                float: left;
                .title{
                  width: toRem(414px);
                  line-height: toRem(40px);
                  color: #333;
                  font-size: 14px;
                  font-weight: bold;
                  border: none;
                  height: toRem(78px);
                  @include ellipsis_two(2);
                  img{
                    width: toRem(30px);
                    height: toRem(32px);
                    vertical-align: sub;
                  }
                }
                .info{
                  p{
                    float: left;
                    margin-right: toRem(57px);
                    color: #a9bcc7;
                    img{
                      vertical-align: middle;
                      margin-right: toRem(5px);
                      width: toRem(27px);
                      height: toRem(18px);
                    }
                  }
                }
              }
              .pic{
                float: right;
                width: toRem(224px);
                img{
                  width: toRem(224px);
                  height: toRem(150px);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
