<template>
    <div class="trainCour">
            <headerFix title="培训班" :fixed="true">
                <i class="train_back" slot="left"></i>
                <i class="train_searchdepart" slot="right"></i>
            </headerFix>
            <!-- <mt-loadmore :bottom-method="downmore" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" @bottom-status-change="handleBottomChange" :bottomDistance="150"> -->
            <div>
                <div class="train_SelectDepart">
                        <transPlaceSelect
                            v-for="(item, index) in selectType"
                            :key="index"
                            :Type="item.Type"
                            :typeList="item.typeList"
                        >
                        </transPlaceSelect>
                </div>
                <div class="train_CourseDepart">
                    <ul v-infinite-scroll="downmore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                        <li v-for="(item, index) in courseInfor" :key="index">
                            <trainingCourseItem :courseInfor="courseInfor[index]" ></trainingCourseItem>
                        </li>
                    </ul>
                    <div class="train_LoadMore" v-text="loadMore"></div>
                </div>
            </div>
            <!-- <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">上拉加载更多↑</span>
                <span v-show="bottomStatus === 'loading'">加载中...</span>
            </div> -->
            <!-- </mt-loadmore> -->
    </div>
</template>

<script>
import Vue from 'vue'
import { headerFix, transPlaceSelect, trainingCourseItem } from '../components'
import { TrainingClass } from '../service/getData'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)
// Vue.component(Loadmore.name, Loadmore)

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
            courseInfor: [
                {
                    labelType: 0,
                    courseName: '2019年第一次安全培训班',
                    startTime: '2019-08-29',
                    Place: '教研9-201',
                    Teacher: '王者荣耀',
                    applyPeople: 120,
                    mostApply: 200,
                    buttonState: { Type: 1, Value: '立即报名' }
                },
                {
                    labelType: 1,
                    courseName: '2019年第一次安全培训班',
                    startTime: '2019-08-29',
                    Place: '教研9-201',
                    Teacher: '王者荣耀',
                    applyPeople: 200,
                    mostApply: 200,
                    buttonState: { Type: 0, Value: '已满员' }
                },
                {
                    labelType: 2,
                    courseName: '2019年第一次安全培训班',
                    startTime: '2019-08-29',
                    Place: '教研9-201',
                    Teacher: '王者荣耀',
                    applyPeople: 200,
                    mostApply: 200,
                    buttonState: { Type: 0, Value: '未审核' }
                },
                {
                    labelType: 3,
                    courseName: '2019年第一次安全培训班',
                    startTime: '2019-08-29',
                    Place: '教研9-201',
                    Teacher: '王者荣耀',
                    applyPeople: 200,
                    mostApply: 200,
                    buttonState: { Type: 0, Value: '已报名' }
                }
            ],
            // allLoaded: false,
            // count: 40,
            // bottomStatus: ''
            loading: false,
            loadMore: '加载中'
        }
    },
    mounted () {
        this.getTrainClass()
    },
    methods: {
        downmore () {
            this.loading = true
            setTimeout(() => {
                this.courseInfor.push(this.courseInfor[0])
            //     // this.$refs.loadmore.onBottomLoaded();
                this.loading = false
            }, 1000)
            console.log(this.courseInfor)
        },
        // handleBottomChange(status) {
        //     this.bottomStatus = status;
        // }
        async getTrainClass () {
            let msg = await TrainingClass({
                Page: 1, Rows: 100, Sort: 'Id', Order: 'desc'
            })
            console.log(msg)
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
      .train_SelectDepart{
          background: #fff;
          padding-top: toRem(98px);
          padding-bottom: toRem(20px);
          margin-bottom: toRem(20px);
      }
      .train_CourseDepart{
          overflow: auto;
          height: toRem(1250px);
          background: #fff;
          padding-top: toRem(42px);
          padding-bottom: toRem(50px);
      }
      .train_LoadMore{
          text-align: center;
          height: toRem(10px);
      }
  }
</style>
