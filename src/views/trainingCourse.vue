/*
 * 培训班检索页面 
 */
<template>
    <div class="trainCour" ref="trainCour">
        
        <div class="train_bodydepartment">
            <!-- 头部检索列表 -->
            <headerFix title="培训班">
                <i class="train_back" slot="left" @click="goBack"></i>
                <i class="train_searchdepart" slot="right" @click="ToSearch"></i>
            </headerFix>
            <div class="train_SelectDepart" ref="titlepart">
                    <transPlaceSelect
                        v-for="(item, index) in selectType"
                        :key="index"
                        :Type="item.Type"
                        :typeList="item.typeList"
                        @rebackMsg="changeType"
                    >
                    </transPlaceSelect>
            </div>
        </div>
        <!-- 培训班列表 -->
        <!-- <div class="train_CourseDepart" ref="itempart"> -->
            <ul 
                v-infinite-scroll="downmore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <li v-for="(item, index) in courseInfor" :key="index" @click="linkto(item.Id)">
                    <trainingCourseItem :courseInfor="courseInfor[index]" @renderFnc="getTrainClass"></trainingCourseItem>
                </li>
            </ul>
            <div class="train_LoadMore" v-text="loadMore"></div>
        <!-- </div> -->
    </div>
</template>

<script>
import Vue from 'vue'
import { headerFix, transPlaceSelect, trainingCourseItem } from '../components'
import { TrainingClass, GetTrainingSchoolList, GetTrainingClassTypeList } from '../service/getData'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)

export default {
    name: 'trainingCourse',
    data () {
        return {
            screenHeight: '',
            screenWidth: '',
            selectType: [
                {
                    Type: '学校:',
                    typeList: ['全部', '嵊泗', '岱山', '普陀', '定海', '蓉浦学院']
                },
                {
                    Type: '专业:',
                    typeList: ['全部', '省级培训班', '党校培训班', '其他培训班']
                }
            ],
            courseInfor: [],
            loading: false,
            loadMore: '加载中',
            allMessage: '',
            schoolId: 0,
            courseType: 0,
            Rows: 7,
            currentPage: 1
        }
    },
    mounted () {
        // this.cauclate()
        this.getTrainClass()
    },
    methods: {
        // cauclate () {
        //     let topBox = parseFloat(window.getComputedStyle(this.$refs.titlepart).height) + parseFloat(window.getComputedStyle(this.$refs.titlepart).padding) + parseFloat(window.getComputedStyle(this.$refs.titlepart).marginBottom)
        //     topBox = Math.ceil(topBox) + 4
        //     let all = window.screen.height + 'px'
        //     // let all = window.innerHeight + 'px'
        //     this.$refs.itempart.style.height = parseFloat(all) - topBox + 'px'
        // },
        goBack () {
            let source = JSON.parse(localStorage.getItem('source'))
            if (source == 'iOS') {
                console.log('goback')
                window.webkit.messageHandlers.goBack.postMessage({ vcId: 'vcId=1212' })
            } else {
                this.$router.push({ path: '/' })
            }
            console.log('nosource')
        },
        filtration (Arr) {
            Arr.forEach((item, index) => {
                item.StartTime = item.StartTime.substr(0, 10)
                if (item.ApplyStatus == '') {
                    if (item.CurrentUser == item.UserLimit) {
                        item.labelType = 1
                        item.buttonState = { Type: 0, Value: '已满员' }
                    } else if (item.CurrentUser < item.UserLimit) {
                        item.labelType = 0
                        item.buttonState = { Type: 1, Value: '立即报名' }
                    }
                } else {
                    if (item.ApplyStatus == 'Normal') {
                        item.labelType = 3
                        item.buttonState = { Type: 0, Value: '已报名' }
                    } else if (item.ApplyStatus == 'UnAudit') {
                        item.labelType = 2
                        item.buttonState = { Type: 0, Value: '未审核' }
                    } else if (item.ApplyStatus == 'UnApprove') {
                        item.labelType = 5
                        item.buttonState = { Type: 0, Value: '未通过' }
                    }
                }
            })
            return Arr
        },
        linkto (msg) {
            this.$router.push({ path: '/trainingdetails', query: { id: msg } })
        },
        ToSearch () {
            this.$router.push({ path: '/trainingsearch' })
        },
        async downmore () {
            if (this.courseInfor.length == 0) {
                return
            }
            this.loading = true
            if (this.courseInfor.length === this.allMessage) {
                this.loadMore = '已全部显示'
            } else if (this.courseInfor.length < this.allMessage) {
                this.currentPage = ++this.currentPage
                let Infor = await TrainingClass({
                    SchoolId: this.schoolId,
                    MajorId: this.courseType,
                    Page: this.currentPage,
                    Rows: this.Rows,
                    Sort: 'Id',
                    Order: 'desc'
                })
                this.loading = false
                Infor.Data.ListData = this.filtration(Infor.Data.ListData)
                this.courseInfor = this.courseInfor.concat(Infor.Data.ListData)
            } 
            this.loading = false
        },
        async changeType (msg) {
            if (msg.type == '学校:') {
                if (this.schoolId == msg.item) {
                    return false
                }
                this.schoolId = msg.item
            } else if (msg.type == '专业:') {
                if (this.courseType == msg.item) {
                    return false
                }
                this.courseType = msg.item
            }
            this.loadMore = '加载中'
            this.courseInfor = []
            let Infor = await TrainingClass({
                SchoolId: this.schoolId,
                MajorId: this.courseType,
                Page: 1,
                Rows: this.Rows,
                Sort: 'Id',
                Order: 'desc'
            })
            Infor.Data.ListData = this.filtration(Infor.Data.ListData)
            this.allMessage = Infor.Data.totalCount
            this.courseInfor = Infor.Data.ListData
            this.currentPage = 1
            if (this.allMessage <= this.Rows) {
                this.loadMore = '已全部显示'
            }
        },
        async getTrainClass () {
            let school = await GetTrainingSchoolList({
                Page: 1,
                Rows: 100,
                Sort: 'Id',
                Order: 'desc'
            })
            let classType = await GetTrainingClassTypeList({
                Page: 1,
                Rows: 100,
                Sort: 'Id',
                Order: 'desc'
            })
            let msg = await TrainingClass({
                SchoolId: this.schoolId,
                MajorId: this.courseType,
                Page: 1,
                Rows: this.Rows
            })
            school.Data.ListData.unshift({
                text: '全部',
                id: 0
            })
            
            this.selectType[0].typeList = school.Data.ListData
            classType.Data.ListData.unshift({
                text: '全部',
                id: 0
            })
            this.selectType[1].typeList = classType.Data.ListData
            this.currentPage = 1
            msg.Data.ListData = this.filtration(msg.Data.ListData)
            this.allMessage = msg.Data.totalCount
            this.courseInfor = msg.Data.ListData  
            if (this.courseInfor.length === this.allMessage) {
                this.loadMore = '已全部显示'
            } 
        }
    },
    components: {
        headerFix,
        transPlaceSelect,
        trainingCourseItem
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
  .trainCour {
        width: 100%;
        max-height: 100vh;
        overflow: auto;
        background: #fff;
        padding-bottom: toRem(50px);
        box-sizing: border-box;
        position: relative;
        & > ul{
            padding-top: toRem(380px);
            -webkit-overflow-scrolling:touch;
        }
        .train_back{
            width: toRem(24px);
            height: toRem(42px);
            background:url('../assets/tra_turnback.png');
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .train_searchdepart{
            width: toRem(42px);
            height: toRem(42px);
            background: url('../assets/tra_searchbtn.png');
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .train_bodydepartment{
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            .train_SelectDepart{
                background: #fff;
                padding-bottom: toRem(20px);
                margin-bottom: toRem(20px);
            }

        }
        .train_LoadMore{
            text-align: center;
            font-size: toRem(25px);
            height: toRem(10px);
        }
      
  }
</style>
