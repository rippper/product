<template>
  <ul class="interview_list_component">
    <li class="interview_item" v-for="(item,index) in interviewList" :key="item.Id" @click="changeRouter(item)">
      <div class="item_index">{{index>9?(index+1):('0'+(index+1))}}</div>
      <div class="interview_info">
        <h2 class="interview_title">{{item.Title}}</h2>
        <p class="interview_time">
          <img src="../assets/hq-interview-time@2x.png" alt="">
          <span>{{item.InterviewDateStart | dateFilter('yyyy-MM-dd')}} ~ {{item.InterviewDateEnd | dateFilter('yyyy-MM-dd')}}</span>
        </p>
        <p class="interview_user_count">
          <img src="../assets/hq-interview-crowd@2x.png" alt="">
          <span>{{item.InterviewCount}}人</span>
        </p>
      </div>
      <div v-if="isRelated" class="interview_status">
        <div class="interview_status_text">
          <span v-if="item.Status == 2">待编辑</span>
          <span v-else>已提交</span>
        </div>
      </div>
      <div v-else class="interview_operate">
        <mt-button v-if="item.Status == 2" class="submit_now">立即发布</mt-button>
        <mt-button v-else class="submit_now">查看详情</mt-button>
      </div>
    </li>
  </ul>
</template>

<script>

  export default {
    props: {
      interviewList: {
        type: Array
      },
      isRelated: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      changeRouter (item) {
        if (item.Status == 1) {
          this.$router.push({ name: 'interviewDetail', query: { Id: item.Id } })
        } else {
          this.$router.push({ name: 'addInterview', query: { Id: item.Id } })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .interview_list_component {

    .interview_item {
      background-color: #fff;
      margin-bottom: toRem(20px);
      padding: toRem(20px) toRem(30px);
      @include flex(flex-start);

      .item_index {
        flex: 1;
        font-size: toRem(30px);
        color: $brand-primary;
        font-weight: bold;
        line-height: 1.5;
      }

      .interview_info {
        flex: 10;

        .interview_title {
          font-size: toRem(30px);
          line-height: 1.5;
        }

        .interview_time {
          margin-top: toRem(20px);
          color: $color-text-secondary;
          @include flex(flex-start);
          align-items: center;

          img {
            margin-right: toRem(20px);
            @include square(24px);
          }
        }

        .interview_user_count {
          margin-top: toRem(20px);
          color: $color-text-secondary;
          @include flex(flex-start);
          align-items: center;

          img {
            margin-right: toRem(20px);
            width: toRem(25px);
            height: toRem(20px);
          }
        }
      }

      .interview_status {
        flex: 3;
        text-align: right;

        .interview_status_text {
          display: inline-block;
          background: url("../assets/hq-interview-state-edited@2x.png") no-repeat;
          background-size: toRem(111px) toRem(41px);
          width: toRem(111px);
          height: toRem(41px);
          text-align: left;

          span {
            display: inline-block;
            width: toRem(100px);
            text-align: center;
            line-height: toRem(41px);
            color: #fff;
          }
        }
      }

      .interview_operate {
        flex: 3;
        align-self: center;

        .mint-button {
          padding: 0;
          font-size: 12px;
          width: toRem(130px);
          height: toRem(55px);
          color: #fff;
          background-color: #fc971e;
          border-radius: toRem(28px);
        }
      }
    }
  }
</style>
