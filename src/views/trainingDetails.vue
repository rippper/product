<template>
    <div class="trdet_Page">
        <headerFix
            :title="label"
            :fixed="true"
            :backType="backState"
        >
            <i class="trdet_Back" slot="left" @click="linkToCourse()"></i>
        </headerFix>
        <div class="trdet_BodyHeight">
            <div class="trdet_BodyHeight_TitlePage">
                <img :src="Images" alt="">
            </div>
            <div class="trdet_BodyHeight_WordsForm">
                <div class="trdet_WordsForm_CourseName">
                    <p v-text="Title"></p>
                    <span class="trdet_CourseName_TitleLabelGrey" v-if="TrainingStyle == 0">未报名</span>
                    <span class="trdet_CourseName_TitleLabelYellow" v-else-if="TrainingStyle == 1">已满员</span>
                    <span class="trdet_CourseName_TitleLabelPurple" v-else-if="TrainingStyle == 2">未审核</span>
                    <span class="trdet_CourseName_TitleLabelGreen" v-else-if="TrainingStyle == 3">已报名</span>
                    <span class="trdet_CourseName_TitleLabelRed" v-else-if="TrainingStyle == 4">未通过</span>
                </div>
                <div class="trdet_WordsForm_Table">
                    <ul>
                        <li>
                            <div class="trdet_Tabel_Label">所属学校</div>
                            <div class="trdet_Tabel_Content trdet_EXone"><p v-text="School"></p></div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">所属专业</div>
                            <div class="trdet_Tabel_Content trdet_EXone"><p v-text="CourseType"></p></div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">任课老师</div>
                            <div class="trdet_Tabel_Content trdet_EXone"><p v-text="Teacher"></p></div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">开课时间</div>
                            <div class="trdet_Tabel_Content trdet_EXone"><p v-text="CourseTime"></p></div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">上课地点</div>
                            <div class="trdet_Tabel_Content trdet_EXone"><p v-text="Place"></p></div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">上课时间</div>
                            <div class="trdet_Tabel_Content trdet_EXone"><p v-text="ClassTime"></p></div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">班级简介</div>
                            <div class="trdet_Tabel_Content trdet_indent" v-text="ClassDesc">1982年9月，为总结党的十一届三中全会以后取得的成就和经验，全面开创社会主义现代化建设的新局面，党的十二大在北京召开。这次大会确定了全面开创社会主义现代化建设新局面的纲领。邓小平同志在致大会开幕词时，第一次提出了“建设有中国特色的社会主义”的崭新命题。</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="trdet_Bottom_MsgDepart">
            <div class="trdet_MsgDepart_PeopleNum">
                剩余名额：
                <span class="trdet_PeopleNum_HaveApply" v-text="haveApply"></span>/<span v-text="mostApply"></span>
            </div>
            <div class="trdet_MsgDepart_ApplyButtonUse" v-if="buttonState == 1" @click="forApply()">
                立即报名
            </div>
            <div class="trdet_MsgDepart_ApplyButtonNone" v-else-if="buttonState == 0">
                立即报名
            </div>
        </div>
    </div>
</template>

<script>
import { headerFix } from '../components'
import { GetTrainingById, TrainingSign } from '../service/getData'
import { MessageBox } from 'mint-ui'

export default {
    name: 'trainingDetails',
    data () {
        return {
            label: '班级详情页',
            backState: true,
            ClassId: this.$route.query.id,
            Title: '无',
            TrainingStyle: 0,
            School: '无',
            CourseType: '无',
            Teacher: '无',
            CourseTime: '无',
            Place: '无',
            Images: require('../assets/training_background.png'),
            ClassTime: '无',
            ClassDesc: '无',
            haveApply: 0,
            mostApply: 0,
            buttonState: 0
        }
    },
    mounted () {
        window.addEventListener('scroll', this.scrollThing)
        this.scrollThing()
        this.render()
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.scrollThing)
    },
    methods: {
        linkToCourse () {
            this.$router.push({ path: '/trainingcourse' })
        },
        scrollThing () {
            var t = document.documentElement.scrollTop || document.body.scrollTop
            if (t >= 200 && this.backState == true) {
                this.backState = false
            } else if (t < 200 && this.backState == false) {
                this.backState = true
            }
        },
        changeType () {
            if (this.ApplyStatus == '') {
                if (this.haveApply == 0) {
                    this.TrainingStyle = 1
                    this.buttonState = 0
                } else if (this.haveApply <= this.mostApply) {
                    this.TrainingStyle = 0
                    this.buttonState = 1
                }
            } else {
                if (this.ApplyStatus == 'Normal') {
                    this.TrainingStyle = 3
                    this.buttonState = 0
                } else if (this.ApplyStatus == 'UnAudit') {
                    this.TrainingStyle = 2
                    this.buttonState = 0
                } else if (this.ApplyStatus == 'UnApprove') {
                    this.TrainingStyle = 5
                    this.buttonState = 0
                }
            }
        },
        async forApply () {
            let userInfor = JSON.parse(localStorage.getItem('userInfo'))
            let mobile = userInfor.Mobile
            let idcard = userInfor.IdCard
            let msg = await TrainingSign({
                TrainingId: this.ClassId,
                Tel: mobile,
                IdCard: idcard
            })
            if (msg.Type == 1) {
                MessageBox('提示', msg.Message)
                this.render()
            } else {
                MessageBox('提示', msg.Message)
                this.render()
            }
        },
        async render () {
            let msg = await GetTrainingById({
                ids: this.ClassId
            })
            this.Title = msg.Data[0].Name
            this.ApplyStatus = msg.Data[0].ApplyStatus
            this.School = msg.Data[0].SchoolName
            this.CourseType = msg.Data[0].TrainingTypeName
            this.Teacher = msg.Data[0].TeacherName
            this.Place = msg.Data[0].Address
            this.ClassTime = msg.Data[0].ClassTime
            this.ClassDesc = msg.Data[0].ClassDescription
            this.haveApply = msg.Data[0].LastCount
            this.mostApply = msg.Data[0].UserLimit
            this.changeType()
            // this.ClassInfor = msg.Data[0]
        }
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.trdet_Page{
    .trdet_Back{
        width: toRem(24px);
        height: toRem(42px);
        background:url('../assets/tra_turnback.png');
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .trdet_BodyHeight{
        margin-bottom: toRem(120px);
        .trdet_BodyHeight_TitlePage{
            img{
                width: 100%;
                height: toRem(460px);
            }
        }
        .trdet_BodyHeight_WordsForm{
            background: #fff;
            padding-left: toRem(30px);
            .trdet_WordsForm_CourseName{
                display: flex;
                align-items:center;
                height: toRem(110px);
                P{
                    font-size: toRem(40px);
                    font-weight: 500;
                }
                .trdet_CourseName_TitleLabelGrey,
                .trdet_CourseName_TitleLabelYellow,
                .trdet_CourseName_TitleLabelPurple,
                .trdet_CourseName_TitleLabelGreen,
                .trdet_CourseName_TitleLabelRed
                {
                    width: toRem(90px);
                    height: toRem(44px);
                    line-height: toRem(44px);
                    text-align: center;
                    color:#fff;
                    border-radius: 3px;
                    margin-left: toRem(15px);
                }
                .trdet_CourseName_TitleLabelGrey{
                    background: #b1b1b1;
                }
                .trdet_CourseName_TitleLabelYellow{
                    background: #f39800;
                }
                .trdet_CourseName_TitleLabelPurple{
                    background: #b35caa;
                }
                .trdet_CourseName_TitleLabelGreen{
                    background: #5ca17a;
                }
                .trdet_CourseName_TitleLabelRed{
                    background: #d1022c;
                }
            }
            .trdet_WordsForm_Table{
                ul{
                    li{
                        display: flex;
                        .trdet_Tabel_Label{
                            width: toRem(160px);
                            height: toRem(80px);
                            line-height: toRem(80px);
                            color: #a9bcc7;
                            font-size: toRem(28px);
                            margin-right: toRem(75px);
                        }
                        .trdet_Tabel_Content{
                            width:100%;
                            font-size: toRem(28px);
                            padding-right: toRem(30px);
                            border-bottom: toRem(1px) solid #efefef;
                        }
                        .trdet_EXone{
                            line-height: toRem(80px);
                        }
                        .trdet_indent{
                            text-indent: 2em;
                            line-height: toRem(50px);
                            padding-top: toRem(15px);
                            text-align: justify;
                            text-justify: inter-ideograph;
                            border-bottom: none;
                        }
                    }
                }
            }
        }
    }
    .trdet_Bottom_MsgDepart{
        display: flex;
        position: fixed;
        bottom:0;
        width:100%;
        margin-top: toRem(20px);
        .trdet_MsgDepart_PeopleNum{
            width: 50%;
            height: toRem(98px);
            line-height: toRem(98px);
            text-align: center;
            background: #fff;
            .trdet_PeopleNum_HaveApply{
                font-size: toRem(40px);
                font-weight: 600;
                color: #d1022a;
            }
        }
        .trdet_MsgDepart_ApplyButtonUse,
        .trdet_MsgDepart_ApplyButtonNone
        {
            width: 50%;
            height: toRem(98px);
            line-height: toRem(98px);
            text-align: center;
            background:#4374df;
            color:#fff;
            font-size: toRem(34px);
        }
        .trdet_MsgDepart_ApplyButtonUse{
            background:#4374df;
        }
        .trdet_MsgDepart_ApplyButtonNone{
            background:#b1b1b1;
        }
    }
}
</style>
