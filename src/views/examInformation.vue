/**
* 考试中心
*/
<template>
  <div class="examInformation container_both">
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="ef-con">
      <div class="title">
        {{examInfoList.ExamTitle}}
      </div>
      <div class="ef-con1">
        <div class="score">
          <ul>
            <li>
              <img src="../assets/100@2x.png" alt="">
              <div class="text">
                <p class="text-p1">试卷总分</p>
                <p class="text-p2">{{examInfoList.TotalScore}}分</p>
              </div>
            </li>
            <li>
              <img src="../assets/60@2x.png" alt="">
              <div class="text">
                <p class="text-p1">及格分数</p>
                <p class="text-p2">{{examInfoList.PassingScore}}分</p>
              </div>
            </li>
            <li>
              <img src="../assets/time@2x.png" alt="">
              <div class="text">
                <p class="text-p1">考试时长</p>
                <p class="text-p2">{{examInfoList.TimeLimit}}分钟</p>
              </div>
            </li>
            <li>
              <img src="../assets/Question type@2x.png" alt="">
              <div class="text">
                <p class="text-p1">题目总数</p>
                <p class="text-p2">{{examInfoList.ThemeCount}}题</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="history">
          <img src="../assets/hq-response-tips@2x.png" alt="">
          本期考试已考<span>{{examInfoList.LattemptNumber}}</span>次,还剩<span>{{count>=0?count:0}}</span>次机会,最高分<span>{{examInfoList.HighScore}}</span>分
        </div>
        <div class="time">
          <p class="time-title">考试时间</p>
          <p class="time-con">{{examInfoList.StartTime | dateFilter('yyyy年MM月dd号')}}-{{examInfoList.EndTime |
            dateFilter('yyyy年MM月dd号')}}</p>
        </div>
        <div class="explain">
          <p class="explain-title">考试说明</p>
          <p class="explain-con">{{examInfoList.Description||'暂无考试说明'}}</p>
        </div>
        <div class="begin"
             @click.stop="beginExam(examInfoList.ExamId,examInfoList.TriesLimit,examInfoList.LattemptNumber,examInfoList.EndTime)">
          开始考试
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox, Toast } from 'mint-ui'
  import { headerFix } from '../components'
  import { GetExam } from '../service/getData'
  import { goBack } from '../service/mixins'

  export default {
    mixins: [goBack],
    data () {
      return {
        examTitle: '在线考试',
        typeId: 0, // 考试typeId
        examInfoList: [],
        count: '',
        questionNum: ''
      }
    },
    created () {
      this.examId = this.$route.query.id
      this.startDate = new Date()
      this.examInfoList = JSON.parse(this.$route.query.data)
    },
    mounted () {
      this.getExamInfo()
    },
    components: {
      headerFix
      //   examList,
      //   mbTabItem,
      //   mbTab,
    },
    methods: {
      async getExamInfo () {
        let data = await GetExam({ Id: this.examId })
        if (data.IsSuccess) {
          this.examInfoList = data.Data
          this.count = data.Data.TriesLimit - data.Data.LattemptNumber
          this.questionNum = data.Data.ThemeInfoList.length
        }
      },
      beginExam (id, total, current, endTime) {
        var dateEnd = new Date(endTime).getTime()
        var dateNow = new Date().getTime()
        if (total > 0) {
          if (dateNow < dateEnd) {
            if (current < total) {
              let number = total - current
              MessageBox.confirm(`当前考试剩余${number}次考试机会，是否继续考试`).then(action => {
                this.$router.push({ path: '/exam', query: { id } })
                console.log(1)
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
          MessageBox.confirm(`是否进入考试页面`).then(action => {
            this.$router.push({ path: '/exam', query: { id } })
            console.log(2)
          })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .examInformation {
    width: 100vw;
    height: 100vh;
    background: #fff;

    .header {
      .header_left, .header_right {
        flex: toRem(200px);
      }
    }

    .ef-con {
      background: url(../assets/information@2x.png) no-repeat;
      background-size: 100% toRem(370px);

      .title {
        color: #fff;
        text-align: center;
        font-size: 14px;
        padding: toRem(48px) 0;
      }

      .ef-con1 {
        background: #fff;
        width: toRem(690px);
        border-radius: toRem(10px);
        margin: 0 auto;

        .score {
          width: toRem(600px);
          height: toRem(370px);
          margin: 0 auto;
          overflow: hidden;

          ul {
            @extend %clearFix;

            li {
              @extend %pull-left;
              height: toRem(187px);
              width: toRem(300px);
              border-left: 1px solid red; /*设置左边框*/
              border-bottom: 1px solid red; /*设置下边框*/
              margin-left: -1px;
              margin-bottom: -1px;
              @extend %clearFix;

              img {
                @extend %pull-left;
                width: toRem(61px);
                height: toRem(61px);

                margin-top: toRem(64px);
              }

              &:nth-child(2n) {
                img {
                  margin-left: toRem(70px);
                }
              }

              &:nth-child(2n-1) {
                img {
                  margin-left: toRem(20px);
                }
              }

              .text {
                @extend %pull-left;
                margin-left: toRem(40px);
                margin-top: toRem(60px);
                font-size: 14px;

                .text-p1 {
                  color: #999;
                }

                .text-p2 {
                  color: #000;
                  font-weight: bold;
                }
              }
            }
          }
        }

        .history {
          height: toRem(90px);
          line-height: toRem(90px);
          width: 100%;
          background: #fffaf4;
          color: #000;
          font-size: 12px;

          img {
            width: toRem(40px);
            height: toRem(40px);
            margin-left: toRem(39px);
            margin-right: toRem(20px)
          }

          span {
            color: #db1011;
            font-size: 16px;
            font-weight: bold;
          }
        }

        .time {
          margin-top: toRem(40px);

          .time-title {
            margin-left: toRem(30px);
            border-left: toRem(6px) solid #dd2c1c;
            color: #989898;
            text-indent: toRem(15px);
            height: toRem(28px);
            line-height: toRem(28px);
            font-size: 16px;
          }

          .time-con {
            margin-top: toRem(30px);
            text-indent: toRem(45px);
            font-size: 16px;
          }
        }

        .explain {
          margin-top: toRem(40px);

          .explain-title {
            margin-left: toRem(30px);
            border-left: toRem(6px) solid #dd2c1c;
            color: #989898;
            text-indent: toRem(15px);
            height: toRem(28px);
            line-height: toRem(28px);
            font-size: 16px;
          }

          .explain-con {
            margin-top: toRem(30px);
            text-indent: toRem(45px);
            font-size: 16px;
          }
        }

        .begin {
          margin-top: toRem(50px);
          color: #fff;
          width: 100%;
          height: toRem(70px);
          line-height: toRem(70px);
          text-align: center;
          background-image: linear-gradient(to right, #fb9f22, #dd1100);
          border-radius: toRem(50px);
          font-size: 16px;
        }
      }
    }
  }
</style>
