<template>
    <div class="examType" ref="examType">
        <header-fix :fixed="true" :theStyle="true">
            <i class="exam_ToBack" slot="left"></i>
        </header-fix>
        <div class="exam_TitleBox"></div>
        <div class="exam_TypeList">
            <ul>
                <li v-for="(item, index) in typeList" :key="index">
                    <div :class="{ 'exam_InnerBoxPurple':item.type == 1, 'exam_InnerBoxGreen':item.type == 2, 'exam_InnerBoxYellow':item.type == 3, 'exam_InnerBoxBlue':item.type == 4, 'exam_InnerBoxRed':item.type == 0 }">
                        <div class="exam_LeftFloatBox">
                            <div class="exam_LeftFloatCenter">
                                <span class="exam_LeftFloatIcon"></span>
                            </div>
                        </div>
                        <span class="exam_TypeName" v-text="item.Name"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { GetExamType } from '../service/getData'
import { headerFix } from '../components'
export default {
    name: 'examType',
    data () {
        return {
            screenWidth: '',
            screenHeight: '',
            typeList: []
        }
    },
    mounted () {
        this.calculate()
        window.addEventListener('resize', this.windowsChange)
        this.render()
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.windowsChange)
    },
    methods: {
        windowsChange () {
            return (() => {
                this.screenWidth = window.screen.width
                this.screenHeight = window.screen.height
            })()
        },
        calculate () {
            this.screenWidth = window.screen.width
            this.screenHeight = window.screen.height
            this.$refs.examType.style.height = this.screenHeight + 'px'
        },
        async render () {
            let msg = await GetExamType({})
            msg.forEach((item, index) => {
                item.type = (index + 1) % 5
            })
            this.typeList = msg
        }
    },
    watch: {
        screenHeight (news, oldvalue) {
            this.calculate()
        }
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .examType{
        height: 100%;
        padding-top: toRem(90px);
        display: flex;
        flex-direction: column;
        .exam_ToBack{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: toRem(24px);
            height: toRem(42px);
            background: url('../assets/arti-rebackblank.png');
            background-size: 100%;
        }
        .exam_TitleBox{
            height: toRem(208px);
            background: url('../assets/exam_titlebackground.png') no-repeat 0 toRem(-92px);
            background-size: 100% toRem(300px);
        }
        .exam_TypeList{
            flex: 1;
            overflow: auto;
            padding: toRem(30px) 0;

            background: #fff;
            ul{
                li{
                    position: relative;
                    height: toRem(226px);
                    padding: toRem(15px) 0;
                    .exam_InnerBoxPurple,
                    .exam_InnerBoxYellow,
                    .exam_InnerBoxBlue,
                    .exam_InnerBoxGreen,
                    .exam_InnerBoxRed{
                        width: toRem(612px);
                        height: toRem(196px);
                        line-height: toRem(196px);
                        position: absolute;
                        top: toRem(15px);
                        right: toRem(40px);
                        text-align: center;
                        .exam_LeftFloatBox{
                            width: toRem(156px);
                            height: toRem(156px);
                            position: absolute;
                            top: 50%;
                            left: toRem(-75px);
                            box-shadow: 0 0 toRem(20px) #666;
                            transform: translate(0, -50%);
                            background: #d3d6f0;
                            border-radius: toRem(15px);
                            .exam_LeftFloatCenter{
                                width: toRem(90px);
                                height: toRem(90px);
                                border-radius: toRem(90px);
                                position: absolute;
                                top:50%;
                                left:50%;
                                transform: translate(-50%, -50%);
                                .exam_LeftFloatIcon{
                                    width: toRem(40px);
                                    height: toRem(41px);
                                    background: url('../assets/exam-typeicon.png');
                                    background-size: 100%;
                                    position: absolute;
                                    top:50%;
                                    left:50%;
                                    transform: translate(-50%, -50%);
                                }
                            }
                        }
                        .exam_TypeName{
                            color: #fff;
                            font-size: toRem(38px);
                            font-weight: bolder;
                            font-style: italic;
                        }
                    }
                    .exam_InnerBoxPurple{
                        background: url('../assets/exam-typepurple.png') no-repeat;
                        background-size: 100%;
                        .exam_LeftFloatCenter{
                            background: #43486f;
                        }
                    }
                    .exam_InnerBoxYellow{
                        background: url('../assets/exam-typeyellow.png') no-repeat;
                        background-size: 100%;
                        .exam_LeftFloatCenter{
                            background: #5d5233;
                        }
                    }
                    .exam_InnerBoxBlue{
                        background: url('../assets/exam-typeblue.png') no-repeat;
                        background-size: 100%;
                        .exam_LeftFloatCenter{
                            background: #44606b;
                            
                        }
                    }
                    .exam_InnerBoxGreen{
                        background: url('../assets/exam-typegreen.png') no-repeat;
                        background-size: 100%;
                        .exam_LeftFloatCenter{
                            background: #2c3f33;
                        }
                    }
                    .exam_InnerBoxRed{
                        background: url('../assets/exam-typered.png') no-repeat;
                        background-size: 100%;
                        .exam_LeftFloatCenter{
                            background: #584340;
                        }
                    }
                }
            }
            
        }
    }
</style>
