<template>
    <div class="examresult">
        <header-fix :backType="true" :absolute="true">
            <i class="examR_goBack" slot="left"></i>
        </header-fix>
        <div class="exam_result_topBackground">
            <div class="exam_result_msgBox">
                <div class="exam_result_pic">
                    <p class="exam_result_score" v-text="score"></p>
                </div>
                <div class="exam_result_words">
                    <ul>
                        <li>
                            <p class="exam_result_message">答题用时</p>
                            <p class="exam_result_msgreturn" v-text="spendTime"></p>
                        </li>
                        <li>
                            <p class="exam_result_message">合格分数</p>
                            <p class="exam_result_msgreturn" v-text="passScore"></p>
                        </li>
                        <li>
                            <p class="exam_result_message">剩余机会</p>
                            <p class="exam_result_msgreturn" v-text="chanse"></p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="exam_result_list">
                <exam-result-table></exam-result-table>
                <exam-result-table></exam-result-table>
                <exam-result-table></exam-result-table>
            </div>
        </div>
        <div class="exam_result_selectbotton">
            <div class="exam_onemore">
                再考一次
            </div>
            <div class="exam_watchanswer">
                查看答案
            </div>
        </div>
    </div>
</template>

<script>
import { headerFix, examResultTable } from '../components'
export default {
    name: 'examResult',
    data () {
        return {
            Value: this.$route.Value,
            ExamId: this.$route.Id,
            score: 50,
            spendTime: '6:00',
            passScore: 130,
            chanse: 5
        }
    },
    methods: {

    },
    components: {
        headerFix,
        examResultTable
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .examresult{
        padding-top: toRem(92px);
        position: relative;
        background: url('../assets/exam-result-background.png') no-repeat;
        background-color: #fff;
        background-size: 100%;
        .examR_goBack{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: toRem(24px);
            height: toRem(42px);
            background: url('../assets/arti-rebackblank.png');
            background-size: 100%;
        }
        .exam_result_topBackground{
            padding-bottom: toRem(98px);
            .exam_result_msgBox{
                width: toRem(690px);
                height: toRem(337px);
                background: #fff;
                border-radius: toRem(15px);
                margin: toRem(90px) auto 0;
                box-shadow: 0 0 toRem(20px) #233;
                .exam_result_pic{
                    width: toRem(320px);
                    height: toRem(247px);
                    background: url('../assets/test_result.png') no-repeat;
                    background-size: 100%;
                    margin: 0 auto;
                    padding-top: toRem(80px);
                    position: relative;
                    top: toRem(-100px);
                    position: relative;
                    left: toRem(-12px);
                    .exam_result_score{
                        color: #fff;
                        text-align: center;
                        font-size: toRem(70px);
                        position: relative;
                        left: toRem(15px);
                    }
                }
                .exam_result_words{
                    ul{
                        display: flex;
                        justify-content: space-between;
                        margin-top: toRem(-30px);
                        li{
                            width: 33%;
                            p{
                                text-align: center;
                            }
                            .exam_result_message{
                                font-size: toRem(25px);
                                color: #888;
                            }
                            .exam_result_msgreturn{
                                margin-top: toRem(10px);
                                font-size: toRem(35px);
                                font-weight: bold;
                                color: #233;
                            }
                            
                        }
                    }
                }
            }
            .exam_result_list{
                width: toRem(690px);
                margin: toRem(20px) auto 0;
            }
        }
        .exam_result_selectbotton{
            width: 100%;
            height: toRem(98px);
            line-height: toRem(98px);
            position: fixed;
            bottom: 0;
            left: 0;
            background: #fff;
            display: flex;
            justify-content: space-between;
            .exam_onemore{
                width:50%;
                text-align: center;
                font-size: toRem(30px);
            }
            .exam_watchanswer{
                width: 50%;
                color: #fff;
                text-align: center;
                background: #4374fd;
                font-size: toRem(30px);
            }
        }
    }
</style>
