/*
  培训班列表
*/
<template>
    <div class="train_CourseItem">
        <div class="train_CourseItem_labelAndName">
            <span class="train_labelAndName_LabelGray" v-if="courseInfor.labelType == 0">未报名</span>
            <span class="train_labelAndName_LabelYellow" v-else-if="courseInfor.labelType == 1">已满员</span>
            <span class="train_labelAndName_LabelPurple" v-else-if="courseInfor.labelType == 2">未审核</span>
            <span class="train_labelAndName_LabelGreen" v-else-if="courseInfor.labelType == 3">已报名</span>
            <span class="train_labelAndName_LabelRed" v-else-if="courseInfor.labelType == 4">未通过</span>
            <span class="train_labelAndName_Name" v-text="courseInfor.Name"></span>
        </div>
        <div class="train_CourseItem_Detailed">
            <ul>
                <li>
                    <span class="train_detailed_label">开课时间:</span>
                    <span v-text="courseInfor.StartTime"></span>
                </li>
                <li>
                    <span class="train_detailed_label">地点:</span>
                    <span v-text="courseInfor.Address"></span>
                </li>
                <li>
                    <span class="train_detailed_label">教师:</span>
                    <span v-text="courseInfor.TeacherName"></span>
                </li>
            </ul>
        </div>
        <div class="train_CourseItem_Applyer">
            <div>
                <span class="train_Applyer_Shower">剩余名额:</span>
                <span class="train_Applyer_ApplyPeople" v-text="courseInfor.UserLimit - courseInfor.CurrentUser"></span>/<span v-text="courseInfor.UserLimit"></span>
            </div>
            <div class="train_Applyer_buttonGroup">
                <div class="train_Applyer_rejuect" v-if="courseInfor.buttonState.Type == 0" v-text="courseInfor.buttonState.Value"></div>
                <div class="train_Applyer_accept" v-else-if="courseInfor.buttonState.Type == 1" @click.stop="forApply()" v-text="courseInfor.buttonState.Value"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { TrainingSign } from '../service/getData'
import { MessageBox } from 'mint-ui'

export default {
    name: 'trainingCourseItem',
    data () {
        return {
            buttonState: '立即报名'
        }
    },
    props: {
        courseInfor: Object
    },
    methods: {
        async forApply () {
            let userInfor = JSON.parse(localStorage.getItem('userInfo'))
            let mobile = userInfor.Mobile
            let idcard = userInfor.IdCard
            let msg = await TrainingSign({
                TrainingId: this.courseInfor.Id,
                Tel: mobile,
                IdCard: idcard
            })
            if (msg.Type == 1) {
                MessageBox('提示', msg.Message)
                this.$emit('renderFnc')
            } else {
                MessageBox('提示', msg.Message)
                this.$emit('renderFnc')
            }
        }
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
    .train_CourseItem{
        width: toRem(691px);
        padding-top: toRem(41px);
        padding-right: toRem(28px);
        padding-left: toRem(28px);
        border-radius: 5px;
        box-shadow: 0px 0px toRem(15px) #d1d1d1;
        margin: 0 auto;
        margin-bottom: toRem(30px);
        -webkit-font-smoothing:antialiased;
        .train_CourseItem_labelAndName{
            display: flex;
            align-items:center;
            .train_labelAndName_LabelGray,
            .train_labelAndName_LabelYellow,
            .train_labelAndName_LabelPurple,
            .train_labelAndName_LabelGreen,
            .train_labelAndName_LabelRed
            {
                display: inline-block;
                width: toRem(90px);
                height: toRem(38px);
                text-align: center;
                border-radius: toRem(5px);
                margin-right: toRem(15px);
                font-size: toRem(18px);
                color: #fff;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .train_labelAndName_LabelGray{
                background: #b1b1b1;
            }
            .train_labelAndName_LabelYellow{
                background: #f39800;
            }
            .train_labelAndName_LabelPurple{
                background: #b35caa;
            }
            .train_labelAndName_LabelGreen{
                background: #5ca17a;
            }
            .train_labelAndName_LabelRed{
                background: #d1022c;
            }
            .train_labelAndName_Name{
                font-size: toRem(32px);
                font-family:'微软雅黑';
                font-weight: bold;
                color:#233;
            }
        }
        .train_CourseItem_Detailed{
            margin-top:toRem(15px);
            ul{
                display: flex;
                li{
                    width:33%;
                    color: #a9bcc7;
                    margin-right: toRem(13px);
                    @include ellipsis_two(1);
                    .train_detailed_label{
                        margin-right: toRem(7px);
                    }
                    &:first-of-type{
                        width:40%;
                    }
                    &:nth-of-type(2){
                        width:30%;
                    }
                    &:last-of-type{
                        width:30%;
                    }
                }
            }
        }
        .train_CourseItem_Applyer{
            height: toRem(136px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .train_Applyer_Shower{
                font-size: toRem(28px);
                margin-right: toRem(5px);
            }
            .train_Applyer_ApplyPeople{
                font-size: toRem(40px);
                font-weight: 600;
                color: #d1022c;
            }
            .train_Applyer_rejuect, .train_Applyer_accept{
                display: flex;
                width: toRem(150px);
                height: toRem(52px);
                color: #fff;
                border-radius: toRem(52px);
                justify-content: space-around;
                align-items: center;
            }
            .train_Applyer_buttonGroup{
                vertical-align: middle
            }
            .train_Applyer_rejuect{
                background: #b1b1b1;
            }
            .train_Applyer_accept{
                background: #4674df;
            }
        }
    }
</style>
