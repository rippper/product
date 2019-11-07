<template>
    <div class="examTitleList">
        <header-fix :fixed="true" :title="title">
            <i class="exam_back" slot="left"></i>
            <i class="exam_search" slot="right"></i>
        </header-fix>
        <div class="exam_TitleList_TheList">
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
        </div>
    </div>
</template>

<script>
import { headerFix } from '../components'
import { ExamList } from '../service/getData'

export default {
    name: 'examTitleList',
    data () {
        return {
            title: '课程考试',
            typeId: 1,
            TestList: [],
            Rows: 7,
            currentPage: 1,
            allCount: 0
        }
    },
    mounted () {
        this.render()
    },
    methods: {
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
            console.log(msg)
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
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: toRem(128px);
                        font-size: toRem(30px);
                        width: toRem(460px);
                    }
                    .exam_ListButton{
                        flex: 1;
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
        }
    }
</style>
