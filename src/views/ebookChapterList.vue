/**
* 图书章节
*/
<template>
  <div class="ebook_chapter">
    <!--头部-->
    <div class="header-con">
      <header-fix :title="bookName">
        <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
      </header-fix>
      <div class="brief">
        <div class="brief-left">
          <error-img class="cover" :src="bookContent.Icon" :error-src="errorBook"> 
          </error-img>
            <!-- <img src="../assets/course.png" alt="" class="cover"> -->
            <div class="tip">
              <p class="title">{{bookContent.Name}}</p>
              <p class="author">作者: {{bookContent.Author}}</p>
              <p class="view">浏览: {{bookContent.ClickCount}}</p>
              <p class="read">开始阅读</p>
            </div>
        </div>
        <div class="brief-right">
          <p class="text1">当前评分</p>
          <p class="text2">{{bookContent.Credit}}</p>
          <div class="star">
            <star v-model="bookContent.Credit" size="small" disabled></star>
          </div>
          <p class="text3">{{bookContent.Count || '0'}}人评分</p>
        </div>
      </div>
    </div>
    <div class="chapter">
      <div class="chapter-title">
        章节目录
      </div>
      <div class="chapter-con">
        <section v-infinite-scroll="getChapter"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
          <ul class="ebook_chapter_list">
            <li class="ebook_chapter_item"
                v-for="(item,index) in bookChapterData"
                :key="item.BookTitelId"
                @click="goDetail(item.BookTitelId,index+1)"
            >
              <p class="text">{{item.Name}}</p>  
              <img src="../assets/eye-icon2.png" alt="" class="view">
            </li>
          </ul>
        </section>
        <div class="noDataBg" v-if="noDataBg"></div>
        <div class="no-data" v-if="noData">没有更多内容了...</div>
      </div>
    </div>
    <div class="con-brief"> 
      <div class="title">
        内容简介
      </div>
      <div class="content">
        {{bookContent.BookKey}}
      </div>
    </div>
    <div class="handle">
      <mt-button type="default" class="collect" v-if="NoCollect" @click.native="getFavoriteAdd"><img src="../assets/collect-bline.png" alt="">收藏</mt-button>
      <mt-button type="default" class="collect" v-else @click.native="getFavoriteDelete"><img src="../assets/collect-bline.png" alt="">已收藏</mt-button>
      <mt-button type="default" class="comment" @click.stop="showCommentBox(bookContent.Id)">
        <p class="text"><img src="../assets/message-wline.png" alt="">评论</p>
        <p class="num">{{bookContent.UserCommentCount}}</p>
      </mt-button>
    </div>
    <mt-popup
            position="bottom"
            v-model="commentBox"
            class="circleCommentBox"
            :closeOnClickModal="false"
            > 
            <circle-comment-box 
                :close-box="closeBox" 
                :circle-comment-id="circleCommentId" 
                :circle-comment-list="circleCommentList"
                :comment-count="commentCount"
                :get-comment-box-list="getCommentBoxList"
                :open-detail="openDetail"
                :comment-input-state="commentInputState"
                :typeName="typeName"
                @emitstate="emitstate"
                >
            </circle-comment-box>
        </mt-popup>
        <mt-popup
            position="right"
            v-model="commentListDetail"
            class="commentListDetail"
            >
            <comment-list-box 
                :back-comment="backComment"
                :comment-detail-list="commentDetailList"
            >
            </comment-list-box>
        </mt-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll, Toast } from 'mint-ui'
  import { BookChapterList, BookContent, FavoriteAdd, FavoriteDelete, FavoriteExist, CommentList } from '../service/getData'
  import { headerFix } from '../components'
  import { goBack } from '../service/mixins'
  // import { getStore } from '../plugins/utils'
  import errorBook from '../assets/error_book.png'
  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        errorBook,
        bookId: '',
        bookName: '详情',
        bookChapterData: [],
        page: 1,
        immediate: false,
        loading: false,
        noDataBg: false,
        noData: false,
        bookContent: [],
        NoCollect: true,
        boxArr: null,
        typeName: 'Book',
        commentCount: null,
        commentDetailList: [],
        commentBox: false,
        commentInputState: true,
        statec: true,
        commentDetailpid: null,
        commentListDetail: false,
        circleCommentId: null,
        circleCommentList: []
      }
    },
    created () {
      this.bookId = this.$route.query.id
      // this.bookName = getStore('bookName')
    },
    mounted () {
      this.getChapter()
      this.getBookContent()
      this.getFavoriteExist()
    },
    components: {
      headerFix
    },
    methods: {
      // 图书章节
      async getChapter () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await BookChapterList({ Page: this.page, Rows: '5', id: this.bookId, Sort: 'Id', Order: 'desc' })
        Indicator.close()
        if (data.Status == '200') {
          let list = data.Data.ListData
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.bookChapterData = this.bookChapterData.concat(list)
          this.loading = false
          this.page += 1
          console.log(this.bookChapterData)
        }
      },
      goDetail (id, index) {
        this.$router.push({ path: '/ebookDetail', query: { id, index } })
      },
      async getBookContent () {
        let data = await BookContent({ Id: this.bookId })
        if (data.IsSuccess) {
          this.bookContent = data.Data
        }
      },
      async getFavoriteAdd () {
        let data = await FavoriteAdd({ mainId: this.id, type: 'Book' })
        if (data.Type == 1) {
              Toast('您已成功收藏该作品')
              this.NoCollect = false
          }
      },
      async getFavoriteDelete () {
            let data = await FavoriteDelete({ ids: [this.bookId], type: 'Book' })
            if (data.Type == 1) {
                Toast('您已取消收藏该作品')
                this.NoCollect = true
            }
        },
      async getFavoriteExist () {
          let data = await FavoriteExist({ Id: this.bookId, type: 'Book' })
          if (data.Type == 2) {
              this.NoCollect = true
          } else {
              this.NoCollect = false
          }
      },
      closeBox () {
        let body = document.querySelector('body')
        this.commentBox = false
        this.boxArr = {}
        body.style.overflow = 'auto'
        body.style.height = 'auto'
        body.removeEventListener('click', this.catchHandle, false)
      },
      // 获取评论列表
      async getCommentBoxList () {
          if (!this.boxArr.Id) {
            return
          }
          Indicator.open()
          this.loading = true
          let data = await CommentList({
              MainId: this.boxArr.Id,
              Type: ' Book',
              ParentId: 0,
              Sort: 'Id',
              Order: 'desc',
              Page: this.boxArr.page,
              Rows: 5
          })
          this.loading = false
          Indicator.close()
          if (data.IsSuccess) {
              this.circleCommentList = data.Data.List
              this.commentCount = data.Data.TotalCount
              console.log(this.commentCount, 999)
          }
      },
      emitstate (val) {
          this.commentInputState = val
      },
      backComment () {
          this.commentListDetail = false
          this.showCommentBox(this.boxArr)
      },
      showCommentBox (id) {
          let body = document.querySelector('body')
          body.addEventListener('click', this.catchHandle, false) 
          this.commentBox = true
          body.style.overflow = 'hidden'
          body.style.height = '100vh'
          this.boxArr = {
            Id: id,
            page: 1
          }
          this.circleCommentId = id
          // console.log(this.circleCommentId)
          this.getCommentBoxList()
      },
      openDetail (val) {
          this.closeBox()
          this.commentDetailpid = val.Id
          this.commentListDetail = true
          let body = document.querySelector('body')
          body.removeEventListener('click', this.catchHandle, false)
          this.$nextTick(() => {
            this.circleCommentList.forEach((item) => {
                if (item.Id == this.commentDetailpid) {
                this.commentDetailList = item.List
                }
            })
          })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook_chapter {
    
    height: 100vh;
    width: 100vw;
    .header-con{
      background-color: #4070da;
    }
    .header{
      background: transparent;
      border-bottom: none; 
      .webapp{
        color: #fff;
      }
      .header_title{
        color: #fff;
      }
      .header_right{
        .webapp-search:before{
          color: #fff;
        }
      }
    }
    .brief{
      background: #fff;
      display: flex;
      padding: 0 toRem(30px) toRem(40px);
      margin-top: toRem(100px);
      border-radius: toRem(30px) toRem(30px) 0 0 ;
      justify-content: space-between;
      .brief-left{
        display: flex;
        margin-top: toRem(-62px);
        .cover{
          width: toRem(160px);
          height: toRem(237px);
        }
        .tip{
          margin-left: toRem(20px);
          .title{
            color: #fff;
            font-size: 20px
          }
          .author{
            margin-top: toRem(30px);
            color: #333;
          }
          .view{
            color: #333;
            margin-top: toRem(10px);
          }
          .read{
            margin-top: toRem(30px);
            width: toRem(180px);
            height: toRem(56px);
            background: #db2109;
            color: #fff;
            font-weight: bold;
            font-size: 15px;
            line-height: toRem(56px);
            text-align: center;
            border-radius: toRem(10px);
          }
        }
      }
      .brief-right{
        width: toRem(140px);
        height: toRem(154px);
        border-radius: toRem(10px);
        box-shadow: 0 0 toRem(8px) #b5b9bc;
        margin-top: toRem(20px);
        p{
          text-align: center;
          &.text1{
            color: #a9bcc7;
            padding-top: toRem(10px);
          }
          &.text2{
            color: #333;
            padding-top: toRem(10px);
            font-size: 20px;
            color: #333;
            font-weight: bold;
          }
          &.text3{
            color: #a9bcc7;
          }
        }
        .star{
          text-align: center;
        }
      }
    }
    .chapter{
      background: #fff;
      padding: 0 toRem(30px);
      .chapter-title{
        padding-top: toRem(50px);
        border-top: 1px solid #e8e8e8;
        color: #333;
        font-size: 15px;
        font-weight: bold;
      }
    }
    .con-brief{
      padding: 0 toRem(30px);
      background: #fff;
      .title{
        padding-top: toRem(50px);
        color: #333;
        font-size: 15px;
        font-weight: bold;
      }
      .content{
        font-size: 14px;
        color: #333;
        line-height: toRem(48px);
        margin-top: toRem(30px);
        text-indent:28px;
      }
    }
    .handle{
      padding-top: toRem(85px);
      background: #fff;
      display: flex;
      
      button{
        width: 50%;
        height: toRem(100px);
        text-align: center;
        font-size: 17px;
      }
      .collect{
        color: #333;

        img{
          width: toRem(44px);
          height: toRem(41px);
          margin-right: toRem(10px);
        }
      }
      .comment{
        background: #4374df;
        color: #fff;
        img{
          width: toRem(44px);
          height: toRem(42px);
          margin-right: toRem(10px);
        }
        .mint-button-text{
          @extend %clearFix;
          .text{
            float: left;
          }
          .num{
            float: left;
            background: #d1022a;
            color: #fff;
            font-size: 12px;
            border-radius: toRem(25px);
            padding: toRem(8px) toRem(12px);
            margin-left: toRem(10px);
          }
        }
      }
    }
    .chapter-con{
      .ebook_chapter_list {
        background-color: $fill-base;
      }
      .ebook_chapter_item {
        margin-top: toRem(20px);
        padding: 0 toRem(10px);
        line-height: toRem(80px);
        font-size: 14px;
        color: #4a608c;
        background: #f5f9ff;
        // @extend %clearFix;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          width: toRem(35px);
          height: toRem(28px);
        }
      }
    }
    .circleCommentBox{
      top: 5rem;
      width: 100%;
      .commentBox{
        .cb-con{
          height: toRem(750px);
        }
      }
    }
    .commentListDetail{
        &.mint-popup-right{
        width: 100%;
        height: 100vh;
        }
    }
  }
</style>
