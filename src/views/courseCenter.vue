/**
* 课程中心
*/
<template>
  <div class="courseCenter container_both">
    <header-fix :title="courseTitle" fixed>
      <!-- <a slot="left" @click="toggleNav">
        <i class="webapp webapp-category"></i>
      </a> -->
      <router-link slot="right" to="/courseSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <!-- <nav-slide :show="showSlide" @showChange="showChange">
      <div slot="left" class="category">
        <tree :data="courseCategory" :option="defaultOption" :on-select="searchCourse" :selected-id="channelId"></tree>
      </div>
      <template slot="right">
        <div class="tabSwitch">
          <mb-tab v-model="tabType">
            <mb-tab-item id="1"><span>最新</span></mb-tab-item>
            <mb-tab-item id="2"><span>最热</span></mb-tab-item>
            <mb-tab-item id="3"><span>好评</span></mb-tab-item>
          </mb-tab>
          <div class="switch-btn" @click="switchCourse"><img src="../assets/view_switch_icon.png" alt=""></div>
        </div>

        <mt-tab-container>
          <mt-tab-container-item>
            <section v-infinite-scroll="getCourseList"
                     infinite-scroll-disabled="loading"
                     infinite-scroll-immediate-check="immediate"
                     infinite-scroll-distance="10">
              <course-list :course-data="courseData"
                           :no-data-bg="noData"
                           :no-data="noMoreData"
                           v-if="itemX"
              >
              </course-list>
              <course-list :course-data="courseData"
                           :no-data-bg="noData"
                           :no-data="noMoreData"
                           v-else
                           class="itemY"
              >
              </course-list>
            </section>
          </mt-tab-container-item>
        </mt-tab-container>
      </template>
    </nav-slide> -->
    <div class="category-first">
      <div class="cf-swiper">
        <div class="swiper-con">
          <ul ref="cataF_ul">
             <li v-for="(item, index) in cataListF" 
                :key="index" 
                :class="{'actived': item.jugement}" 
                @click.stop="chooseListF(index, item.Id)"
                ref="cataF_item"
             >
               {{item.Name}}
             </li>
          </ul>
        </div>
        <div class="gallery-thumbs">
          <div class="gt-layer" v-if="showGtLayer" @click="toggleGtLayer"></div>
          <div class="gt-wrapper" :class="{'show': showGtLayer}">
            <ul ref="cataS_ul">
              <li 
              v-for="(item, index) in cataListF" 
              :key="index"
              @click="chooseListFdata(index, item.Id)"
              ref="cataS_item"
              >
                {{item.Name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btn" @click="toggleGtLayer">
        <img src="../assets/course-classify-icon.png" alt="">分类
      </div>
    </div>
    <div class="course-con">
      <div class="cc-second" v-if="cataListS&&cataListS.length > 0">
        <div class="cc-swiper">
          <div class="swiper-con">
            <ul>
              <!-- <li class="actived">
                社区风采
              </li>
              <li>政策热点</li>
              <li>生活养生</li>
              <li>社区风采</li>
              <li>政策热点</li> -->
              <li v-for="(item, index) in cataListS" 
                  :key="index"
                  :class="{'actived': item.jugement}"
                  @click="chooseListS(index, item.Id)"
              >
                {{item.Name}}
              </li>
            </ul>
          </div>
          <div class="cc-thums">
            <div class="cc-layer" v-if="showCcLayer" @click="toggleCcLayer"></div>
            <div class=cc-wrapper :class="{'show': showCcLayer}">
              <ul>
                <li 
                  v-for="(item, index) in cataListS"
                  :key="index"
                  @click="chooseListSdata(index, item.Id)"
                >
                  {{item.Name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="btn" @click="toggleCcLayer">
         <img src="../assets/cross-line.png" alt="">
        </div>
      </div>
      <section v-infinite-scroll="getCourseList"
                     infinite-scroll-disabled="loading"
                     infinite-scroll-immediate-check="immediate"
                     infinite-scroll-distance="10">
              <course-list :course-data="courseData"
                           :no-data-bg="noData"
                           :no-data="noMoreData"
                           v-if="itemX"
              >
              </course-list>
              <course-list :course-data="courseData"
                           :no-data-bg="noData"
                           :no-data="noMoreData"
                           v-else
                           class="itemY"
              >
              </course-list>
            </section>
    </div>
    <footer-fix selected="courseCenter"></footer-fix>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, TabContainer, TabContainerItem, InfiniteScroll } from 'mint-ui'
  import { GetChannelInfoList, GetCourseInfoList } from '../service/getData'

  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  Vue.use(InfiniteScroll)
  export default {
    data () {
      return {
        courseTitle: '视频中心',
        showSlide: false,
        channelId: 0,
        loading: false,
        immediate: false,
        page: 1,
        Sort: 'CreateDate',
        tabType: '1',
        courseData: [],
        noData: false,
        noMoreData: false,
        itemX: true,
        defaultOption: {
          name: 'Name',
          nodes: 'Nodes',
          Id: 'Id'
        },
        showGtLayer: false,
        showCcLayer: false,
        cataListF: [],
        cataListS: []
      }
    },
    created () {
      this.channelId = this.$route.query.id || 0
    },
    mounted () {
      this.getCourseList({ Sort: this.Sort })
      this.getChannelInfoList()
    },
    watch: {
      tabType (val) {
        const sort = { 1: 'CreateDate', 2: 'ClickCount', 3: 'CommontScore' }
        this.Sort = sort[val]
        this.page = 1
        this.noMoreData = false
        this.noData = false
        this.courseData = []
        this.getCourseList()
      },
      channelId (val) {
        console.log(val)
        this.page = 1
        this.noMoreData = false
        this.noData = false
        this.courseData = []
        this.getCourseList()
      }
    },
    methods: {
      toggleNav () {
        this.showSlide = !this.showSlide
      },
      showChange (val) {
        this.showSlide = val
      },
      switchCourse () {
        this.itemX = !this.itemX
      },
      // 课程分类
      async getChannelInfoList () {
        let data = await GetChannelInfoList()
        if (data.IsSuccess) {
          this.cataListF = data.Data.CourseCategoryResult
          this.cataListF.forEach(item => {
            item.jugement = false
          })
        }
      },
      // 课程列表
      async getCourseList () {
        if (this.page > 1 && this.noMoreData) return
        Indicator.open()
        this.loading = true
        let data = await GetCourseInfoList({ Page: this.page, ChannelId: this.channelId, Sort: this.Sort })
        this.loading = false
        Indicator.close()
        if (data.IsSuccess) {
          let list = data.Data.List
          if (list.length === 0 && this.page > 1) {
            this.noMoreData = true
            return
          }
          if (list.length === 0 && this.page == 1) {
            this.noData = true
            return
          }
          this.courseData = this.courseData.concat(list)
          this.page += 1
        }
      },
      /* 搜索课程 */
      searchCourse (data) {
        this.page = 1
        this.channelId = data.Id
        this.courseTitle = data.Name
        this.showSlide = false
        this.courseData = []
        this.getCourseList()
      },
      toggleGtLayer () {
        this.showGtLayer = !this.showGtLayer 
      },
      toggleCcLayer () {
        this.showCcLayer = !this.showCcLayer
      },
      chooseListF (num, id) {
        this.cataListF.forEach(item => {
          item.jugement = false
          if (item.Id == id) {
            this.cataListS = item.Nodes
          }
        })
        this.channelId = id
        this.cataListF[num].jugement = true
        let offset1 = this.$refs.cataF_item[num].offsetLeft // 当前选中元素距离左边的间距
        let width1 = this.$refs.cataF_item[num].clientWidth // 当前选中元素的宽度
        let bodyWidth = document.body.clientWidth // 页面宽度
        let halfWidth = (550 / 75 * bodyWidth / 10) / 2 // (当前父元素宽度,由设计图550转化rem后计算成当前页面宽度,取一半)
        // 当选中元素的左间距大于父元素一半时使选中元素一直居中 小于时保持不动
        // console.log(offset1, halfWidth, offset2)
        if (offset1 > halfWidth) {
          let offset2 = offset1 - halfWidth + width1 / 2
          // console.log(offset1, offset2)
          this.$nextTick(() => {
              this.$refs.cataF_ul.scrollTo(offset2, 0)
          }) 
        } else {
          this.$refs.cataF_ul.scrollTo(0, 0)
        }
      },
      chooseListFdata (num, id) {
        this.channelId = id
        this.showGtLayer = !this.showGtLayer
        this.chooseListF(num, id)
        this.cataListF.forEach(item => {
          item.jugement = false
          this.cataListF[num].jugement = true
        })
      },
      chooseListS (num, id) {
        this.channelId = id
        this.cataListS.forEach(item => {
          item.jugement = false
          this.cataListS[num].jugement = true
        })
        let offset1 = this.$refs.cataS_item[num].offsetLeft // 当前选中元素距离左边的间距
        let width1 = this.$refs.cataS_item[num].clientWidth // 当前选中元素的宽度
        let bodyWidth = document.body.clientWidth // 页面宽度
        let halfWidth = (550 / 75 * bodyWidth / 10) / 2
        if (offset1 > halfWidth) {
          let offset2 = offset1 - halfWidth + width1 / 2
          // console.log(offset1, offset2)
          this.$nextTick(() => {
              this.$refs.cataS_ul.scrollTo(offset2, 0)
          }) 
        } else {
          this.$refs.cataS_ul.scrollTo(0, 0)
        }
      },
      chooseListSdata (num, id) {
        this.channelId = id
        this.showCcLayer = !this.showCcLayer
        this.chooseListS(num, id)
        this.cataListS.forEach(item => {
          item.jugement = false
          this.cataListS[num].jugement = true
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .courseCenter {
    width: 100vw;
    height: 100vh;
    background: #4070da;
    .header{
      border-bottom: none;
      background: transparent;
      @include ht-lineHt(100px);
      .header_title{
        color: #fff;
        font-size: 18px;
      }
      .header_right{
        a{
          .webapp-search:before{
            color: #fff;
          }
        }
      }
    }
    .nav_right {
      .tabSwitch {
        @extend %clearFix;

        .mb_tab {
          width: 7.5rem;
          @extend %pull-left;
          .mb_tab_item {
            span {
              display: block;
              width: 100%;
              text-align: center;
              border-right: 1px solid #eee;
              height: toRem(34px);
              line-height: toRem(34px);
            }
          }
        }

        .switch-btn {
          @extend %pull-left;
          text-align: center;
          background: #fff;
          width: 2.5rem;
          height: toRem(56px);

          img {
            width: toRem(40px);
            width: toRem(40px);
          }
        }
      }

      .itemY {
        overflow: hidden;
        padding: toRem(0px) toRem(25px) toRem(0px) toRem(25px);
        background: #fff;
        zoom: 1;

        .course_item {
          width: 50%;
          padding: 0;
          margin-top: 0.4rem;
          float: left;
          padding-right: toRem(25px);

          .course_img {
            width: 100%
          }

          .course_desc {
            width: 100%;
            position: relative;
            height: 1.4rem;
            padding: 0;

            .course_name {
              text-align: left;
              width: 100%;
              font-size: 13px;
            }

            .course_tt {
              position: absolute;
              bottom: toRem(10px);
              .course_time {
                display: none;
              }
            }

            .course_bottom {
              bottom: toRem(10px);
              height: toRem(40px);

              .course_bottom_time {
                display: none;
              }

              .course_bottom_score {
                line-height: toRem(40px);
              }
            }
          }
        }
      }
    }
    .category-first{
      @extend %clearFix;
      .cf-swiper{
        float: left;
        width: toRem(550px);
        margin-left: toRem(30px);
        overflow: hidden;
        .swiper-con{
          width: toRem(550px);
          height: toRem(80px);
          line-height: toRem(80px);
          font-size: 16px;
          color: #fff;
          overflow: hidden;
          position: relative;
          ul{
            display: flex;
            height: toRem(80px);
            overflow: auto;
            li{
              text-align: center;
              flex-shrink: 0;
              color: #fff;
              font-size: 14px;
              margin-right: toRem(50px);
              &:nth-last-child(1){
                margin-right: 0;
              }
              &.actived{
                background: url("../assets/block-yel.png") no-repeat center bottom;
                background-size: toRem(30px) toRem(6px); 
                color: #fed803;
                font-size: 16px;
              }
            }
          }
        }
        .gallery-thumbs{
          .gt-layer{
            position: absolute;
            top: toRem(170px);
            left: 0;
            height: 100vh;
            z-index: 50;
            background: rgba(0,0,0,0.4);
            width: 100%;
          }
          .gt-wrapper{
            position: absolute;
            max-height: 0;
            overflow: hidden;
            left: 0;
            right: 0;
            z-index: 100;
            background-color: $fill-base;
            font-size: 15px;
            transition: max-height ease 0.5s;
            &.show {
              max-height: 100vh;
            }
            ul{
              padding: toRem(30px);
              @extend %clearFix;
              li{
                float: left;
                margin:toRem(10px) toRem(40px) 0 0;
                font-size: 14px;

                color: #333;
              }
            }
          }
        }
      }
      .btn{
        float: left;
        color: #fff;
        margin-top: toRem(15px);
        font-size: 16px;
        margin-left: toRem(40px);
        img{
          width: toRem(28px);
          height: toRem(28px);
          vertical-align: baseline;
          margin-right: toRem(8px);
        }
      }
    }
    .course-con{
      background: #fff;
      border-radius: toRem(20px) toRem(20px) 0 0;
      min-height: 85vh;
      .cc-second{
        @extend %clearFix;
        padding-top: toRem(40px);
        .cc-swiper{
          float: left;
          width: toRem(610px);
          margin-left: toRem(30px);
          overflow: hidden;
          .swiper-con{
            width: toRem(610px);
            height: toRem(52px);
            line-height: toRem(52px);
            font-size: 14px;
            color: #fff;
            overflow: hidden;
            position: relative;
            ul{
              @extend %clearFix;
              li{
                height: toRem(52px);
                line-height: toRem(52px);
                background: #f5f9ff;
                color: #4a608c;
                font-size: 13px;
                text-align: center;
                float: left;
                border-radius: toRem(30px);
                margin-right: toRem(15px);
                &.actived{
                  background: #4374df;
                  color: #fff;
                  padding: 0 toRem(15px)
                }
              }
            }
          }
          .cc-thums{
            .cc-layer{
              position: absolute;
              width: 100%;
              left: 0;
              top: toRem(270px);
              height: 100vh;
              font-size: 15px;
              background: rgba(0,0,0,0.4);
              z-index: 50;
            }
            .cc-wrapper{
              position: absolute;
              max-height: 0;
              overflow: hidden;
              left: 0;
              right: 0;
              z-index: 100;
              background-color: $fill-base;
              transition: max-height ease 0.5s;
              &.show{
                max-height: 100vh;
              }
              ul{
                padding: toRem(30px);
                @extend %clearFix;
                li{
                  float: left;
                  margin-right: toRem(40px);
                  font-size: 13px;
                  color: #333;
                }
              }
            }
          }
        }
        .btn{
          float: left;
          margin-top: toRem(5px);
          margin-left: toRem(50px);
          img{
            width: toRem(34px);
            height: toRem(34px);
          }
        }
      }
    }
  }
</style>
