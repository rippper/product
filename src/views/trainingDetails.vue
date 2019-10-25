<template>
    <div class="trdet_Page">
        <headerFix
            :title="label"
            :fixed="true"
            :backType="backState"
        >
            <i class="trdet_Back" slot="left"></i>
        </headerFix>
        <div class="trdet_BodyHeight">
            <div class="trdet_BodyHeight_TitlePage">
                <img src="../assets/lingshi-tupian.jpg" alt="">
            </div>
            <div class="trdet_BodyHeight_WordsForm">
                <div class="trdet_WordsForm_CourseName">
                    <p v-text="title"></p>
                    <span>未报名</span>
                </div>
                <div class="trdet_WordsForm_Table">
                    <ul>
                        <li>
                            <div class="trdet_Tabel_Label">所属学校</div>
                            <div class="trdet_Tabel_Content">蓉浦学院</div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">所属专业</div>
                            <div class="trdet_Tabel_Content">省级培训班</div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">任课老师</div>
                            <div class="trdet_Tabel_Content">王者荣耀</div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">开课时间</div>
                            <div class="trdet_Tabel_Content">2019-06-29 ~ 2019-12-31</div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">上课地点</div>
                            <div class="trdet_Tabel_Content">教研9-201</div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">上课时间</div>
                            <div class="trdet_Tabel_Content">
                                <p>每周三</p>
                                <p>上午9:00--11:00</p>
                                <p>下午14:00--16:00</p>
                            </div>
                        </li>
                        <li>
                            <div class="trdet_Tabel_Label">班级简介</div>
                            <div class="trdet_Tabel_Content">1982年9月，为总结党的十一届三中全会以后取得的成就和经验，全面开创社会主义现代化建设的新局面，党的十二大在北京召开。这次大会确定了全面开创社会主义现代化建设新局面的纲领。邓小平同志在致大会开幕词时，第一次提出了“建设有中国特色的社会主义”的崭新命题。</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
import { headerFix } from '../components'
export default {
    name: 'trainingDetails',
    data () {
        return {
            label: '班级详情页',
            backState: true,
            title: '2019年第一次安全培训班'
        }
    },
    mounted () {
        window.addEventListener('scroll', this.scrollThing)
        this.scrollThing()
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.scrollThing)
    },
    methods: {
        scrollThing () {
            var t = document.documentElement.scrollTop || document.body.scrollTop
            if (t >= 200 && this.backState == true) {
                this.backState = false
            } else if (t < 200 && this.backState == false) {
                this.backState = true
            }
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
        height: 5000px;
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
                span{
                    width: toRem(82px);
                    height: toRem(44px);
                    line-height: toRem(44px);
                    text-align: center;
                    background: #b1b1b1;
                    color:#fff;
                    border-radius: 3px;
                    margin-left: toRem(15px);
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
                        }
                    }
                }
            }
        }
    }
}
</style>
