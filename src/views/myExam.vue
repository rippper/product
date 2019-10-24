/**
* 考试中心
*/
<template>
  <div class="examCenter2 container_both">
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <mt-navbar v-model="selected" class="examList-title">
      <mt-tab-item id="1">未考</mt-tab-item>
      <mt-tab-item id="2">已考</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="examList-con">
      <!-- 未考列表 -->
      <mt-tab-container-item>
        <section v-infinite-scroll="getExamList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
          <my-exam-list :exam-data="examData"
                     :no-data-bg="noDataBg"
                     :no-data="noData">
          </my-exam-list>
        </section>
      </mt-tab-container-item>
    </mt-tab-container>
    <footer-fix selected="examCenter"></footer-fix>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll, TabItem, TabContainer, TabContainerItem, Navbar } from 'mint-ui'
  import { headerFix, footerFix, myExamList } from '../components'
  import { GetExamList } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.use(InfiniteScroll)
  Vue.component(TabItem.name, TabItem)
  Vue.component(Navbar.name, Navbar)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  export default {
    mixins: [goBack],
    data () {
      return {
        examTitle: '我的考试',
        examType: 'UnJoin', // 筛选type
        examCategory: [],
        typeId: 0, // 考试typeId
        examData: [], // 考试数据
        // examPracticeData: [], // 未考考试数据
        loading: false,
        immediate: false,
        page: 1, // 未考页码
        noData: false,
        noDataBg: false,
        selected: '1'
      }
    },
    mounted () {
      this.getExamList()
    },
    components: {
      headerFix,
      footerFix,
      myExamList
    },
    methods: {
      //  已考考试列表
      async getExamList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await GetExamList({ ExamType: this.examType, TypeId: this.typeId, Page: this.page })
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
          this.examData = this.examData.concat(list)
          this.loading = false
          this.page += 1
        }
      }
    },
    watch: {
      selected (val) {
        console.log(val)
        const type = { 1: 'Unjoin', 2: 'InJoin' }
        this.page = 1
        this.noData = false
        this.noDataBg = false
        this.examType = type[val]
        this.examData = []
        this.getExamList()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .examCenter2 {
    width: 100vw;
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
