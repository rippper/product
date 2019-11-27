/**
* 电子书列表
*/
<template>
  <div class="ebook_list">
    <div class="ebook_item" v-for="item in data" :key="item.Id"
         @click="goChapterList(item.Id,item.Name)">
          <div class="ebookCover">
            <error-img :src="item.Icon" :error-src="errorBook"></error-img>
          </div>
          <div class="ebookTip">
            <p class="title">
              {{item.Name}}
            </p>
            <div class="content" >
             {{item.BookKey || '暂无'}}
            </div>
             <div class="ebook_bottom">
               <div class="ebook_author">
                 作者：{{item.Author || '暂无'}} 著
               </div>
               <div class="ebook_view">
                 <img src="../assets/article-eyes.png" alt=""> {{item.ClickCount || '0'}}
               </div>
              </div>
          </div>
         
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
        console.log(id, bookName)
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
    padding:  0 toRem(25px);
    background: #fff;
    .ebook_item {
      padding: toRem(25px) 0 ;
      display: flex;
      border-bottom: 1px solid #e8e8e8;
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
      .ebookTip{
        margin-left: toRem(20px);
        .title{
          font-size: 16px;
          color: #333;
          font-weight: bold;
          @include ellipsis_two(1);
        }
        .content{
          height: toRem(150px);
          color: #a9bcc7;
          font-size: 13px;
          @include ellipsis_two(2);
        }
        .ebook_bottom{
          display: flex;
          .ebook_author{
            color: #a9bcc7;
            font-size: 13px;
            line-height: toRem(40px);
          }
          .ebook_view{
            margin-left: toRem(60px);
            color: #a9bcc7;
            line-height: toRem(40px);
            img{
              width: toRem(27px);
              height: toRem(18px);
              vertical-align: middle;
              box-shadow: none;
            }
          }
        }
      }
    }
  }
</style>
