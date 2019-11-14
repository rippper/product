<template>
    <div class="studyCircleStageDetail">
        <div class="brief-intro">
            <div class="theme">
                <p class="theme-text1">#漫长深秋</p>
                <p class="theme-text2">热爱生活、热爱摄影、热爱旅游</p>
                <p class="theme-text3">
                    <span class="content-num">23篇内容</span>
                    <span class="view-num">2198人浏览</span>
                </p>
            </div>
            <div class="account">
                <img src="../assets/headImg-per.png" alt="" class="accountImg">
                <div class="nt">
                    <p class="name">群主：张丹晨</p>
                    <p class="time">2019年09月26日创建</p>
                </div>
            </div>
        </div>
        <section class="dynamics">
            <div class="title">
                全部动态
            </div>
            <div class="content">
                <ul>
                    <li>
                        <div class="hd">
                            <img src="../assets/headImg-per2.png" alt="" class="headImg">
                            <div class="nt">
                                <div class="name">
                                    周耀炳
                                </div>
                                <div class="time">
                                    2019-09-26 10:38:12
                                </div>
                            </div>
                        </div>
                        <div class="bd">
                            <div class="text">
                                郭达 杰森斯坦森 男生 壁纸有要的拿走的参考...
                            </div>
                            <div class="imgCon">
                                <ul>
                                    <li>
                                        <img src="../assets/new-course-img1.png" alt="">
                                    </li>
                                    <li>
                                        <img src="../assets/new-course-img1.png" alt="">
                                    </li>
                                    <li>
                                        <img src="../assets/new-course-img1.png" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ft">
                            <div class="num">496人点赞</div>
                            <div class="handle">
                                <p class="handle-praise"><img src="../assets/praise-white.png" alt=""></p>
                                <p class="handle-mes"><img src="../assets/message-white.png" alt="">20</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created () {

        },
        mounted () {

        },
        methods: {

        },
        watch: {

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .studyCircleStageDetail{
        background: #fff;
        height: 100vh;
        .brief-intro{
            .theme{
                background: url("../assets/sc-detail-bg.png") no-repeat;
                background-size: 100% toRem(420px);
                @extend %clearFix;
                padding-bottom: toRem(25px); 
                .theme-text1{
                    color: #fff;
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    padding: toRem(150px) toRem(30px) 0;
                }
                .theme-text2{
                    margin-top: toRem(30px);
                    text-align: center;
                    color: #fff;
                    font-size: 12px;
                }
                .theme-text3{
                    float: right;
                    color: #fff;
                    margin: toRem(100px) toRem(30px) 0;
                    .content-num{
                        margin-right: toRem(25px);
                    }
                    .view-num{
                    }
                }
            }
            .account{
                display: flex;
                padding: 0 toRem(30px);
                padding-bottom: toRem(45px);
                .accountImg{
                    width: toRem(124px);
                    height: toRem(124px);
                    border: 5px solid #fff;
                    border-radius: 50%;
                    margin-top: toRem(-32px);
                }
                .nt{
                    margin-left: toRem(20px);
                    .name{
                        color: #333;
                        font-weight: bold;
                        font-size: 15px;
                        padding-top: toRem(15px);
                    }
                    .time{
                        margin-top: toRem(5px);
                        color: #a9bcc7;
                    }
                }
            }
        }
        .dynamics{
            border-top: toRem(20px) solid $fill-body;
            background: #fff;
            padding-top: toRem(35px);
            .title{
                padding-left: toRem(30px);
                font-size: 20px;
                color: #333;
                font-weight: bold;
            }
            .content{
                ul{
                    li{
                        margin: toRem(50px) toRem(30px) 0 toRem(30px);
                        border-radius: toRem(10px);
                        box-shadow: 0 0 toRem(10px) #dedede;
                        position: relative;
                        border:1px solid transparent;
                        .hd{
                            display: flex;
                            padding: 0 toRem(30px);
                            margin-top: toRem(-20px);
                            .headImg{
                            width: toRem(124px);
                            height: toRem(124px);
                            border-radius: 50%;
                            }
                            .nt{
                            margin-top: toRem(40px);
                            margin-left: toRem(30px);
                            .name{
                                font-size: 20px;
                                font-weight: bold;
                                color: #333;
                            }
                            .time{
                                margin-top: toRem(10px);
                                color: #999;
                            }
                            }
                        }
                        .bd{
                            margin-top: toRem(30px);
                            padding: 0 toRem(30px);
                            .text{
                            font-size: 14px;
                            color: #333;
                            @include ellipsis_two(1);
                            }
                            ul{
                            display: flex;
                            justify-content: space-around;
                            margin-top: toRem(25px);
                            li{
                                box-shadow: none;
                                margin: 0;
                                width: toRem(197px);
                                height: toRem(197px);
                                img{
                                width: toRem(197px);
                                height: toRem(197px);
                                }
                            }
                            }
                        }
                        .ft{
                            padding: toRem(30px);
                            display: flex;
                            justify-content: space-between;
                            .num{
                                color: #333;
                            }
                            .handle{
                                display: flex;
                                justify-content: space-between;
                                .handle-praise{
                                    img{
                                        width: toRem(24px);
                                        height: toRem(24px);
                                        margin-right: toRem(30px);
                                        vertical-align: inherit;
                                    }
                                }
                                .handle-mes{
                                    img{
                                        width: toRem(24px);
                                        height: toRem(24px);
                                        margin-right: toRem(10px);
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
