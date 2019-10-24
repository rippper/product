/**
* 考试中心
*/
<template>
  <div class="examCenter container_both">
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <mb-tab v-model="selected" class="examList-title">
      <mb-tab-item id="1">正式考试</mb-tab-item>
      <mb-tab-item id="2">在线练习</mb-tab-item>
    </mb-tab>
    <mt-tab-container v-model="selected" class="examList-con">
      <mt-tab-container-item id="1">
        <section v-infinite-scroll="getExamList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
          <exam-list :exam-data="examMyData"
                     :no-data-bg="noDataBg"
                     :no-data="noData">
          </exam-list>
        </section>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <section v-infinite-scroll="getExamPracticeList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
          <exam-list :exam-data="examPracticeData"
                     :no-data-bg="noDataBg1"
                     :no-data="noData1">
          </exam-list>
        </section>
      </mt-tab-container-item>
    </mt-tab-container>
    <footer-fix selected="examCenter"></footer-fix>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
  import { headerFix, footerFix, examList, mbTab, mbTabItem } from '../components'
  import { GetMyExamList, GetExamPracticeList } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.use(InfiniteScroll)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  export default {
    mixins: [goBack],
    data () {
      return {
        examTitle: '在线考试',
        examType: 'All', // 筛选type
        examCategory: [],
        typeId: 0, // 考试typeId
        examMyData: [], // 考试列表数据
        examPracticeData: [], // 在线练习列表数据
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
        noData1: false,
        noDataBg1: false,
        selected: '1'
      }
    },
    mounted () {
      this.getExamList()
      this.getExamPracticeList()
    },
    components: {
      headerFix,
      footerFix,
      examList,
      mbTabItem,
      mbTab
    },
    methods: {
      //  考试列表
      async getExamList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await GetMyExamList({ ExamType: this.examType, TypeId: this.typeId, Page: this.page })
        Indicator.close()
        if (data.IsSuccess) {
          let list = data.Data.List
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.examMyData = this.examMyData.concat(list)
          this.loading = false
          this.page += 1
        }
      },
      // 在线练习列表
      async getExamPracticeList () {
        this.noData1 = false
        this.noDataBg1 = false
        this.loading = true
        Indicator.open()
        let data = await GetExamPracticeList({ ExamType: this.examType, TypeId: this.typeId, Page: this.page })
        Indicator.close()
        if (data.IsSuccess) {
          let list = data.Data.List
          if (list.length == 0 && this.page > 1) {
            this.noData1 = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg1 = true
            return
          }
          this.examPracticeData = this.examPracticeData.concat(list)
          this.loading = false
          this.page += 1
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .examCenter {
    width: 100vw;
    height: 100vh;
    background-color: $fill-body;

    .header {
      .header_left, .header_right {
        flex: toRem(200px);
      }
    }

    .tree_title .tran_line {
      background-color: $brand-primary;
    }

    .examList-title {
      .mb_tab_item {
        margin: 0 1rem;
      }
    }
  }
</style>
