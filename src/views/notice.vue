/**
* 站内信
*/
<template>
  <div class="notice_center container_top">
    <!--头部-->
    <header-fix title="通知公告" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <section v-infinite-scroll="getNoticeList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <notice-list :notice-data="noticeData" :no-data="noData" :no-more-data="noMoreData"></notice-list>
    </section>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll, Search } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import {
    GetNoticeInfoList
  } from '../service/getData'

  Vue.use(InfiniteScroll)
  Vue.component(Search.name, Search)
  export default {
    mixins: [goBack],
    data () {
      return {
        loading: false,
        immediate: false,
        noData: false,
        noMoreData: false,
        noticeData: [],
        page: 1
      }
    },
    mounted () {
      this.getNoticeList()
    },
    methods: {
      /* 获取站内信 */
      async getNoticeList () {
        if (this.page > 1 && this.noMoreData) return
        Indicator.open()
        let res = await GetNoticeInfoList({ Page: this.page })
        Indicator.close()
        if (res.IsSuccess) {
          let list = res.Data.List || []
          if (list.length === 0 && this.page > 1) {
            this.noMoreData = true
            return
          }
          if (list.length === 0 && this.page == 1) {
            this.noData = true
            return
          }
          this.noticeData = this.noticeData.concat(list)
          this.page++
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .notice_center {

  }
</style>
