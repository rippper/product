/**
* 课程评论
*/
<template>
  <div class="evaluate">
    <div class="course_judge_tag" @click="openEvaluateModel">
      <p class="title">评价该课程</p>
      <p class="judge">
        <star v-model="commentCredit" disabled></star>
      </p>
    </div>
    <div class="split"></div>
    <div class="course_comment">
      <h1>评价详情 <span class="course_comment_count">（{{commentCount||0}}个评价）</span></h1>
      <section v-infinite-scroll="getCommentList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
        <div class="course_comment_item" v-for="(item) in commentList" :key="item.CommentId">
          <div class="left_avatar">
            <error-img :src="item.HeadImg" :error-src="male"></error-img>
          </div>
          <div class="right_content">
            <p class="name">
              <span>{{item.UserName}}</span>
              <star v-model="item.Score" size="small" disabled></star>
            </p>
            <p class="date">{{item.PostDate}}</p>
            <p class="content">{{item.Content}}</p>
          </div>
        </div>
        <div class="no-data">没有更多评价啦</div>
      </section>
    </div>
    <!--添加评论-->
    <mt-popup class="comment_popup" v-model="isShowModel">
      <div class="addEvaluate">
        <star v-model="addCourseData.Score" show-text></star>
        <textarea v-model="addCourseData.Content" type="text" placeholder="评论，100以内"></textarea>
        <a @click.prevent="addComment" class="submit">提交</a>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Toast, InfiniteScroll, Popup } from 'mint-ui'
  import { GetCourseCommentList, AddCourseComment } from '../service/getData'
  import male from '../assets/male.png'

  Vue.use(InfiniteScroll)
  Vue.component(Popup.name, Popup)
  export default {
    data () {
      return {
        male,
        isShowModel: false,
        noData: false,
        noMoreData: false,
        immediate: false,
        loading: false,
        page: 1,
        commentList: [],
        commentCount: 0,
        addCourseData: {
          CourseId: this.courseId,
          Content: '',
          Score: 4
        }
      }
    },
    props: ['courseId', 'commentCredit'],
    mounted () {
      this.getCommentList()
    },
    methods: {
      // 课程评论列表
      async getCommentList () {
        this.loading = true
        let res = await GetCourseCommentList({ courseId: this.courseId, Page: this.page })
        this.loading = false
        if (res.IsSuccess) {
          let list = res.Data.List || []
          this.commentCount = res.Data.TotalCount
          if (this.page == 1 && list.length == 0) {
            this.noData = true
            return
          }
          if (this.page > 1 && list.length == 0) {
            this.noMoreData = true
            return
          }
          this.commentList = this.commentList.concat(list)
          this.page += 1
        }
      },
      // 添加课程评论
      async addComment () {
        if (this.addCourseData.Content.length > 0 && this.addCourseData.Content.length <= 100) {
          let res = await AddCourseComment(this.addCourseData)
          if (res.IsSuccess) {
            this.page = 1
            this.noData = false
            this.commentList = []
            this.getCommentList()
            Toast({ message: res.Message, position: 'bottom' })
          } else {
            Toast({ message: res.Message, position: 'bottom' })
          }
          this.isShowModel = false
        } else {
          Toast({ message: '评论内容不能超过100字！', position: 'bottom' })
        }
      },
      openEvaluateModel () {
        this.isShowModel = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .evaluate {
    background-color: $fill-base;

    .course_judge_tag {
      .title {
        @include ht-lineHt(112px);
        text-align: center;
        font-size: 15px;
      }

      .judge {
        width: 4.146667rem;
        height: 0.4rem;
        /*background: url(../assets/bigStar.png) no-repeat 0 0;*/
        /*background-size: 4.146667rem 4.4rem;*/
        margin: 0 auto toRem(30px);
      }
    }

    .comment_popup {
      width: 7.2rem;
      border-radius: 0.2rem;
      padding: toRem(30px) 0;

      .addEvaluate {
        padding: toRem(20px) toRem(20px) 0 toRem(20px);
        text-align: center;
        position: relative;

        .rate_text {
          display: block;
          color: $color-text-base;
          margin-top: toRem(10px);
        }

        textarea {
          display: block;
          resize: none;
          width: 100%;
          height: toRem(225px);
          font-size: 13px;
          background: #f7f9fc;
          padding: toRem(10px);
        }

        .submit {
          display: block;
          width: toRem(480px);
          height: 1.4rem;
          line-height: 1.4rem;
          text-align: center;
          margin-top: toRem(12px);
          background-image: linear-gradient(to right, #fb9f22, #dd1100);
          border-radius: toRem(50px);
          color: #fff;
          font-size: 13px;
          position: absolute;
          left: toRem(30px);
          bottom: -1.2rem;
        }
      }
    }

    .course_comment {
      padding: 0 toRem(30px);

      h1 {
        font-size: 14px;
        line-height: toRem(60px);
      }

      .course_comment_count {
        color: $color-text-thirdly;
      }
    }

    .course_comment_item {
      @extend %clearFix;
      padding: toRem(20px) 0 toRem(30px);
      border-bottom: 1px solid $border-color-light;

      .left_avatar {
        @extend %pull-left;
        width: toRem(80px);

        img {
          width: toRem(65px);
        }
      }

      .right_content {
        @extend %pull-left;
        width: toRem(600px);

        .name {
          font-size: 14px;
          font-weight: 600;
        }

        .star_grade {
          @extend %pull-right;
        }

        .date {
          color: $color-text-thirdly;
          padding: toRem(10px) 0;
        }

        .content {
          color: $color-text-secondary;
        }
      }
    }

    .split {
      display: block;
      height: toRem(20px);
      background-color: $fill-body;
    }
  }
</style>
