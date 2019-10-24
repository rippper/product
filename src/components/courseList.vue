/**
* 课程列表
*/
<template>
  <div class="course_list">
    <div class="course_item" v-for="(item,index) in courseData" :key="index"
         @click.stop="toPlay(item.CourseType,item.CourseId)">
      <div class="course_img">
        <a class="img">
          <img v-lazy="item.CourseImg">
          <!--<error-img :src="item.CourseImg" :error-src="noCourse"></error-img>-->
        </a>
        <img v-if="item.CourseType=='JYAicc'" class="tip" src="../assets/jingpin.png" alt=""/>
        <img v-if="item.CourseType=='Mp4'" class="tip" src="../assets/MP4.png" alt=""/>
        <img v-if="item.CourseType=='h5'" class="tip" src="../assets/H5.png" alt=""/>
      </div>
      <div class="course_desc">
        <div class="course_name">{{item.CourseName}}</div>
        <div class="course_tt">
          <div class="course_teacher">讲师：{{item.TeacherName || '无'}}</div>
          <div class="course_time">时长：{{timeFormat(item.Duration*60) || '无'}}</div>
        </div>
        <div class="course_bottom">
          <span class="course_bottom_time">{{item.CreateDate | dateFilter('yyyy.MM.dd')}}</span>
          <span class="course_bottom_score highlight">{{item.Credit}}学分</span>
          <!-- <span v-if="!myCourse" class="choose_status"
                :class="item.SelectFlag=='已选'&&'course_selected'">{{item.SelectFlag}}</span>
          <span v-if="myCourse" class="progress">进度：{{parseInt(item.BrowseScore)}}%</span> -->
        </div>
      </div>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Lazyload } from 'mint-ui'
  import noCourse from '../assets/noCourse.png'
  import { toPlay } from '../service/mixins'
  import { timeFormat } from '../plugins/utils'

  Vue.use(Lazyload, {
    error: noCourse
  })

  export default {
    mixins: [toPlay],
    data () {
      return {
        noCourse
      }
    },
    props: {
      courseData: Array,
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      },
      myCourse: Boolean
    },
    methods: {
      timeFormat (num) {
        if (!num) return num
        if (typeof num == 'string') num = Number(num)
        let str = timeFormat(num)
        let arr = str.split('')
        arr.splice(2, 0, ':')
        arr.splice(5, 0, ':')
        str = arr.join('')
        return str
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .course_list {
    .course_item {
      padding: toRem(20px) toRem(30px);
      @extend %clearFix;
      background-color: $fill-base;
      border-bottom: 1px solid $border-color-base;
    }

    .course_img {
      @extend %pull-left;
      position: relative;
      width: toRem(258px);

      .img {
        img {
          width: 100%;
          height: toRem(146px);
        }
      }

      .tip {
        position: absolute;
        right: toRem(5px);
        top: toRem(5px);
        @include wh(57px, 27px);
        @include borderRadius(5px);
      }
    }

    .course_desc {
      @extend %pull-left;
      width: toRem(415px);
      padding-left: toRem(15px);
      position: relative;
      height: toRem(146px);
    }

    .course_tt {
      @extend %clearFix;

      .course_teacher {
        @extend %pull-left;
        color: $color-text-secondary;
        line-height: toRem(40px);
      }

      .course_time {
        @extend %pull-right;
        color: $color-text-secondary;
        line-height: toRem(40px);
      }
    }

    .course_name {
      @include ellipsis_two(1);
      height: toRem(40px);
      font-size: 16px;
      font-weight: 500;
      color: $color-text-base;
    }

    .course_bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: toRem(16px);
      line-height: toRem(16px);
      @extend %clearFix;

      .course_bottom_time {
        @extend %pull-left;
        display: block;
      }

      .course_bottom_score {
        display: block;
        @extend %pull-right;
      }
    }

    .choose_status {
      @extend %pull-right;
      @include wh(64px, 36px);
      background-color: $color-icon-base;
      color: $color-text-reverse;
      text-align: center;
      @include borderRadius(5px);
    }

    .course_selected {
      background-color: $brand-success;
    }

    .progress {
      @extend %pull-right;
      color: $color-text-base;
    }
  }
</style>
