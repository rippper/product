/**
* 考试结果
*/
<template>
  <div class="exam_result container_top">
    <!--头部-->
    <header-fix title="我的考试" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="result_top">
      <div class="result_title">
        关于2018年度法律法规知识竞赛
      </div>
      <!-- <div class="result_icon" v-if="result.PassFlag"><i class="webapp webapp-smile"></i><span>恭喜您！</span></div>
      <div class="result_icon" v-if="!result.PassFlag"><i class="webapp webapp-cry"></i><span>很遗憾！</span></div> -->
      <div class="result_top_con">
        <p class="get_score">{{result.Score}}</p>
        <div class="result_text">
          {{result.Score >= result.Exam.PassingScore ? '恭喜您,通过考试' : '很遗憾,您未通过考试'}}
        </div>
      </div>
    </div>
    <div class="result_info">
      <ul>
        <li>
          <p>答题用时</p>
          <p>{{parseInt(result.usedTime / 1000) | formatTime}}分钟</p>
        </li>
        <li>
          <p>合格/总分</p>
          <p>{{result.Exam.PassingScore}}/{{result.Exam.TotalScore}}分</p>
        </li>
        <li>
          <p>剩余可考</p>
          <p>{{result.Exam.TriesLimit - result.LattemptNumber}}</p>
        </li>
      </ul>
    </div>
    <div class="result_body">
      <!-- <p><span>用时：</span><span class="pull-right">{{parseInt(result.usedTime / 1000) | formatTime}}</span></p>
      <p><span>总题数：</span><span class="pull-right">{{result.TotalCount}}题</span></p>
      <p><span>正确：</span><span class="pull-right">{{result.RightCount}}题</span></p>
      <p><span>错误：</span><span class="pull-right">{{result.TotalCount - result.RightCount}}题</span></p> -->
      <!-- 单项选择题 -->
      <div class="result_body_unit" v-if="judgeQues">
        <div class="title">
          选择题得分{{score1}},共{{scoreList1.length}}道,对了{{trueNum1}}道,错了{{scoreList1.length - trueNum1}}道
        </div>
        <div class="detail">
          <ul>
            <li v-for="(item,index) in scoreList1" :key="index" :class="{true:item!=0,false:item==0}">
              {{index+1}}
            </li>
          </ul>
        </div>
      </div>
      <!-- 多项选择题 -->
      <div class="result_body_mcq" v-if="moreQues">
        <div class="title">
          多选题得分{{score2}},共{{scoreList2.length}}道,对了{{trueNum2}}道,错了{{scoreList2.length - trueNum2}}道
        </div>
        <div class="detail">
          <ul>
            <li v-for="(item,index) in scoreList2" :key="index" :class="{true:item!=0,false:item==0}">
              {{index+1}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="result_footer">
      <mt-button class="rank" type="default" @click.native="rank">排行榜</mt-button>
      <mt-button class="oneMore" type="default" @click.native="oneMore">再考一次</mt-button>
      <mt-button class="check_answer" type="default" @click.native="checkAnswer">查看答案</mt-button>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { headerFix } from '../components'

  Vue.component(Button.name, Button)

  export default {
    mixins: [goBack],
    data () {
      return {
        result: null,
        scoreList1: [], // 单选题-判断题得分情况列表
        scoreList2: [], // 多选题得分情况列表
        trueNum1: 0, // 单选题正确数
        trueNum2: 0, // 多选题正确数
        judgeQues: false,
        moreQues: false,
        score1: 0, // 单选题得分
        score2: 0, // 多选题得分
        answerData: ''
      }
    },
    components: {
      headerFix
    },
    created () {
      this.answerData = this.$route.query.data
      this.result = JSON.parse(this.$route.query.data)
      console.log(this.result)
    },
    mounted () {
      let Type0Questions = this.result.Type0Questions // 判断题列表
      let Type1Questions = this.result.Type1Questions // 单选题列表
      let Type2Questions = this.result.Type2Questions // 多选题列表
      for (let i = 0; i < Type0Questions.length; i++) {
        this.scoreList1.push(Type0Questions[i].UserScore)
      }

      for (let i = 0; i < Type1Questions.length; i++) {
        this.scoreList1.push(Type1Questions[i].UserScore)
      }
      for (let i = 0; i < Type2Questions.length; i++) {
        this.scoreList2.push(Type2Questions[i].UserScore)
      }

      //  判断单选题-判断  多选题答案列表的显示隐藏
      if (this.scoreList1.length == 0) {
        this.judgeQues = false
      } else {
        this.judgeQues = true
      }

      if (this.scoreList2.length == 0) {
        this.moreQues = false
      } else {
        this.moreQues = true
      }

      // 根据得分列表计算正确题目数量和该题目类型得分
      for (let i = 0; i < this.scoreList1.length; i++) {
        if (this.scoreList1[i] != 0) {
          this.score1 += this.scoreList1[i]
          this.trueNum1 += 1
        }
      }

      for (let i = 0; i < this.scoreList2.length; i++) {
        if (this.scoreList2[i] != 0) {
          this.score2 += this.scoreList2[i]
          this.trueNum2 += 1
        }
      }
    },
    methods: {
      back () {
        this.$router.push('/examCenter')
      },
      oneMore () {
        this.$router.push({ path: 'exam', query: { id: this.result.examId } })
      },
      rank () {
        this.$router.push({ path: '/examRank', query: { id: this.result.examId } })
      },
      checkAnswer () {
        this.$router.push({ path: 'examAnswer', query: { id: this.result.examId, data: this.answerData } })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_result {
    background: #fff;
    width: 100vw;
    height: 100vh;

    .result_top {
      background: url(../assets/information@2x.png) no-repeat;
      background-size: 100% toRem(370px);
      text-align: center;

      .result_title {
        text-align: center;
        color: #fff;
        font-size: 14px;
        padding: toRem(48px) 0;
      }

      .result_top_con {
        background: #fff url(../assets/bannert@2x.png) no-repeat;
        background-position: center toRem(30px);
        background-size: toRem(517px) toRem(420px);
        width: toRem(690px);
        border-radius: toRem(10px);
        height: toRem(470px);
        margin: 0 auto;

        .get_score {
          @include ht-lineHt(60px);
          font-size: 32px;
          padding-top: toRem(140px);
          color: #d33528;
          font-weight: bold;
        }

        .result_text {
          color: #fff;
          text-align: center;
          font-size: 14px;
          margin-top: toRem(165px);
        }
      }
    }

    .result_info {
      width: toRem(690px);
      margin: 0 auto;
      height: toRem(130px);
      background: #f5f5f5;

      ul {
        display: flex;

        li {
          flex: 1;
          text-align: center;

          p {
            &:nth-child(1) {
              color: #999;
              font-size: 16px;
              @include ht-lineHt(50px);
              padding-top: toRem(15px);
            }

            &:nth-child(2) {
              color: #333;
              font-size: 16px;
              @include ht-lineHt(50px);
              padding-top: toRem(15px);
            }
          }

        }
      }
    }

    .result_body_unit, .result_body_mcq {
      background-color: $fill-base;
      font-size: 16px;
      margin-top: toRem(30px);
      padding: 0 toRem(30px);

      .title {
        border-left: toRem(6px) solid #dd2c1c;
        text-indent: toRem(23px);
        color: #999;
      }

      .detail {
        margin-top: toRem(30px);

        ul {
          @extend %clearFix;
          margin-right: toRem(-19px);

          li {
            @extend %pull-left;
            width: toRem(70px);
            text-align: center;
            @include ht-lineHt(70px);
            margin-right: toRem(19px);
            margin-bottom: toRem(15px);
          }

          .true {
            background: url(../assets/true@2x.png) no-repeat;
            background-size: toRem(70px) toRem(70px);
            color: #0dc57e;
          }

          .false {
            background: url(../assets/false@2x.png) no-repeat;
            background-size: toRem(70px) toRem(70px);
            color: #dd2c1c;
          }
        }
      }
    }

    .result_footer {
      margin-top: toRem(82px);
      @extend %clearFix;

      .rank {
        @extend %pull-left;
        @include wh(250px, 100px);
        border-radius: 0px;
        background: #fff;
        color: #999;
      }

      .oneMore {
        @extend %pull-left;
        @include wh(250px, 100px);
        background: #fd951f;
        border-radius: 0px;
        color: #fff;
      }

      .check_answer {
        @extend %pull-left;
        @include wh(250px, 100px);
        border-radius: 0px;
        background: #dd2c1c;
        color: #fff;
      }
    }

    .webapp-smile {
      color: $brand-success;
    }

    .webapp-cry {
      color: $brand-error;
    }
  }
</style>
