<template>
    <div class="trainCour">
        <headerFix title="培训班" fixed="true">
            <i class="train_back" slot="left"></i>
            <i class="train_searchdepart" slot="right"></i>
        </headerFix>
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
            <trainingCourseItem v-for="(item, index) in courseInfor" :key="index" :courseInfor="courseInfor[index]"></trainingCourseItem>
        </div>
    </div>
</template>

<script>
import { headerFix, transPlaceSelect, trainingCourseItem } from '../components'
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
            ]
        }
    },
    methods: {

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
          padding-bottom: toRem(25px);
          margin-top: toRem(92px);
          margin-bottom: toRem(20px);
      }
      .train_CourseDepart{
          background: #fff;
          padding-top: toRem(42px);
          padding-bottom: toRem(10px);
      }
  }
</style>
