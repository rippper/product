/**
* 新闻中心
*/
<template>
  <div class="newsCenter container_top">
    <header-fix :title="title" fixed>
      <i slot="left" class="webapp webapp-left" @click="goBack"></i>
      <!--<router-link slot="right" to="/newsSearch"><i class="webapp webapp-search"></i></router-link>-->
    </header-fix>
    <!--<nav-slide :show="showSlide" @showChange="showChange">
      <div slot="left" class="category">
        <tree :data="articleCategory" :option="defaultOption" :on-select="searchArticle"
              :selected-id="categoryId"></tree>
      </div>
      <div slot="right">
      </div>
    </nav-slide>-->
    <div class="boundary"></div>
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="(item, index) in articleCategory" :key="index" :id="item.Code">{{item.Name}}</mt-tab-item>
    </mt-navbar>
    <section v-infinite-scroll="getArticleList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <news-list :news-data="articleData" :no-data="noData" :no-more-data="noMoreData"></news-list>
    </section>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll, Navbar, TabItem } from 'mint-ui'
  import { GetArticleChannelInfoList, GetArticleInfoList } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.component(Navbar.name, Navbar)
  Vue.component(TabItem.name, TabItem)
  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        title: '',
        showSlide: false,
        articleCategory: [],
        categoryId: 0,
        articleData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noMoreData: false,
        code: '',
        defaultOption: {
          name: 'Name',
          nodes: 'Nodes',
          Id: 'Id'
        },
        selected: ''
      }
    },
    created () {
      this.categoryId = this.$route.query.Id
      this.title = this.$route.query.title
      document.title = this.title
      this.code = this.$route.query.code
      this.getArticleCategory()
      // this.getArticleList();
    },
    methods: {
      toggleNav () {
        this.showSlide = !this.showSlide
      },
      showChange (val) {
        this.showSlide = val
      },
      // 文章分类
      async getArticleCategory () {
        let params = {}
        params.ParentId = this.categoryId || ''
        params.ParentCode = this.code || ''
        let res = await GetArticleChannelInfoList(params)
        if (res.IsSuccess) {
          this.articleCategory.push({
            Code: this.code,
            Id: this.categoryId || '',
            Name: '全部',
            Nodes: [],
            ParentId: 0,
            Sort: 0,
            Status: ''
          })
          this.selected = this.code
          if (Array.isArray(res.Data)) {
            this.articleCategory = this.articleCategory.concat(res.Data)
          }
        }
      },
      // 文章列表
      async getArticleList () {
        if (this.page > 1 && this.noMoreData) return
        this.loading = true
        Indicator.open()
        let res = await GetArticleInfoList(
          { CategoryId: this.categoryId, Page: this.page, CategoryCode: this.code })
        Indicator.close()
        this.loading = false
        if (res.IsSuccess) {
          let list = res.Data.List || []
          if (list.length === 0 && this.page > 1) {
            this.noMoreData = true
            return
          }
          if (list.length === 0 && this.page === 1) {
            this.noData = true
            return
          }
          this.articleData = this.articleData.concat(list)
          this.page += 1
        }
      },
      searchArticle (data) {
        this.page = 1
        this.categoryId = data.Id
        this.articleTitle = data.Name
        this.showSlide = false
        this.articleData = []
        this.getArticleList()
      }
    },
    watch: {
      selected (val) {
        this.page = 1
        this.noData = false
        this.noMoreData = false
        this.articleData = []
        this.code = val
        this.getArticleList()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .newsCenter {
    width: 100vw;
    height: 100vh;
  }
</style>
