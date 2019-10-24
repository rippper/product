/**
* 课程中心
*/
<template>
  <div class="courseCenter container_both">
    <header-fix :title="courseTitle" fixed>
      <a slot="left" @click="toggleNav">
        <i class="webapp webapp-category"></i>
      </a>
      <router-link slot="right" to="/courseSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <nav-slide :show="showSlide" @showChange="showChange">
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
    </nav-slide>
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
        courseTitle: '课程资源',
        showSlide: false,
        courseCategory: [],
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
        }
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
          this.courseCategory = data.Data.CourseCategoryResult
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
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .courseCenter {
    width: 100vw;
    height: 100vh;

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
  }
</style>
