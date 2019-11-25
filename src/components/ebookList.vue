/**
* 电子书列表
*/
<template>
  <div class="ebook_list">
    <div class="ebook_item" v-for="item in data" :key="item.BookNameId"
         @click="goChapterList(item.BookNameId,item.BookName)">
          <div class="ebookCover">
            <error-img :src="item.BookImg" :error-src="errorBook"></error-img>
          </div>
          <div class="ebookTip">
            <p class="title">
              {{item.BookName}}
            </p>
            <div class="">
              亨利·罗斯是夏威夷水族馆的一名兽医，也是 一位快乐的单身汉，在管理海洋动物的同...
            </div>
          </div>
          <p class="ebook_author">作者：{{item.AutoName}}</p>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import errorImg from './errorImg.vue'
  import errorBook from '../assets/error_book.png'
  import { setStore } from '../plugins/utils'

  export default {
    data () {
      return {
        errorBook
      }
    },
    props: {
      data: Array,
      noDataBg: Boolean,
      noData: Boolean
    },
    components: {
      errorImg
    },
    methods: {
      goChapterList (id, bookName) {
        setStore('bookName', bookName)
        this.$router.push({ path: '/ebookChapterList', query: { id } })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook_list {
    @extend %clearFix;
    padding: 0 toRem(30px);
    .ebook_item {
      padding: toRem(25px) 0;
      img {
        @include wh(176px, 234px);
        @include border-right-radius(10px);
        box-shadow: toRem(6px) toRem(6px) 4px #b5b9bc;
        -webkit-box-shadow: toRem(6px) toRem(6px) 8px #b5b9bc;
      }

      .ebook_name {
        padding: 0 toRem(30px);
        height: toRem(64px);
        line-height: toRem(32px);
        @include ellipsis_two();
        margin: toRem(10px) 0;
      }

      .ebook_author {
        line-height: toRem(40px);
      }
    }
  }
</style>
