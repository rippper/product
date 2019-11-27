<template>
    <div class="examTitleList_background">
        <div class="examTitleList" :class="{ 'examTitleList_action' : descriptionType }">
            <div class="exam_testList">
                <header-fix :fixed="true" :title="title">
                    <i class="exam_back" slot="left" @click="goBack()"></i>
                    <i class="exam_search" slot="right"></i>
                </header-fix>
                <div 
                    class="exam_TitleList_TheList"
                    v-infinite-scroll="downMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10"
                    ref="exam_TitleList_TheList"
                >
                    <ul>
                        <li v-for="(item, index) in TestList" :key="index">
                            <div class="exam_ListIndex" v-text="item.IndexNum"></div>
                            <div class="exam_ListInfor">
                                <p v-text="item.Name"></p>
                                <div>
                                    <span class="exam_ClockIcon"></span>
                                    <span v-text="item.StartTime"></span> ~ <span v-text="item.EndTime"></span>
                                </div>
                            </div>
                            <div class="exam_ListButton">
                                <div class="exam_ListBotton_button" @click="openDescription(index)">
                                    开始考试
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="exam_LoadMsg" v-text="loadMsg"></div>
                </div>
            </div>
            <div class="exam_description">
                <header-fix :absolute="true" :title="title" :theStyle="true">
                    <i class="exam_detail_goback" slot="left" @click="closeDescription"></i>
                </header-fix>
                <div>
                    <p class="exam_description_name" v-text="BeChooseN"></p>
                    <div class="exam_dp_msgbox">
                        <div class="exam_dp_background">
                            <div class="exam_bg_deep"></div>
                            <div class="exam_bg_light">
                                <div class="exam_descript">
                                    <p class="exam_dp_title"><span class="exam_colorbox_yellow"></span>考试说明</p>
                                    <p class="exam_dp_content" v-text="BeChooseD"></p>
                                </div>
                                <div class="exam_time">
                                    <p class="exam_dp_title"><span class="exam_colorbox_green"></span>考试时间</p>
                                    <p class="exam_dp_content" v-text="BeChooseT"></p>
                                </div>
                                <div class="exam_other">
                                    <p class="exam_dp_title"><span class="exam_colorbox_blue"></span>其它</p>
                                    <ul>
                                        <li>
                                            <p class="exam_dp_msg" v-text="BeChooseF"></p>
                                            <p>题目总分</p>
                                        </li>
                                        <li>
                                            <p class="exam_dp_msg" v-text="BeChooseS"></p>
                                            <p>题目数量</p>
                                        </li>
                                        <li>
                                            <div class="exam_dp_msg">
                                                <p class="exam_dp_time">
                                                    <span v-text="BeChooseTL"></span> min
                                                </p>
                                            </div>
                                            <p>考试时长</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="exam_button_tostart">
                    <div class="button_action" v-show="BeChooseButtonType == true" @click="linkTo">开始考试</div>
                    <div class="button_reject" v-show="BeChooseButtonType == false">开始考试</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { headerFix } from '../components'
import { ExamList, GetExamInfo } from '../service/getData'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)

export default {
    name: 'examTitleList',
    data () {
        return {
            screenWidth: '',
            screenHeight: '',
            title: this.$route.query.Name,
            typeId: this.$route.query.Id,
            TestList: [],
            Rows: 9,
            currentPage: 1,
            allCount: 0,
            loadMsg: '加载中',
            descriptionType: false, 
            BeChooseID: 0,
            BeChooseN: '--', // 被选中的考试名称
            BeChooseD: '无', // 被选中的考试描述
            BeChooseT: '无', // 被选中的考试起始时间
            BeChooseF: '0', // 被选中的考试总分
            BeChooseS: '0', // 被选中的考试题目数量
            BeChooseTL: '- -', // 被选中的考试时长
            BeChooseButtonType: false
        }
    },
    mounted () {
        this.Calculate()
        this.render()
        window.addEventListener('resize', this.windowsChange)
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
        Calculate () {
            this.$refs.exam_TitleList_TheList.style.height = window.screen.height + 'px'
        },
        goBack () {
            this.$router.push({ path: '/examtype' })
        },
        linkTo () {

        },
        closeDescription () {
            this.descriptionType = false
            this.BeChooseN = '--'
            this.BeChooseD = '无'
            this.BeChooseT = '无'
            this.BeChooseButtonType = false
            this.BeChooseF = '0'
            this.BeChooseS = '0'
            this.BeChooseTL = '- -'
        },
        async openDescription (Index) {
            this.descriptionType = true
            this.BeChooseID = this.TestList[Index].Id
            this.BeChooseN = this.TestList[Index].Name
            this.BeChooseD = this.TestList[Index].Description == '' ? '无' : this.TestList[Index].Description
            this.BeChooseT = this.TestList[Index].StartTime + '~' + this.TestList[Index].EndTime
            let msg = await GetExamInfo({
                Exam_id: this.BeChooseID
            })
            console.log(msg)
            if (msg.IsSuccess === false) {
                this.BeChooseButtonType = false
            } else {
                this.BeChooseButtonType = true
                this.BeChooseF = msg.Data.Exam.TotalScore
                this.BeChooseS = msg.Data.Exam.PassingScore
                this.BeChooseTL = msg.Data.Exam.TimeLimit ? msg.Data.Exam.TimeLimit : '- -'
            }
        },
        async downMore () {
            if (this.TestList.length < this.Rows) {
                return false
            }
            if (this.TestList.length < this.allCount) {
                this.currentPage = ++this.currentPage
                let msg = await ExamList({
                    examType: 'All',
                    ExamTypeId: this.typeId,
                    Rows: this.Rows,
                    Page: this.currentPage,
                    Order: 'desc',
                    Sort: 'StartTime'
                })
                msg.Data.ExamAllModel.forEach((item, index) => {
                    item.StartTime = item.StartTime.substr(0, 10)
                    item.EndTime = item.EndTime.substr(0, 10)
                    let newIndex = this.TestList.length + index 
                    if (newIndex + 1 < 10) {
                        item.IndexNum = '0' + (newIndex + 1) 
                    } else {
                        item.IndexNum = newIndex + 1
                    }
                })
                this.TestList = this.TestList.concat(msg.Data.ExamAllModel)
            } else {
                this.loadMsg = '已全部加载'
            }
        },
        async render () {
            let msg = await ExamList({
                examType: 'All',
                ExamTypeId: this.typeId,
                Rows: this.Rows,
                Page: this.currentPage,
                Order: 'desc',
                Sort: 'StartTime'
            })
            this.allCount = msg.Data.ExamAllCount
            msg.Data.ExamAllModel.forEach((item, index) => {
                item.StartTime = item.StartTime.substr(0, 10)
                item.EndTime = item.EndTime.substr(0, 10)
                if (index + 1 < 10) {
                    item.IndexNum = '0' + (index + 1) 
                } else {
                    item.IndexNum = index + 1
                }
            })
            this.TestList = msg.Data.ExamAllModel
            if (this.allCount <= this.Rows) {
                this.loadMsg = '已全部加载'
            }
        }
    },
    watch: {
        screenWidth (val) {
            this.Calculate()
        },
        screenHeight (val) {
            this.Calculate()
        }
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
    .examTitleList_background{
        perspective: 1000px;
    }
    .examTitleList{
        width: 100%;
        height: 100vh;
        position: relative;
        transition: 0.5s;
        transform-style: preserve-3d;
        .exam_back{
            width: toRem(24px);
            height: toRem(42px);
            background:url('../assets/tra_turnback.png');
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .exam_search{
            width: toRem(42px);
            height: toRem(42px);
            background: url('../assets/exam-searchicon.png');
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .exam_testList{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transition: 0.5s;
            transform: translateZ(1px);
        }
        .exam_testList_action{
            transform: rotateY(180deg);
        }
        .exam_TitleList_TheList{
            padding-top: toRem(92px);
            background: #fff;
            overflow: auto;
            ul{
                padding: 0 toRem(15px);
                li{
                    padding: toRem(20px) 0;
                    border-bottom: toRem(1px) solid #d1d1d1;
                    display: flex;
                    .exam_ListIndex{
                        padding-top: toRem(3px);
                        margin-right: toRem(20px);
                        font-size: toRem(30px);
                        color: #4374df;
                        font-weight: bold;
                    }
                    .exam_ListInfor{
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: toRem(128px);
                        font-size: toRem(30px);
                        width: toRem(460px);
                    }
                    .exam_ListButton{
                        width: toRem(208px);
                        text-align: center;
                        &:before{
                            content: '';
                            display: inline-block;
                            vertical-align: middle;
                            height: 100%;
                        }
                        .exam_ListBotton_button{
                            height: toRem(80px);
                            line-height: toRem(80px);
                            padding: 0 toRem(25px);
                            border-radius: toRem(80px);
                            display: inline-block;
                            font-size: toRem(30px);
                            color: #fff;
                            background: #4374df;
                        }
                    }
                }
            }
            .exam_LoadMsg{
                height: toRem(90px);
                line-height: toRem(90px);
                font-size: toRem(28px);
                text-align: center;
            }
        }
        .exam_description{
            width: 100%;
            height: 100vh;
            background: #5383eb;
            position: absolute;
            top: 0;
            left: 0;
            transform: translateZ(-1px) rotateY(180deg);
            .exam_detail_goback{
                width: toRem(24px);
                height: toRem(42px);
                background:url('../assets/arti-rebackblank.png');
                background-size: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            .exam_description_name{
                text-align: center;
                color: #fff;
                font-size: toRem(35px);
                margin-top: toRem(150px);
            }
            .exam_dp_msgbox{
                perspective: 500px;
                width: 100%;
                margin-top: toRem(80px);
                .exam_dp_background{
                    transform-style: preserve-3d;
                    position:relative;
                    width:toRem(630px);
                    height: toRem(820px);
                    margin: 0 auto;
                    background: rgba(255,255,255,0.5);
                    border-radius: toRem(10px);
                    .exam_bg_deep{
                        width:toRem(630px);
                        height: toRem(820px);
                        background: rgba(255,255,255,0.2);
                        border-radius: toRem(10px);
                        transform: translateZ(toRem(-50px)) translateY(toRem(-40px));
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .exam_bg_light{
                        width:toRem(630px);
                        height: toRem(820px);
                        background: rgba(255,255,255,1);
                        border-radius: toRem(10px);
                        padding-top: toRem(76px);
                        transform: translateZ(toRem(50px)) translateY(toRem(40px));
                        position: absolute;
                        top: 0;
                        left: 0;
                        &:before{
                            content: '';
                            position: absolute;
                            top: toRem(-85px);
                            right: 0;
                            width: toRem(73px);
                            height: toRem(156px);
                            background: url('../assets/exam_woman.png');
                            background-size: 100%;
                        }
                        &:after{
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: toRem(50px);
                            width: 0;
                            height: toRem(630px);
                            border: toRem(1px) solid #b1b1b1;
                            margin-top: toRem(-315px);
                        }
                        .exam_descript{
                            height: toRem(240px);
                            .exam_dp_content{
                                margin-left: toRem(96px);
                                width: toRem(490px);
                            }
                        }
                        .exam_time{
                            height: toRem(180px);
                            .exam_dp_content{
                                margin-left: toRem(96px);
                                width: toRem(490px);
                            }
                        }
                        .exam_other{
                            height: toRem(300px);
                            ul{
                                margin-left: toRem(96px);
                                width: toRem(490px);
                                display: flex;
                                justify-content: space-between;
                                li{
                                    width: 33%;
                                    text-align: center;
                                    .exam_dp_msg{
                                        height: toRem(70px);
                                        line-height: toRem(70px);
                                        font-size: toRem(35px);
                                        font-weight: bold;
                                        position: relative;
                                        .exam_dp_time{
                                            width: toRem(130px);
                                            height: toRem(40px);
                                            line-height: toRem(40px);
                                            padding: 0 toRem(15px);
                                            margin:auto;
                                            background: #d1022c;
                                            font-size: toRem(16px);
                                            color: #fff;
                                            border-radius: toRem(40px);
                                            position: absolute;
                                            top:0;
                                            right:0;
                                            bottom:0;
                                            left:0;
                                            
                                        }
                                    }
                                }
                            }
                        }
                        .exam_dp_title{
                            position: relative;
                            font-size: toRem(34px);
                            font-weight: bold;
                            padding-left: toRem(41px);
                            margin-bottom: toRem(20px);
                            z-index: 1;
                            .exam_colorbox_yellow{
                                display: inline-block;
                                width: toRem(20px);
                                height: toRem(20px);
                                background: linear-gradient(to right,#f7c051,#f1a127);
                                margin-right: toRem(35px);
                            }
                            .exam_colorbox_green{
                                display: inline-block;
                                width: toRem(20px);
                                height: toRem(20px);
                                background: linear-gradient(to right,#74e074,#41c64d);
                                margin-right: toRem(35px);
                            }
                            .exam_colorbox_blue{
                                display: inline-block;
                                width: toRem(20px);
                                height: toRem(20px);
                                background: linear-gradient(to right,#6aaaf6,#317df1);
                                margin-right: toRem(35px);
                            }
                        }
                    }
                }
            }
            .exam_button_tostart{
                margin-top: toRem(100px);
                .button_action{
                    text-align:center;
                    width: toRem(240px);
                    height: toRem(72px);
                    line-height: toRem(72px);
                    margin: 0 auto;
                    border-radius: toRem(5px);
                    background: linear-gradient(to right, #49c6f5, #0da3f6);
                    color:#fff;
                }
                .button_reject{
                    text-align:center;
                    width: toRem(240px);
                    height: toRem(72px);
                    line-height: toRem(72px);
                    margin: 0 auto;
                    background: #888;
                    color:#fff;
                }
            }
        }
    }
    .examTitleList_action{
        transform: rotateY(180deg);
        transform-origin: center; 
    }
</style>
