<template>
    <div class="studyCircleStage container_top">
        <header-fix title="生活" fixed>
            <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <section class="active-circle">
            <div class="title">
                活跃圈子
            </div>
            <swiper :options="srSwiperOption1">
                <swiper-slide >
                    <router-link to="/">
                        <div class="pic">
                            <img src="../assets/circle-img1.png" alt="">
                            <p class="num"><img src="../assets/num1-icon.png" alt=""></p>
                        </div>
                        <div class="text">
                            <p class="name">#无极之道</p>
                            <p class="num">6条动态</p>
                        </div>
                    </router-link>
                </swiper-slide>
                <swiper-slide >
                    <router-link to="/">
                        <div class="pic">
                            <img src="../assets/circle-img1.png" alt="">
                            <p class="num"><img src="../assets/num1-icon.png" alt=""></p>
                        </div>
                        <div class="text">
                            <p class="name">#无极之道</p>
                            <p class="num">6条动态</p>
                        </div>
                    </router-link>
                </swiper-slide>
                <swiper-slide >
                    <router-link to="/">
                        <div class="pic">
                            <img src="../assets/circle-img1.png" alt="">
                            <p class="num"><img src="../assets/num1-icon.png" alt=""></p>
                        </div>
                        <div class="text">
                            <p class="name">#无极之道</p>
                            <p class="num">6条动态</p>
                        </div>
                    </router-link>
                </swiper-slide>
                <swiper-slide >
                    <router-link to="/">
                        <div class="pic">
                            <img src="../assets/circle-img1.png" alt="">
                            <p class="num"><img src="../assets/num1-icon.png" alt=""></p>
                        </div>
                        <div class="text">
                            <p class="name">#无极之道</p>
                            <p class="num">6条动态</p>
                        </div>
                    </router-link>
                </swiper-slide>
            </swiper>
        </section>
        <section class="content">
            <div class="title">
                <ul>
                    <li class="actived">
                        推荐
                    </li>
                    <li>
                        全部
                    </li>
                </ul>
            </div>
            <div class="list">
                <ul>
                    <li>
                        <div class="title">
                            <div class="hd">
                                <div class="hd-left">
                                    <img src="../assets/headImg-per.png" alt=""> <span>友邻有伴</span>
                                </div>
                                <i class="webapp webapp-right" slot="right"></i>
                            </div>
                            <div class="bd">
                                <p class="nt"><span class="name">张大春</span> <span class="time">2019年09月26日创建</span></p>
                                <p class="num"><img src="../assets/eye-img1.png" alt="">2198</p>
                            </div>
                        </div>
                        <div class="con">
                            <img src="../assets/banner03.png" alt="" class="cover">
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
                srSwiperOption1: {
                    slidesPerView: 'auto',
                    grabCursor: true,
                    loop: true,
                    freeMode: true,
                    freeModeMomentum: false
                }
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

    .studyCircleStage{
        background: #fff;
        .header{
            border-bottom: none;
        }
        .active-circle{
            padding-top: toRem(20px);
            padding-bottom: toRem(50px);
            .title{
                padding-left: toRem(30px);
                font-size: 20px;
                color: #333;
                font-weight: bold;
            }
            .swiper-container{
                margin-top: toRem(40px);
                width: toRem(720px);
                margin-left: toRem(30px);
                height: toRem(250px);
                .swiper-wrapper{
                    .swiper-slide{
                        width: toRem(285px);
                        border-radius: 5%;
                        margin-right: toRem(20px);
                        a{
                            .pic{
                                position: relative;
                                width: toRem(285px);
                                height: toRem(150px);
                                img{
                                    position: absolute;
                                    width: toRem(285px);
                                    height: toRem(150px);
                                    top: 0;
                                }
                                p{
                                    position: absolute;
                                    top: toRem(10px);
                                    left: toRem(10px);
                                    img{
                                        width: toRem(60px);
                                        height: toRem(30px);
                                    }
                                }
                            }
                            .text{
                                .name{
                                    margin-top: toRem(20px);
                                    color: #333;
                                    font-size: 15px;
                                    font-weight: bold;
                                }
                                .num{
                                    margin-top: toRem(10px);
                                    color: #a9bcc7;
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .content{
            border-top: toRem(20px) solid $fill-body;
            padding: 0 toRem(30px);
            .title{
                ul{
                    @extend %clearFix;
                    li{
                        float: left;
                        height: toRem(120px);
                        line-height: toRem(120px);
                        font-size: 15px;
                        margin-right: toRem(50px);
                        &.actived{
                            font-size: 20px;
                            font-weight: bold;
                        }
                    }
                }
            }
            .list{
                ul{
                    li{
                        box-shadow: 0 0 toRem(10px) #dedede;
                        .title{
                            padding: toRem(40px) toRem(30px) 0 toRem(30px);
                            .hd{
                                display: flex;
                                justify-content: space-between;
                                .hd-left{
                                    img{
                                        width: toRem(42px);
                                        height: toRem(42px);
                                        vertical-align: bottom;
                                        margin-right: toRem(20px);
                                    }
                                    span{
                                        font-size: 20px;
                                        color: #333;
                                        font-weight: bold;
                                    }
                                }
                                i{
                                    color: #000;
                                }
                            }
                            .bd{
                                margin-top: toRem(15px);
                                display: flex;
                                justify-content: space-between;
                                .nt{
                                    color: #a9bcc7;
                                }
                                .num{
                                    img{
                                        width: toRem(27px);
                                        height: toRem(18px);
                                        margin-right: toRem(10px);
                                        vertical-align: baseline;
                                    }
                                    color: #a9bcc7;
                                }
                            }
                        }
                        .con{
                            padding: toRem(30px);
                            img{
                                width: toRem(630px);
                                height: toRem(335px);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
