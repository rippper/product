/**
* 我的考试排行榜
*/
<template>
  <div class="exam_rank container_top">
    <!--头部-->
    <header-fix title="我的考试" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="exam_rank_top">
      <p>{{rankPlace}}</p>
    </div>
    <div class="exam_rank_body">
      <table>
        <thead class="exam_rank_body_title">
          <tr>
            <th class="title_rank">排名</th>
            <th class="title_name">姓名</th>
            <th class="title_credit">得分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in rankList" :key="index">
            <td class="rank">
              <template v-if="index+1 < 4">
                <img src="../assets/gold@2x.png" alt="" v-if="index+1 == 1">
                <img src="../assets/silver@2x.png" alt="" v-if="index+1 == 2">
                <img src="../assets/bronze@2x.png" alt="" v-if="index+1 == 3">
              </template>
              <span v-else>{{index+1}}</span>
            </td>
            <td class="name">
              <error-img :src="item.Avatar" :error-src="noImg" alt=""></error-img>
              <div class="text">
                <p class="text-name">{{item.UserName}}</p>
                <p class="text-party">{{item.GroupName}}</p>
              </div>
            </td>
            <td class="credit"><span>{{item.ExamScore}}</span>分</td>
          </tr>
          <!-- <tr>
              <td class="rank">1</td>
              <td class="name">
                  <img src="../assets/time@2x.png" alt="">
                  <div class="text">
                      <p class="text-name">李小萌</p>
                      <p class="text-party">党一支部第二小组</p>
                  </div>
              </td>
              <td class="credit"><span>91</span>分</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { headerFix } from '../components'
  import { GetExamUserRank } from '../service/getData'
  import { goBack } from '../service/mixins'
  import noImg from '../assets/hq-head-portrait@2x.png'

  export default {
    mixins: [goBack],
    data () {
      return {
        id: '',
        rankList: [],
        rankPlace: '',
        userName: '',
        noImg
      }
    },
    components: {
      headerFix
    },
    created () {
      this.id = this.$route.query.id
    },
    mounted () {
      this.getExamUserRank()
    },
    methods: {
      async getExamUserRank () {
        let data = await GetExamUserRank({ Id: this.id })
        if (data.Type == 1) {
          this.rankList = data.Data.ExamRank
          this.rankPlace = data.Data.MyRank
        }
      }

    },
    watch: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_rank {
    width: 100vw;
    height: 100vh;
    background: #fff;

    .exam_rank_top {
      width: 100%;
      height: toRem(520px);
      background: url(../assets/examRank@2x.png) no-repeat;
      background-size: toRem(750px) toRem(508px);

      p {
        font-size: 40px;
        padding-top: toRem(250px);
        color: #fff;
        text-align: center;
        font-weight: bold;
      }
    }

    .exam_rank_body {
      width: 100%;
      background: #fff;

      .exam_rank_body_title {
        @include ht-lineHt(70px);
        border-bottom: 1px solid #dddddd;
        font-size: 14px;
        color: #666;

        .title_rank {
          width: toRem(125px);
          text-align: center;
          font-size: 14px;
        }

        .title_name {
          width: toRem(485px);
          text-indent: toRem(40px);
        }

        .title_credit {
          width: toRem(140px);
          text-align: center;
        }
      }

      tr {
        td {
          height: toRem(150px);
        }

        .rank {
          width: toRem(125px);
          text-align: center;
          font-size: 14px;

          img {
            width: toRem(55px);
            height: toRem(63px);
          }
        }

        .name {
          width: toRem(485px);
          border-bottom: 1px solid #ddd;
          @extend %clearFix;

          img {
            @extend %pull-left;
            @include square(80px);
            border-radius: 50%
          }

          .text {
            @extend %pull-left;
            margin-left: toRem(20px);

            .text-name {
              font-size: 16px;
            }

            .text-party {
              margin-top: toRem(20px);
              color: #a0a0a0;
            }
          }
        }

        .credit {
          width: toRem(140px);
          border-bottom: 1px solid #ddd;
          text-align: center;

          span {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
