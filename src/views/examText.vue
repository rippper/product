<template>
    <div class="examText" ref="examText">
        <header-fix :backType="true" :fixed="true">
            <i class="examT_goBack" slot="left"></i>
        </header-fix>
        <div class="examT_BodyPart">
            <div class="examT_BodyPart_banner">
                <div class="examT_TimeInfor">
                    <span class="examT_LastTime">剩余时间：</span>
                    <span class="examT_TimeNum" v-text="minLimit"></span><span class="examT_TimeNum">:</span><span class="examT_TimeNum" v-text="secLimit"></span>
                </div>
            </div>
            <div class="examT_BodyPart_advise" ref="examT_BodyPart_advise">
                <div>
                    说明：试题数目<span class="examT_Advise_innertext" v-text="topicList.length"></span>题，满分<span class="examT_Advise_innertext" v-text="maxScore"></span>分，及格<span class="examT_Advise_innertext" v-text="passScore"></span>分！
                </div>
                <div>
                    <span class="examT_Advise_close" @click="adviseClose"></span>
                </div>
            </div>
            <div class="examT_TopicPart">
                <div class="examT_TopicPart_singlechoose" v-if="topicType == 1">
                    <div class="examT_SingleChoose_Title">
                        <span class="examT_TopicLabel_blue">[单选题]</span><span v-text="currentTopic"></span>.<span v-text="topicList[currentTopic - 1].Name"></span>
                    </div>
                    <ul>
                        <li :class="{ 'examT_SingleChoose_active': item.cssStyle }" v-for="(item, index) in choose" :key="index" @click="singleSelect(index)" ref="singleResult"><span v-text="item.ItemFlag"></span>.<span v-text="item.Name"></span></li>
                    </ul>
                </div>
                <div class="examT_TopicPart_morechoose" v-else-if="topicType == 2">
                    <div class="examT_MoreChoose_Title">
                        <span class="examT_TopicLabel_red">[多选题]</span><span v-text="currentTopic"></span>.<span v-text="topicList[currentTopic - 1].Name"></span>
                    </div>
                    <ul>
                        <li :class="{ 'examT_SingleChoose_active': item.cssStyle }" v-for="(item, index) in choose" :key="index"  @click="moreSelect(index)"><p><span v-text="item.ItemFlag"></span>.<span v-text="item.Name"></span></p></li>
                    </ul>
                </div>
                <div class="examT_TopicPart_writeanswer" v-else-if="topicType == 3">
                    <div class="examT_WriteAnswer_Title">
                        <span class="examT_TopicLabel_yellow">[简答题]</span><span v-text="currentTopic"></span>.<span v-text="topicList[currentTopic - 1].Name"></span>
                    </div>
                    <div class="examT_TopicPart_answerwrite">
                        <textarea rows="10" cols="20" v-model="textAnswer" @change="textInput"></textarea>
                    </div>
                </div>
                <div class="examT_ExamTopic_answerlist">
                    <div class="examT_AnswerList_button" @click="openCard">
                        <span class="examT_AnswerList_buttonicon"></span>
                    </div>
                </div>
            </div>
            <div class="examT_BottomPart">
                <div class="examT_BottomPart_buttonstyle" @click="lastTopic">
                    上一题
                </div>
                <div class="examT_BottomPart_middle">
                    <span class="examT_BottomPart_currenttopic" v-text="currentTopic"></span>/<span v-text="allTopic"></span>
                </div>
                <div class="examT_BottomPart_buttonstyle" @click="nextTopic" v-if="currentTopic < topicList.length">
                    下一题
                </div>
                <div class="examT_BottomPart_submitanswer" v-else-if="currentTopic == topicList.length" @click="submitAnswer">
                    提交答案
                </div>
            </div>
        </div>
        <div class="examL_ExamPage" ref="cardPage">
            <header-fix :title="'答题卡'" :fixed="false">
                <i class="examL_GoBack" slot="left" @click="closeCard"></i>
            </header-fix>
            <div class="examL_ExamPage_titlelist">
                <ul>
                    <li v-for="(item, key, index) in cardList" :key="index">
                        <exam-title-list v-if="item.length > 0" :data="item" :keys="key" :navigationWay="navigationWay"></exam-title-list>
                    </li>
                </ul>
            </div>
            <div class="examL_ExamPage_submitbutton">
                <div class="examL_ExamPage_button" @click="submitAnswer">
                    提交答案
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { headerFix, examTitleList } from '../components'
import { GetExamInfo, PostExam } from '../service/getData'
import { MessageBox } from 'mint-ui'
export default {
    name: 'examText',
    data () {
        return {
            Ticket: '',
            topicList: [],
            timeLimit: '',
            checkFlag: '',
            minLimit: '00',
            secLimit: '00',
            timeRobot: '',
            choose: [],
            topicType: 0,
            singleResult: '',
            moreResult: [],
            textAnswer: '',
            currentTopic: 1,
            allTopic: 10,
            maxScore: 100,
            passScore: 60,
            cardList: {
                singleList: [],
                moreList: [],
                textList: []
            }
        }
    },
    mounted () {
        this.calculate()
        this.render()
    },
    methods: {
        calculate () {
            this.$refs.examText.style.height = window.screen.height + 'px'
        },
        adviseClose () { // 关闭头部消息提示
            this.$refs.examT_BodyPart_advise.style.height = '0px'
        },
        singleSelect (index) { // 单选结果临时存储，以及答案选择样式改变
            this.singleResult = this.choose[index].ItemFlag
            this.cardList.singleList[this.currentTopic - 1].result = this.singleResult
            this.choose.forEach(item => {
                item.cssStyle = false
            })
            this.choose[index].cssStyle = true
        },
        moreSelect (index) { // 多选结果临时存储，以及答案选择样式改变
            if (this.choose[index].cssStyle == false) {
                this.moreResult.push(this.choose[index].ItemFlag)
                this.choose[index].cssStyle = true
            } else {
                this.moreResult = this.moreResult.filter((item) => {
                    return item != this.choose[index].ItemFlag
                })
                this.choose[index].cssStyle = false
            }
            if (this.moreResult.length > 0) {
                this.cardList.moreList[this.currentTopic - (1 + this.cardList.singleList.length)].result = this.moreResult
            } else {
                this.cardList.moreList[this.currentTopic - (1 + this.cardList.singleList.length)].result = 'no answer'
            }
        },
        textInput () { // 简答题输入时判断内容是否存在
            if (this.textAnswer.length > 0) {
                this.cardList.textList[this.currentTopic - (1 + this.cardList.singleList.length + this.cardList.moreList.length)].result = this.textAnswer
            } else {
                this.cardList.textList[this.currentTopic - (1 + this.cardList.singleList.length + this.cardList.moreList.length)].result = 'no answer'
            }
        },
        openCard () { // 切换答题卡页面
            this.$refs.cardPage.style.transform = 'rotateY(0deg)'
            this.$refs.cardPage.style.opacity = '1'
        },
        closeCard () { // 切回考试题目页面
            this.$refs.cardPage.style.transform = 'rotateY(-90deg)'
            this.$refs.cardPage.style.opacity = '0'
        },
        navigationWay (index) {
            this.saveAnswer()
            this.currentTopic = index
            this.analyseType()
            this.closeCard()
        },
        analyseType () { // 分析题目类型，并且读取答案填写记录
            if (this.topicList[this.currentTopic - 1].Type == 'Single') {
                this.topicType = 1 // 修改题目显示类型
                this.choose = this.topicList[this.currentTopic - 1].QuestionsItems // 修改题目选项内容
                this.choose.forEach((item, index) => {
                    let obj = {
                        ItemFlag: item.ItemFlag,
                        Name: item.Name,
                        cssStyle: false
                    }
                    if (obj.ItemFlag == this.topicList[this.currentTopic - 1].result) {
                        obj.cssStyle = true
                    }
                    this.choose.splice(index, 1, obj)
                })
                this.topicList[this.currentTopic - 1].result == 'no answer' ? this.singleResult = '' : this.singleResult = this.topicList[this.currentTopic - 1].result
            } else if (this.topicList[this.currentTopic - 1].Type == 'More') {
                this.topicType = 2 // 修改题目显示类型
                this.choose = this.topicList[this.currentTopic - 1].QuestionsItems // 修改题目选项内容
                let jugement = Array.isArray(this.topicList[this.currentTopic - 1].result) // 判断之前时候有记录
                if (jugement) { // 如果有
                    this.choose.forEach((item, index) => { // 重置题目选择类型数据格式
                        let obj = {
                            ItemFlag: item.ItemFlag,
                            Name: item.Name,
                            cssStyle: false
                        }
                        if (this.topicList[this.currentTopic - 1].result.includes(item.ItemFlag)) {
                            obj.cssStyle = true
                        }
                        this.choose.splice(index, 1, obj) // 直接修改vue无法察觉到数组中内容被修改，需要通过数组内容的删减和增加来实现*
                    })
                    this.moreResult = this.topicList[this.currentTopic - 1].result
                } else { // 如果没有
                    this.choose.forEach((item, index) => { // 重置题目选择类型数据格式
                        let obj = {
                            ItemFlag: item.ItemFlag,
                            Name: item.Name,
                            cssStyle: false
                        }
                        this.choose.splice(index, 1, obj)
                    })
                }
            } else if (this.topicList[this.currentTopic - 1].Type == 'Text') {
                this.topicType = 3
                if (this.topicList[this.currentTopic - 1].result != 'no answer') {
                    this.textAnswer = this.topicList[this.currentTopic - 1].result
                }
            }
        },
        saveAnswer () { // 答案存储
            if (this.topicList[this.currentTopic - 1].Type == 'Single') {
                let reslove = this.singleResult ? this.singleResult : 'no answer'
                if (reslove == 'no answer') { // 总共有三种可能性，没选；选一样；选不一样；这里是针对没选
                    return false
                } else { // 这里是针对选一样和选不一样
                    this.topicList[this.currentTopic - 1].result = reslove
                }
                this.singleResult = ''
            } else if (this.topicList[this.currentTopic - 1].Type == 'More') {
                let reslove = this.moreResult.length == 0 ? 'no answer' : this.moreResult
                if (reslove == 'no answer') {
                    return false
                } else {
                    this.topicList[this.currentTopic - 1].result = reslove
                }
                this.moreResult = []
            } else if (this.topicList[this.currentTopic - 1].Type == 'Text') {
                this.topicList[this.currentTopic - 1].result = this.textAnswer ? this.textAnswer : 'no answer'
                this.textAnswer = ''
            }
        },
        lastTopic () { // 切换上一题
            if (this.currentTopic == 1) {
                MessageBox('提示', '这已经是第一题了')
                return false
            }
            this.saveAnswer()
            this.currentTopic = --this.currentTopic
            this.analyseType()
        },
        nextTopic () { // 切换下一题
            this.saveAnswer()
            this.currentTopic = ++this.currentTopic
            this.analyseType()
        },
        timeReduce () {
            let timer = sessionStorage.getItem('SL')
            let endTimer
            if (timer) {
                endTimer = timer
            } else {
                endTimer = new Date().getTime()
                endTimer = this.timeLimit * 60 * 1000 + endTimer
                endTimer = new Date(endTimer)
                sessionStorage.setItem('SL', endTimer)
            }
            let now = new Date().getTime()
            endTimer = new Date(endTimer).getTime()
            let remain = (endTimer - now) / 1000
            if (remain >= 0) {
                this.minLimit = Math.floor(remain / 60 % 60)
                this.secLimit = Math.floor(remain % 60)
                if (this.minLimit < 10) {
                    this.minLimit = '0' + this.minLimit
                }
                if (this.secLimit < 10) {
                    this.secLimit = '0' + this.secLimit
                } 
            } else {
                clearInterval(this.timerRobot)
                this.submitAnswer()
                MessageBox.alert('操作成功').then(action => {
                    console.log('aaa')
                })    
            }
        },
        async render () { // 初始页面渲染
            let msg = await GetExamInfo({
                Exam_id: 54
            })
            console.log(msg)
            let topic = msg.Data.Type1Questions.concat(msg.Data.Type2Questions)
                topic = topic.concat(msg.Data.Type3Questions)
            topic.forEach(item => {
                item.result = 'no answer'
            })
            msg.Data.Type1Questions.forEach((item, index) => {
                item.Sequence = index + 1
            })
            msg.Data.Type2Questions.forEach((item, index) => {
                item.Sequence = msg.Data.Type1Questions.length + index + 1
            })
            msg.Data.Type3Questions.forEach((item, index) => {
                item.Sequence = msg.Data.Type1Questions.length + msg.Data.Type2Questions.length + index + 1
            })
            this.topicList = topic
            this.timeLimit = msg.Data.Exam.TimeLimit
            this.checkFlag = msg.Data.Exam.checkFlag
            this.Ticket = msg.Data.Ticket
            this.cardList.singleList = msg.Data.Type1Questions
            this.cardList.moreList = msg.Data.Type2Questions
            this.cardList.textList = msg.Data.Type3Questions
            this.maxScore = msg.Data.Exam.TotalScore
            this.passScore = msg.Data.Exam.PassingScore
            this.analyseType()
            this.allTopic = this.topicList.length
            // let datas = new Date()
            // sessionStorage.setItem('upDate', JSON.stringify(datas))
            if (this.timeLimit > 0) {
                this.timerRobot = setInterval(this.timeReduce, 1000) 
            } else {
                this.minutesLimited = '∞'
                this.secoundLimited = '∞'
            }
        },
        async submitAnswer () {
            let arr = []
            let now = new Date().getTime()
            let end = sessionStorage.getItem('SL')
                end = new Date(end).getTime()  
            let spendTime = (end - now) / 1000
            this.topicList.forEach((item, index) => {
                if (Array.isArray(item.result)) {
                    item.result.sort()
                    let result = item.result.join('')
                    arr.push({
                        QuestionId: item.Id,
                        Answer: result
                    })
                } else {
                    if (item.result == 'no answer') {
                        arr.push({
                            QuestionId: item.Id,
                            Answer: ''
                        })
                    } else {
                        arr.push({
                            QuestionId: item.Id,
                            Answer: item.result
                        })
                    }
                }
            })
            if (spendTime > 0) {
                spendTime = Math.floor(this.timeLimit * 60 - spendTime)
            } else if (spendTime <= 0) {
                spendTime = this.TimeLimits * 60
            }
            let msg = await PostExam({
                ExamId: 54, // this.EXAM_ID最后修改
                Ticket: this.Ticket,
                PassExam: '',
                Time: spendTime,
                Data: arr
            })
            console.log(msg)
            if (msg.Type == 1) {
                sessionStorage.removeItem('SL')
                if (msg.Value == 0) { // 成功不显示结果
                    MessageBox.alert('交卷成功,该试卷不显示结果').then(action => {
                        this.$router.push({ path: '/examtype' })
                    })
                    return false
                } 
                if (!this.checkFlag) { // 成功显示结果
                    // this.GET_EXAMID(this.EXAM_ID)
                    // this.GET_EXAMRESULT(msg.Value) // 获取后端返回状态码
                    // let textmsg = {
                    //     EXAMID: this.examId,
                    //     EXAMRESULT: this.examResultValue
                    // }
                    // this.$router.push({ path: '/examResult' })
                    // 等待result页面完成后对接
                } else { // 成功手动阅卷
                    MessageBox.alert('交卷成功,请等待阅卷').then(action => {
                        this.$router.push({ path: '/examtype' })
                    })
                }
            } else {
                this.$message.warning(msg.Message)
            }
        }
    },
    components: {
        headerFix,
        examTitleList
    }
}
</script>

<style lang="scss">
@import '../common/font/font.css';
@import "../style/mixin";
    .examText{
        position: relative;
        perspective:1000px;
        overflow: hidden;
        .examT_goBack{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: toRem(24px);
            height: toRem(42px);
            background: url('../assets/arti-rebackblank.png');
            background-size: 100%;
        }
        .examT_BodyPart{
            display: flex;
            height: 100%;
            flex-direction: column;
            background: #fff;
            .examT_BodyPart_banner{
                width:100%;
                height: toRem(260px);
                text-align: center;
                background: url('../assets/exam-textpaper.png');
                background-size: 100%; 
                position: relative;
                .examT_TimeInfor{
                    width: 100%;
                    position: absolute;
                    bottom: toRem(40px);
                    left: 0px;
                    .examT_LastTime{
                        font-size: toRem(30px);
                        font-family: 'heitong';
                        font-style: italic;
                        font-weight: bolder;
                        color: #fff;
                    }
                    .examT_TimeNum{
                        font-size: toRem(30px);
                        font-family: 'heitong';
                        font-style: italic;
                        font-weight: bolder;
                        color: #fff;
                    }
                }
            }  
            .examT_BodyPart_advise{
                width: 100%;
                height: toRem(80px);
                line-height: toRem(80px);
                padding: 0 toRem(32px);
                background: #fdf5e8;
                color: #ff9f03;
                display: flex;
                justify-content: space-between;
                transition: 0.3s;
                overflow: hidden;
                .examT_Advise_innertext{
                    font-size: toRem(36px);
                    font-style: italic;
                    font-weight: bold;
                }
                .examT_Advise_close{
                    width: toRem(26px);
                    height: toRem(26px);
                    display: inline-block;
                    background: url('../assets/exam-cross01.png') no-repeat;
                    background-size: 100%;
                }
            } 
            .examT_TopicPart{
                flex: 1;
                padding: toRem(40px) toRem(30px) 0;
                overflow: auto;
                .examT_TopicPart_singlechoose{
                    .examT_SingleChoose_Title{
                        margin-bottom: toRem(40px);
                        .examT_TopicLabel_blue{
                            color: #4674df;
                            margin-right: toRem(10px);
                        }
                    }
                    ul{
                        li{
                            width: 100%;
                            height: toRem(80px);
                            line-height: toRem(80px);
                            padding: 0 toRem(60px);
                            margin-bottom: toRem(30px);
                            border: 1px solid #efefef;
                            border-radius: toRem(80px);
                            background: #efefef;
                        }
                        .examT_SingleChoose_active{
                            color:#4a608c;
                            border-color:#4a608c;
                            background: #fff;
                        }
                    }
                }
                .examT_TopicPart_morechoose{
                    .examT_MoreChoose_Title{
                        margin-bottom: toRem(40px);
                        .examT_TopicLabel_red{
                            color: #e36355;
                            margin-right: toRem(10px);
                        }
                    }
                    ul{
                        li{
                            width: 100%;
                            padding: toRem(20px) toRem(60px);
                            margin-bottom: toRem(30px);
                            border: 1px solid #efefef;
                            border-radius: toRem(80px);
                            background: #efefef;
                        }
                        .examT_SingleChoose_active{
                            color:#4a608c;
                            border-color:#4a608c;
                            background: #fff;
                        }
                    }
                }
                .examT_TopicPart_writeanswer{
                    .examT_WriteAnswer_Title{
                        margin-bottom: toRem(40px);
                        .examT_TopicLabel_yellow{
                            color:#e8b22c;
                            margin-right: toRem(10px);
                        }
                    }
                    .examT_TopicPart_answerwrite{
                        textarea{
                            border: 1px solid #888;
                            padding: toRem(10px) toRem(20px);
                            margin-bottom: toRem(30px);
                        }
                    }
                }
            }
            .examT_ExamTopic_answerlist{
                display: flex;
                flex-direction: row-reverse;
                .examT_AnswerList_button{
                    width: toRem(112px);
                    height: toRem(112px);
                    border-radius: toRem(112px);
                    background: #4674df;
                    position: relative;
                    box-shadow: 0 0 toRem(20px) #666;
                    .examT_AnswerList_buttonicon{
                        width: toRem(58px);
                        height: toRem(49px);
                        background: url('../assets/exam-topicList.png');
                        background-size: 100%;
                        position: absolute;
                        top: 50%;
                        right: 50%;
                        transform: translate(50%, -50%);
                    }
                }
            }
        }
        .examT_BottomPart{
            display: flex;
            justify-content: space-between;
            width: 100%;
            line-height: toRem(80px);
            padding: 0 toRem(32px) toRem(40px);
            .examT_BottomPart_buttonstyle{
                width: toRem(200px);
                height: toRem(80px);
                line-height: toRem(80px);
                text-align: center;
                border: 1px solid #4a608c;
                background:#fff;
                border-radius: toRem(80px);
                font-weight: 600;
                color: #4a608c;
            }
            .examT_BottomPart_submitanswer{
                width: toRem(200px);
                height: toRem(80px);
                line-height: toRem(80px);
                text-align: center;
                border: 1px solid #4a608c;
                color: #fff;
                background: #4a608c;
                border-radius: toRem(80px);
                font-weight: 600;
            }
            .examT_BottomPart_currenttopic{
                font-size: toRem(50px);
                font-weight: 600;
                color: #4674df;
            }
        }
        .examL_ExamPage{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            overflow: auto;
            display: flex;
            flex-direction: column;
            transform: rotateY(-90deg);
            transform-origin: left center;
            opacity: 0;
            transition: 0.5s;
            z-index: 10;
            .examL_GoBack{
                width: toRem(24px);
                height: toRem(42px);
                background:url('../assets/tra_turnback.png');
                background-size: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            .examL_ExamPage_titlelist{
                flex: 1;
                overflow: auto;
                & > ul{
                    & > li{
                        width: toRem(685px);
                        margin: 0 auto;
                    }
                }
            }
            .examL_ExamPage_submitbutton{
                width: 100%;
                height: toRem(193px);
                position: relative;
                .examL_ExamPage_button{
                    width: toRem(630px);
                    height: toRem(80px);
                    line-height: toRem(80px);
                    color: #fff;
                    background: #4674df;
                    border-radius: toRem(80px);
                    text-align: center;
                    font-size: toRem(35px);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
</style>
