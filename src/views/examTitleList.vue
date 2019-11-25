<template>
    <div class="examTitleList">
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
                        <div class="exam_ListBotton_button">
                            开始考试
                        </div>
                    </div>
                </li>
            </ul>
            <div class="exam_LoadMsg" v-text="loadMsg"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { headerFix } from '../components'
import { ExamList } from '../service/getData'
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
            loadMsg: '加载中'
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
    .examTitleList{
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
    }
</style>
