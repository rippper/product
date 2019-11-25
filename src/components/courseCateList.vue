/**
* 课程目录列表
*/
<template>
  <div class="courseCatelist">
    <div class="course_item" >
         <ul>
            <li v-for="(item,index) in courseData" :key="index"
                @click.stop="toPlay(item.CourseType,item.CourseId)"
                :class="{'selected': item.isSelected}"
                >
              <p class="label">{{item.Name}}</p>
              <img src="../assets/play-white.png" alt="" v-if="item.isSelected">
              <img src="../assets/play-blue.png" alt="" v-else>
            </li>
          </ul>
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

  .courseCatelist {
    @extend %clearFix;
    background: #fff;
    .course_item {
      width: 100%;
        @extend %clearFix;
        margin-top: toRem(30px);
        ul{
          li{ 
              @extend %clearFix;
              line-height: toRem(80px);
              background: #f5f9ff;
              margin-top: toRem(20px);
              &.selected{
                background: #4374df;
                .label{
                  color: #fff;
                }
              }
              .label{
                margin-left: toRem(20px);
                float: left;
                color: #4a608c;
                @include ellipsis_two(1);
              }
              img{
                float: right;
                width: toRem(34px);
                height: toRem(34px);
                margin-top: toRem(23px);
                margin-right: toRem(20px);
              }
          }
        }
    }

    .course_img {
      position: relative;
      width: toRem(335px);
      .img {
        img {
          width: 100%;
          height: toRem(212px);
        }
      }
      .play-img{
        width: toRem(38px);
        height: toRem(39px);
        position: absolute;
        bottom: toRem(0px);
        right: toRem(10px);
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
      width: toRem(335px);
      position: relative;
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
      height: toRem(45px);
      font-size: 16px;
      font-weight: 500;
      color: $color-text-base;
      margin-top: toRem(10px);
    }
    .course_click{
      font-size: 14px;
      color: #a9bcc7;
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
