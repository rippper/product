<template>
    <div class="trainCour">
            <headerFix title="培训班" :fixed="true">
                <i class="train_back" slot="left"></i>
                <i class="train_searchdepart" slot="right"></i>
            </headerFix>
            <div class="train_bodydepartment">
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
                <div class="train_CourseDepart" ref="itempart">
                    <ul class="train_selectitem" v-infinite-scroll="downmore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                        <li v-for="(item, index) in courseInfor" :key="index">
                            <trainingCourseItem :courseInfor="courseInfor[index]" ></trainingCourseItem>
                        </li>
                    </ul>
                    <div class="train_LoadMore" v-text="loadMore"></div>
                </div>
            </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { headerFix, transPlaceSelect, trainingCourseItem } from '../components'
import { TrainingClass, GetTrainingSchoolList, GetTrainingClassTypeList } from '../service/getData'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)

export default {
    data () {
        return {
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
            Rows: 5,
            currentPage: 1
        }
    },
    mounted () {
        this.cauclate()
        this.getTrainClass()
    },
    methods: {
        async downmore () {
            this.loading = true
            console.log()
            console.log(this.courseInfor.length === this.allMessage)
            console.log(111)
            if (this.courseInfor.length === this.allMessage) {
                console.log(this.allMessage)
                console.log(this.courseInfor.length)
                this.loadMore = '已全部显示'
            } else if (this.courseInfor.length < this.allMessage) {
                this.currentPage++
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
                console.log(this.allMessage)
                this.courseInfor = this.courseInfor.concat(Infor.Data.ListData)
            } 
            this.loading = false
            // 
            
        },
        cauclate () {
            let topBox = parseFloat(window.getComputedStyle(this.$refs.titlepart).height) + parseFloat(window.getComputedStyle(this.$refs.titlepart).padding) + parseFloat(window.getComputedStyle(this.$refs.titlepart).marginBottom)
            topBox = Math.ceil(topBox) + 4
            let all = window.screen.height
            this.$refs.itempart.style.height = parseFloat(all) - topBox + 'px'
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
        async changeType (msg) {
            if (msg.type == '学校:') {
                this.schoolId = msg.item
            } else if (msg.type == '专业:') {
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
                SchoolId: 0,
                MajorId: 0,
                Page: 1,
                Rows: this.Rows
            })
            console.log(msg)
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

            msg.Data.ListData = this.filtration(msg.Data.ListData)
            this.allMessage = msg.Data.totalCount
            this.courseInfor = msg.Data.ListData   
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
        background:#f2f7ff;
        box-sizing: border-box;
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
            flex-direction: column;
            .train_SelectDepart{
                box-sizing: border-box;
                background: #fff;
                padding-top: toRem(98px);
                padding-bottom: toRem(20px);
                margin-bottom: toRem(20px);
            }
            .train_CourseDepart{
                overflow: auto;
                background: #fff;
                padding-top: toRem(42px);
                padding-bottom: toRem(50px);
            }
            .train_LoadMore{
                text-align: center;
                font-size: toRem(25px);
                height: toRem(10px);
            }
        }
      
  }
</style>
