/**
* 考试列表
*/
<template>
  <div class="my_exam_list">
    <div class="exam_item" v-for="item in examData"
         :key="item.ExamId"
         @click.stop="checkAttempt1(item)"
    >
      <!-- @click.stop="checkAttempt1(item.ExamId)" -->
      <!--  -->
      <div class="exam_desc">
        <div class="exam_name">
          <p class="exam_name1">
            <span v-if="item.Status == 'UnFinish' && new Date(item.EndTime).getTime() > new Date().getTime()">未完成</span>
            <span v-if="item.Status == 'UnJoin' && new Date(item.EndTime).getTime() > new Date().getTime()">未考</span>
            <span v-if="item.Status == 'Finish' && new Date(item.EndTime).getTime() > new Date().getTime()">已完成</span>
            <span v-if="new Date(item.EndTime).getTime() < new Date().getTime() ">已结束</span>
          </p>
          <p class="exam_name2">{{item.ExamTitle}}</p>
        </div>
        <div class="exam_date">
          <div class="exam_date_date">
            考试截止时间：{{item.EndTime | dateFilter('yyyy.MM.dd')}}
          </div>
          <div class="exam_date_num">
            110人参与
          </div>
        </div>
      </div>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import { MessageBox, Toast } from 'mint-ui'

  export default {
    data () {
      return {
        message: ''
      }
    },
    props: {
      examData: Array,
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      }
    },
    created () {
    },
    methods: {
      checkAttempt1 (item) {
        let examId = item.ExamId
        let params = JSON.stringify(item)
        this.$router.push({ path: '/examInformation', query: { id: examId, data: params } })
      },
      checkAttempt (id, total, current, endTime) {
        var dateEnd = new Date(endTime).getTime()
        var dateNow = new Date().getTime()
        if (total > 0) {
          if (dateNow < dateEnd) {
            if (current < total) {
              let count = total - current
              MessageBox.confirm(`当前考试剩余${count}次考试机会，是否继续考试`).then(action => {
                this.$router.push({ path: '/exam', query: { id } })
              })
            } else {
              this.message = '考试次数已用完'
              Toast({ message: this.message, position: 'bottom' })
            }
          } else {
            this.message = '考试截止时间已过'
            Toast({ message: this.message, position: 'bottom' })
          }
        } else {
          MessageBox.confirm(`是否进入考试信息页面`).then(action => {
            this.$router.push({ path: '/examInformation', query: { id } })
            // this.$router.push({path: '/exam', query: {id}});
          })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .my_exam_list {
    .exam_item {
      background-color: $fill-base;
      padding: toRem(20px) toRem(30px);
      border-bottom: 1px solid $border-color-base;
      @extend %clearFix;
    }

    .exam_img {
      @extend %pull-left;
      width: toRem(90px);

      img {
        @include square(56px);
      }
    }

    .exam_desc {
      @extend %pull-left;
      width: 100%;
    }

    .exam_name {
      @extend %clearFix;

      .exam_name1 {
        @extend %pull-left;
        width: toRem(90px);
        height: toRem(40px);
        line-height: toRem(40px);
        text-align: center;
        color: #fff;
        background: #fd961f;
      }

      .exam_name2 {
        @extend %pull-left;
        margin-left: toRem(15px);
        @include ellipsis_two(2);
        font-size: 14px;
        font-weight: 500;
        color: $color-text-base;
      }

    }

    .exam_date {
      color: $color-text-secondary;
      line-height: toRem(64px);
      @extend %clearFix;
      .exam_date_date{
        @extend %pull-left;
      }
      .exam_date_num{
        @extend %pull-right;
      }
    }

    .exam_num {
      color: $color-text-secondary;
      line-height: toRem(44px);

      .exam_tip_num {

      }

      .highlight {

      }
    }

    .bottom {
      color: $color-text-thirdly;
      line-height: toRem(44px);
      font-size: 12px;
      margin-top: toRem(10px);

      .exam_time {

      }

      .below {
        color: $brand-error;
      }

      .green {
        color: $brand-success;
      }
    }
  }
</style>
