<template>
  <div class="examAnswer container_both">
    <!--头部-->
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="exam_answerList">
      <ul>
        <li v-for="(item,index) in exam" :key="index"
            :class="{
              true:item.Question.Answer == item.UserAnswer,
              false:item.Question.Answer != item.UserAnswer,
              true_selected:item.Question.Answer == item.UserAnswer && (index+1)==itemNum,
              false_selected:item.Question.Answer != item.UserAnswer && (index+1)==itemNum
              }"
            @click.stop="handle(index)"
        >
          {{index+1}}
        </li>
        <!-- <li class="true">1</li>
        <li class="true_selected">2</li>
        <li class="false">3</li>
        <li class="false_selected">4</li> -->
      </ul>
    </div>
    <div class="exam_content" v-for="(list,index) in exam" :key="index">
      <transition name="slide-left">
        <div v-if="itemNum == index + 1">
          <p class="exam_name">
            <span class="red" v-if="list.Question.Type == 'Judge'">【判断题】</span>
            <span class="red" v-else-if="list.Question.Type == 'Single'">【单选题】</span>
            <span class="red" v-else-if="list.Question.Type == 'More'">【多选题】</span>
            <!-- <span class="red" v-else-if="list.ThemeType==4">【简答题】</span> -->
            <span class="red" v-else>【其它】</span>
            <span class="topic_name">{{index + 1 + '.' + list.Question.Name}}</span>
            <span class="red">({{Number(list.Question.Score).toFixed(1)}}分)</span>
          </p>
          <div class="exam_answer">
            <p>正确答案:{{list.Question.Answer}}</p>
            <p>您的答案:{{list.UserAnswer}}</p>

          </div>
          <div class="exam_list">
            <div v-if="list.Question.Type== 'Judge'">
              <mb-radio :options="judgeItem" :value="list.Question.Answer" :is-disabled="true"></mb-radio>
            </div>
            <div v-else-if="list.Question.Type=='Single'">
              <mb-radio :options="list.Question.QuestionsItems" :value="list.Question.Answer"
                        :is-disabled="true"></mb-radio>
            </div>
            <div v-else-if="list.Question.Type== 'More'">
              <mb-checklist :options="list.Question.QuestionsItems" :value="list.Question.Answer"
                            :is-disabled="true"></mb-checklist>
            </div>
            <!-- <div v-else-if="list.ThemeType == 4">
              <textarea class="answerInput"
                        v-model="choosedItem[index]['Content']"
                        rows="15"
                        placeholder="在此处出入答案内容">
              </textarea>
            </div> -->
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { headerFix, mbChecklist, mbRadio } from '../components'
  import {} from '../service/getData'

  Vue.component(Button.name, Button)
  export default {
    mixins: [goBack],
    data () {
      return {
        exam: [],
        examTitle: '在线考试', // 标题
        examId: '',
        itemData: null, // 当前显示题目data
        judgeItem: [
          {
            ItemFlag: 'A',
            ItemTitle: '正确'
          },
          {
            ItemFlag: 'B',
            ItemTitle: '错误'
          }
        ], // 单选item
        itemNum: 1, // 第几题
        allItem: 0,
        userInfo: null,
        choosedItem: [],
        answerList: []
      }
    },
    created () {
      this.examId = this.$route.query.id
      this.result = JSON.parse(this.$route.query.data)
    },
    mounted () {
      let Type0Questions = this.result.Type0Questions // 判断题列表
      let Type1Questions = this.result.Type1Questions // 单选题列表
      let Type2Questions = this.result.Type2Questions // 多选题列表
      this.exam = Type0Questions.concat(Type1Questions, Type2Questions)
      // console.log(Type0Questions,this.exam)
      //   for (let i = 0; i < Type0Questions.length; i++) {
      //    this.scoreList1.push(Type0Questions[i].UserScore)
      //  };
      //   for (let i = 0; i < Type1Questions.length; i++) {
      //    this.scoreList1.push(Type1Questions[i].UserScore)
      //  };
      //  for (let i = 0; i < Type2Questions.length; i++) {
      //    this.scoreList2.push(Type2Questions[i].UserScore)
      //  };
    },
    props: [],
    components: {
      headerFix,
      mbChecklist,
      mbRadio
    },
    computed: {},
    methods: {
      handle (index) {
        this.itemNum = index + 1
      }
    },
    watch: {
      itemNum: function (val) {
        this.itemData = this.exam[val - 1]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .examAnswer {
    background-color: $fill-base;
    font-size: 15px;

    .exam_answerList {
      padding: 0 toRem(30px);
      background: #f6f6f6;

      ul {
        @extend %clearFix;
        margin-right: toRem(-19px);

        li {
          @extend %pull-left;
          width: toRem(70px);
          text-align: center;
          @include ht-lineHt(70px);
          margin: toRem(10px) toRem(19px) toRem(10px) 0;
        }

        .true {
          color: #0dc57e;
          background: url(../assets/true@2x.png) no-repeat;
          background-size: toRem(70px) toRem(70px);
        }

        .false {
          color: #dd2c1c;
          background: url(../assets/false@2x.png) no-repeat;
          background-size: toRem(70px) toRem(70px);
        }

        .true_selected {
          color: #fff;
          background: url(../assets/true-Selected@2x.png) no-repeat;
          background-size: toRem(70px) toRem(70px);
        }

        .false_selected {
          color: #fff;
          background: url(../assets/false-Selected@2x.png) no-repeat;
          background-size: toRem(70px) toRem(70px);
        }
      }
    }

    .exam_content {
      position: absolute;
      left: 0;
      right: 0;
      padding: 0 toRem(40px);

      .exam_name {
        padding: toRem(30px) 0 toRem(30px) 0;

        .red {
          color: $brand-primary;
        }
      }

      .exam_answer {
        padding: 0 0 toRem(30px) 0;
      }

      .topic_name {
        line-height: toRem(50px);
      }

      .exam_list {
        .answerInput {
          width: 100%;
          padding: toRem(10px);
          resize: none;
          border: 1px solid $border-color-base;
          @include borderRadius(10px);
          font-size: 14px;
        }
      }
    }
  }
</style>
