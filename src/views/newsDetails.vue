/**
* 文章内容
*/
<template>
  <div class="news_detail_page article_container container_both">
    <!--头部-->
    <header-fix fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="container">
      <section class="article_details_title">
        <h2 class="detail_name">{{articleDetails.Name}}</h2>
        <div class="detail_user">
          <error-img class="user_photo" :src="articleDetails.PhotoUrl" :error-src="Avatar"></error-img>
          <div>
            <div>{{articleDetails.Author}}</div>
            <div>{{articleDetails.CreateDate|dateFilter('yyyy-MM-dd')}}</div>
          </div>
        </div>
      </section>
      <article class="article_details_content" v-html="articleDetails.Content"></article>
      <a v-if="articleDetails.Link" class="read_origin" :href="articleDetails.Link">阅读原文</a>
      <div class="attach_container" v-if="attachList.length > 0">
        <attach-list :attach-list="attachList"></attach-list>
      </div>
    </div>
    <div class="boundary"></div>
    <div class="container">
      <div class="container_title">全部评价（{{totalCount}}）</div>
      <comment-list :comment-list="showedCommentList" @clickReply="openReply"></comment-list>
      <div class="read_more" @click="toggleReadMore" v-if="totalCount>2">
        查看全部评价
      </div>
      <div class="no-data" v-if="totalCount==0">没有数据</div>
    </div>
    <div class="boundary"></div>
    <footer class="footer">
      <div class="reply_form">
        <input class="reply_input" :class="{focus_input: isFocus}" @focus="isFocus = true"
               @blur="isFocus = false"
               v-model="commentData.Content" type="text"
               placeholder="说点什么吧...">
        <a v-if="isFocus" class="reply_btn" @click="replyComment">评价</a>
        <template v-else>
          <div class="dian_zan" @click="thumbUp">
            <img v-if="!articleDetails.IsThumbsUp" class="dian_zan_img" src="../assets/Photowall-detail-dianzan@2x.png">
            <img v-else class="dian_zan_img" src="../assets/Photowall-detail-dianzan-actived@2x.png" alt="">
            <sup>{{articleDetails.ThumbsUpCount || 0}}</sup>
          </div>
          <div class="shou_cang">
            <img v-if="!articleDetails.IsFavoriteId" class="shou_cang_img" src="../assets/shoucang@2x.png"
                 @click="collectNews">
            <img v-else class="shou_cang_img" src="../assets/shoucang-active@2x.png" @click="cancelCollect">
          </div>
          <div class="fen_xiang">
            <img class="fen_xiang_img" src="../assets/fenxiang@2x.png" @click="toggleShowShare">
          </div>
        </template>
      </div>
    </footer>
    <transition name="fade">
      <div class="filter_layer" v-if="showShare" @click="toggleShowShare"></div>
    </transition>
    <transition name="slide-top">
      <div class="share_list" v-if="showShare">
        <div class="share_item" @click.prevent="share('weibo')">
          <a><img src="../assets/weibo.png" alt=""/></a>
          <p>新浪微博</p>
        </div>
        <!--<div class="share_item" @click.prevent="share('weixin')">
          <a><img src="../assets/weixin.png" alt=""/></a>
          <p>微信好友</p>
        </div>-->
        <div class="share_item" @click.prevent="share('qq')">
          <a><img src="../assets/qq.png" alt=""/></a>
          <p>QQ</p>
        </div>
        <div class="cancel_share" @click="toggleShowShare">取消</div>
      </div>
    </transition>
    <mt-popup class="comment_popup container_both" v-model="isShowMore" position="right" popup-transition="slide-left">
      <header-fix title="全部评价" fixed>
        <i slot="left" class="webapp webapp-left" @click="isShowMore = false"></i>
      </header-fix>
      <section class="container" v-infinite-scroll="getComments"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="commentLoading"
               infinite-scroll-distance="10">
        <comment-list :comment-list="commentList" @clickReply="openReply"></comment-list>
        <div class="no-data" v-if="noMoreData">没有更多数据啦</div>
        <div class="no-meet-data" v-if="noData">没有评价数据</div>
      </section>
      <footer class="footer">
        <div class="reply_form">
          <input class="reply_input" v-model="commentData.Content" type="text" placeholder="说点什么吧...">
          <a class="reply_btn" @click="replyComment">评价</a>
        </div>
      </footer>
    </mt-popup>
    <mt-popup class="reply_popup container_both" v-model="isShowReply" position="right" popup-transition="slide-left">
      <header-fix title="全部回复" fixed>
        <i slot="left" class="webapp webapp-left" @click="isShowReply = false"></i>
      </header-fix>
      <section class="container" v-infinite-scroll="getReplys"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="replyLoading"
               infinite-scroll-distance="10">
        <comment-list :comment-list="replyList" :is-reply="true"></comment-list>
        <div class="no-data" v-if="noMoreReplyData">没有更多数据啦</div>
        <div class="no-meet-data" v-if="noReplyData">没有回复数据</div>
      </section>
      <footer class="footer">
        <div class="reply_form">
          <input class="reply_input" v-model="commentData.Content" type="text" placeholder="说点什么吧...">
          <a class="reply_btn" @click="replyComment">回复</a>
        </div>
      </footer>
    </mt-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  // import wx from 'weixin-js-sdk';
  import { goBack } from '../service/mixins'
  import {
    FavoriteAdd,
    FavoriteDelete,
    EnumCommentList,
    EnumCommentReplyList,
    EnumCommentAdd,
    EnumThumbsUpCreate,
    GetArticleDetailMore,
    EnumThumbsUpCancle
    // GetWechatWxAuthModel
  } from '../service/getData'
  import Avatar from '../assets/hq-head-portrait@2x.png'
  import { Toast, Popup, MessageBox } from 'mint-ui'
  import { share } from '../plugins/utils'

  Vue.component(Popup.name, Popup)
  export default {
    mixins: [goBack],
    data () {
      return {
        Avatar,
        articleId: '',
        articleDetails: {
          ArticleName: '',
          AuthorName: '',
          Click: 0,
          Content: '',
          CreateDate: '',
          Source: '',
          IsCollection: 0,
          IsThumbsUp: false
        },
        showShare: false,
        link: window.location.href,
        showedCommentList: [],
        commentList: [],
        commentData: {
          Content: ''
        },
        noData: false,
        noMoreData: false,
        isShowMore: false,
        isShowReply: false,
        totalCount: 0,
        immediate: false,
        commentLoading: false,
        page: 1,
        replyList: [],
        noMoreReplyData: false,
        noReplyData: false,
        replyPage: 1,
        ParentId: '',
        replyLoading: false,
        attachList: [],
        isFocus: false,
        url: window.location.href
      }
    },
    computed: {
      ...mapState(['userAgent'])
    },
    created () {
      this.articleId = this.$route.query.id || ''
    },
    mounted () {
      this.getArticleDetail()
      /* if (this.userAgent.weixin && this.isAllowWeiXin) {
        this.getWechatWxAuthModel();
      } */
      this.getComments()
    },
    methods: {
      // 文章内容
      async getArticleDetail () {
        let res = await GetArticleDetailMore({ Id: this.articleId })
        this.articleDetails = { ...this.articleDetails, ...res.Data }
        this.content = res.Data.Content
        if (res.Data.AttachmentName) {
          this.attachList = [
            {
              Id: 1,
              Name: res.Data.AttachmentName,
              Url: res.Data.AttachmentUrl,
              Size: '未知'
            }]
        }
        /* if (this.userAgent.weixin && this.isAllowWeiXin) {
          this.checkWxjsaApi();
        } */
      },
      // 点赞
      async thumbUp () {
        let res
        if (this.articleDetails.IsThumbsUp) {
          res = await EnumThumbsUpCancle({ MainId: this.articleId, Type: 'Article' })
        } else {
          res = await EnumThumbsUpCreate({ MainId: this.articleId, Type: 'Article' })
        }
        Toast({ message: res.Message, position: 'bottom' })
        if (res.IsSuccess) {
          this.getArticleDetail()
        }
      },
      // 收藏
      async collectNews () {
        let res = await FavoriteAdd({ MainId: this.articleId, Type: 1 })
        Toast({ message: res.Message, position: 'bottom' })
        if (res.IsSuccess) {
          this.getArticleDetail()
        }
      },
      // 取消收藏
      async cancelCollect () {
        let res = await FavoriteDelete({ Id: this.articleDetails.FavoriteId })
        Toast({ message: res.Message, position: 'bottom' })
        if (res.IsSuccess) {
          this.getArticleDetail()
        }
      },
      /* 微信签名 */
      /* async getWechatWxAuthModel() {
        let res = await GetWechatWxAuthModel({Url: this.url});
        if (res.IsSuccess) {
          wx.config({
            debug: false,
            appId: 'wxf24d72db02fede73',// 必填，公众号的唯一标识
            timestamp: res.Data.Timestamp,// 必填，生成签名的时间戳
            nonceStr: res.Data.Nonce,// 必填，生成签名的随机串
            signature: res.Data.Signature,// 必填，签名
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']// 必填，需要使用的JS接口列表
          });
        } else if (res.Type != 401) {
          MessageBox('警告', res.Message);
        }
      }, */
      /* checkWxjsaApi() {
        let t = this;
        let shareData = {
          title: t.articleDetails.Name, // 分享标题
          desc: t.articleDetails.Name, // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function() {
            // 用户确认分享后执行的回调函数
            console.log('success');
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            console.log('cancel');
          }
        };
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });
          /!*朋友圈*!/
          wx.onMenuShareTimeline({
            title: t.articleDetails.Name, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            success: function() {
              // 用户确认分享后执行的回调函数
              console.log('success');
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
              console.log('cancel');
            }
          });
          /!*朋友*!/
          wx.onMenuShareAppMessage(shareData);
          /!*QQ*!/
          wx.onMenuShareQQ(shareData);
          /!*腾讯微博*!/
          wx.onMenuShareWeibo(shareData);
          /!*QQ空间*!/
          wx.onMenuShareQZone(shareData);
        });
      }, */
      /* 分享新浪微博 */
      share (type) {
        const options = {
          url: encodeURIComponent(document.location), // 参数url设置分享的内容链接|默认当前页location，可选参数
          title: encodeURIComponent(this.articleDetails.Name || document.title), // 参数title设置分享的标题|默认当前页标题，可选参数
          source: encodeURIComponent(this.articleDetails.Link),
          description: encodeURIComponent(this.articleDetails.Name),
          encode: 'utf-8', // 设置页面编码gb2312|utf-8，可选参数
          img: encodeURIComponent(''), // 参数pic设置图片链接|默认为空，可选参数
          origin: '',
          summary: encodeURIComponent(this.articleDetails.Name)
        }
        let _shareUrl = share({ ...options, type })
        window.open(_shareUrl, '_blank', 'width=' + +',height=' + +',top=' + +',left=' +
          +',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0')
      },
      toggleShowShare () {
        this.showShare = !this.showShare
      },
      async getComments () {
        if ((this.page > 1 && this.noMoreData) || this.commentLoading) {
          return
        }
        this.commentLoading = true
        let res = await EnumCommentList(
          { MainId: this.articleId, Page: this.page, Type: 'Article', Rows: 10, Sort: 'Id', Order: 'desc' })
        this.commentLoading = false
        if (res.IsSuccess) {
          this.totalCount = res.Data.TotalCount
          let list = res.Data.List
          if (this.page == 1) {
            this.showedCommentList = list.slice(0, 2)
          }
          if (this.page == 1 && list.length == 0) {
            this.noData = true
            return
          }
          if (this.page > 1 && list.length == 0) {
            this.noMoreData = true
            return
          }
          this.commentList = this.commentList.concat(list)
          this.page++
        }
      },
      async getReplys () {
        if ((this.replyPage > 1 && this.noMoreReplyData) || this.replyLoading) {
          return
        }
        this.replyLoading = true
        let res = await EnumCommentReplyList(
          {
            MainId: this.articleId,
            ParentId: this.ParentId,
            Page: this.replyPage,
            Type: 'Article',
            Rows: 10,
            Sort: 'Id',
            Order: 'desc'
          })
        this.replyLoading = false
        if (res.IsSuccess) {
          let list = res.Data.List
          if (this.replyPage == 1 && list.length == 0) {
            this.noReplyData = true
            return
          }
          if (this.replyPage > 1 && list.length == 0) {
            this.noMoreReplyData = true
            return
          }
          this.replyList = this.replyList.concat(list)
          this.replyPage++
        }
      },
      async replyComment () {
        let ParentId = null
        if (this.isShowReply || this.isShowMore) {
          ParentId = this.ParentId
        }
        let res = await EnumCommentAdd(
          { ...this.commentData, MainId: this.articleId, ParentId, Type: 'Article', ClassCode: 'Article' })
        if (res.IsSuccess) {
          this.commentData = { Content: '' }
          if (this.isShowReply) {
            this.replyPage = 1
            this.replyList = []
            this.noMoreReplyData = false
            this.noReplyData = false
            this.getReplys()
          }
          this.page = 1
          this.commentList = []
          this.noMoreData = false
          this.noData = false
          this.getComments()
        } else {
          MessageBox.alert(res.Message)
        }
      },
      toggleReadMore () {
        this.isShowMore = !this.isShowMore
      },
      openReply (item) {
        this.ParentId = item.Id
        this.isShowReply = true
      }
    },
    watch: {
      ParentId (val) {
        this.replyPage = 1
        this.replyList = []
        this.noMoreReplyData = false
        this.noReplyData = false
        this.getReplys()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .news_detail_page {
    background-color: $fill-base;

    & > .header {
      border-bottom: 1px solid $border-color-base;

      .header_left, .header_right {
        flex: 14;
      }

      .header_right {

      }
    }

    .container {
      padding: toRem(30px);

      .container_title {
        font-size: 16px;
      }

      .read_more {
        padding-top: toRem(30px);
        font-size: 14px;
        color: $brand-primary;
        text-align: center;
        line-height: toRem(30px);
      }

      .read_origin {
        display: block;
        padding: toRem(15px) 0;
        text-align: right;
        color: $brand-primary;
        font-size: toRem(30px);
      }
    }

    .article_details_title {
      color: $color-text-secondary;

      .detail_name {
        font-size: toRem(36px);
        font-weight: bold;
      }

      .detail_user {
        margin-top: toRem(20px);
        @include flex(flex-start);

        .user_photo {
          margin-right: toRem(20px);
          @include square(80px);
          border-radius: 50%;
        }

        & > div {
          @include flex(space-around);
          flex-direction: column;
          color: $color-text-thirdly;
        }

      }
    }

    .article_details_content {
      padding-top: toRem(20px);

      * {
        max-width: 10rem - toRem(60px) !important;
      }

      #datu {
        padding: 0 !important;
      }

      #slider-bg {
        margin: 0 !important;
      }
    }

    .article_footer {
      text-align: center;
      padding: toRem(80px) 0;

      .mint-button {
        height: toRem(60px);
      }

      .mint-button--normal, .mint-button--small {
        padding: 0 toRem(60px);
      }

      .mint-button:first-child {
        margin-right: toRem(70px);
      }

      .mint-button:last-child {
        margin-left: toRem(70px);
      }

      .webapp {
        color: $brand-primary;
        margin-right: toRem(5px);
      }
    }

    .share_list {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: $fill-body;
      z-index: 60;
      @extend %clearFix;

      .share_item {
        @extend %pull-left;
        padding: toRem(24px) 0 toRem(10px) toRem(24px);
        width: toRem(156px);
        text-align: center;

        p {
          line-height: toRem(50px);
        }
      }

      img {
        width: toRem(108px);
      }

      .cancel_share {
        background-color: $fill-base;
        text-align: center;
        line-height: toRem(94px);
        color: $brand-primary;
        @extend %pull-left;
        width: 100%;
      }
    }

    .reply_form {
      padding: 0 toRem(30px);
      width: 100%;
      height: toRem(105px);
      background-color: #fff;
      @include flex();
      align-items: center;

      .reply_input {
        padding: 0 toRem(20px);
        width: toRem(600px);
        height: toRem(70px);
        border: 1px solid $border-color-base;
        border-radius: toRem(35px);
      }

      .reply_btn {
        color: $color-text-thirdly;
        font-size: 14px
      }
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: toRem(105px);
      border-top: 1px solid $border-color-base;
    }

    .comment_popup, .reply_popup {
      width: 100%;
      height: 100vh;

      .header {
        border-bottom: 1px solid $border-color-base;
      }

      .container {
        padding: 0;
        background-color: $fill-body;
        height: 100%;
        overflow-y: scroll;

        .comment_item {
          padding: toRem(30px) toRem(30px) 0 toRem(30px);
        }
      }
    }

    & > .footer > .reply_form {
      @include flex(flex-start);
      align-items: center;

      .dian_zan {
        margin-right: toRem(30px);
      }

      sup {
        color: $brand-primary;
      }

      .dian_zan_img {
        width: toRem(42px);
      }

      .shou_cang {
        margin-right: toRem(40px);
      }

      .shou_cang_img {
        width: toRem(43px);
        height: toRem(41px);
      }

      .fen_xiang_img {
        width: toRem(39px);
      }

      & > .reply_input {
        margin-right: toRem(60px);
        width: toRem(400px);

        &.focus_input {
          margin-right: toRem(20px);
          width: toRem(600px);
        }
      }
    }
  }
</style>
