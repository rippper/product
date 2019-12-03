<template>
    <div class="studyCircleStage container_top">
        <header-fix :title="title" fixed>
            <i class="webapp webapp-left" @click="goBack" slot="left"></i>
        </header-fix>
        <section class="active-circle">
            <div class="title">
                活跃圈子
            </div>
            <swiper :options="srSwiperOption1">
                <swiper-slide v-for="(item, index) in circleHotInfoList" :key="item.Id">
                    <router-link :to="{path: '/studyCircleStageDetail', query:{id: item.Id}}">
                        <div class="pic">
                            <error-img :src="item.Img" :error-src="Avatar"></error-img>
                            <p class="num">
                                <img src="../assets/num1-icon.png" alt="" v-if="index == 0">
                                <img src="../assets/num2-icon.png" alt="" v-if="index == 1">
                                <img src="../assets/num3-icon.png" alt="" v-if="index == 2">
                            </p>
                        </div>
                        <div class="text">
                            <p class="name">#{{item.Name}}</p>
                            <p class="num">{{item.ArticleCount}}条动态</p>
                        </div>
                    </router-link>
                </swiper-slide>
               
            </swiper>
        </section>
        <section class="content">
            <div class="title">
                <ul>
                    <li class="tagLi actived" @click="newsListCtr(1)">
                        推荐
                    </li>
                    <li class="tagLi" @click="newsListCtr(2)">
                        全部
                    </li>
                </ul>
            </div>
            <section
                v-infinite-scroll="getCircleInfoList"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="immediate"
                infinite-scroll-distance="10"
                v-if="showList"
            >
                <div class="list">
                    <ul>
                        <li v-for="item in circleInfoList1" :key="item.Id">
                            <router-link :to="{path: '/studyCircleStageDetail', query: {id: item.Id}}">
                                <div class="title">
                                    <div class="hd">
                                        <div class="hd-left">
                                            <img :src="item.UserImg" alt=""> <span>{{item.Name}}</span>
                                        </div>
                                        <i class="webapp webapp-right" slot="right"></i>
                                    </div>
                                    <div class="bd">
                                        <p class="nt"><span class="name">{{item.UserName}}</span> <span class="time">{{item.CreateDate|dateFilter('yyyy年MM月dd日')}}创建</span></p>
                                        <p class="num"><img src="../assets/eye-img1.png" alt="">{{item.ClickCount}}</p>
                                    </div>
                                </div>
                                <div class="con">
                                    <error-img :src="item.Img" :error-src="Avatar" class="cover"></error-img>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="noData" v-if="noData">
                   <img src="../assets/no_data@2x.png" alt="">
                </div>
                <div class="noMoreData" v-if="noMoreData">
                    没有更多数据啦
                </div>
            </section>
            <section
                v-infinite-scroll="getCircleInfoList2"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="immediate"
                infinite-scroll-distance="10"
                v-if="localList"
            >
                <div class="list">
                    <ul>
                        <li v-for="item in circleInfoList1" :key="item.Id">
                            <router-link :to="{path: '/studyCircleStageDetail', query: {id: item.Id}}">
                                <div class="title">
                                    <div class="hd">
                                        <div class="hd-left">
                                            <img :src="item.UserImg" alt=""><span>{{item.Name}}</span>
                                        </div>
                                        <i class="webapp webapp-right" slot="right"></i>
                                    </div>
                                    <div class="bd">
                                        <p class="nt"><span class="name">{{item.UserName}}</span> <span class="time">{{item.CreateDate|dateFilter('yyyy年MM月dd日')}}创建</span></p>
                                        <p class="num"><img src="../assets/eye-img1.png" alt="">{{item.ClickCount}}</p>
                                    </div>
                                </div>
                                <div class="con">
                                    <error-img :src="item.Img" :error-src="Avatar" class="cover"></error-img>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="noData" v-if="noData1">
                   <img src="../assets/no_data@2x.png" alt="">
                </div>
                <div class="noMoreData" v-if="noMoreData1">
                    没有更多数据啦
                </div>
            </section>
        </section>
        <div class="circleAdd">
            <img src="../assets/circle-addBtn.png" alt="" @click="linkToDetail">
        </div>
    </div>
</template>

<script>
    import { CircleInfoList, CircleHotInfoList } from '../service/getData'
    import Avatar from '../assets/noCourse.png'
    import { Indicator } from 'mint-ui'
    export default {
        data () {
            return {
                title: '',
                srSwiperOption1: {
                    slidesPerView: 'auto',
                    grabCursor: true,
                    loop: true,
                    freeMode: true,
                    freeModeMomentum: false
                },
                TypeId: '',
                circleInfoList1: [],
                circleInfoList2: [],
                page1: 1,
                page2: 1,
                loading: false,
                immediate: false,
                noMoreData: false,
                noData: false,
                noMoreData1: false,
                noData1: false,
                showList: true,
                localList: false,
                circleHotInfoList: [],
                Avatar
            }
        },
        created () {
            this.title = this.$route.query.title 
            this.TypeId = this.$route.query.id
        },
        mounted () {
            this.getCircleInfoList()
            this.getCircleInfoList2()
            this.getCircleHotInfoList()
        },
        methods: {
            // 推荐 取点击量
            async getCircleInfoList () {
                Indicator.open()
                this.loading = true
                let data = await CircleInfoList({ TypeId: this.TypeId, Order: 'desc', Sort: 'ClickCount', page: this.page1, rows: 3 })
                this.loading = false
                Indicator.close()
                if (data.IsSuccess) {
                    let list = data.Data.List
                    if (list.length === 0 && this.page1 > 1) {
                        this.noMoreData = true
                        return 
                    }
                    if (list.length === 0 && this.page1 == 1) {
                        this.noData = true
                        return
                    }
                    this.circleInfoList1 = this.circleInfoList1.concat(list)
                    this.page1++
                }
            },
            // 全部 取时间
            async getCircleInfoList2 () {
                Indicator.open()
                this.loading = true
                let data = await CircleInfoList({ TypeId: this.TypeId, Order: 'desc', Sort: 'Id', page: this.page2, rows: 3 })
                this.loading = false
                Indicator.close()
                if (data.IsSuccess) {
                    let list = data.Data.List
                    // this.circleInfoList = data.Data.List
                    if (list.length === 0 && this.page2 > 1) {
                        this.noMoreData1 = true
                        return
                    }
                    if (list.length === 0 && this.page2 == 1) {
                        this.noData1 = true
                        return
                    }
                    this.circleInfoList2 = this.circleInfoList2.concat(list)
                    this.page2++
                }
            },
            newsListCtr (item) {
                let tagLi = document.getElementsByClassName('tagLi')
                for (let i = 0; i < tagLi.length; i++) {
                    tagLi[i].classList.remove('actived')
                    if (item == '1') {
                        this.showList = true
                        this.localList = false
                        tagLi[0].classList.add('actived')
                    } else if (item == '2') {
                        this.showList = false
                        this.localList = true
                        tagLi[1].classList.add('actived')
                    }
                }
            },
            // 活跃圈子
            async getCircleHotInfoList () {
                let data = await CircleHotInfoList({
                    Sort: 'Id',
                    Order: 'desc',
                    Page: 1,
                    Rows: 1000,
                    TypeId: this.TypeId
                })
                if (data.IsSuccess) {
                    this.circleHotInfoList = data.Data.List
                }
            },
            goBack () {
                let source = JSON.parse(localStorage.getItem('source'))
                
                if (source == 'iOS') {
                    alert(source)
                    window.webkit.messageHandlers.leaveWebview.postMessage('leaveWebview')
                } else if (source == 'android') {
                    alert(source)
                    window.sqjz.closePage('closePage')
                } else {
                    this.$router.push({ path: '/studycirclecenter' })
                }
            },
            linkToDetail () {
                let source = JSON.parse(localStorage.getItem('source'))
                if (source == 'iOS') {
                    window.webkit.messageHandlers.createCircle.postMessage('createCircle')
                } else if (source == 'android') {
                    window.sqjz.goToCreateCirclePage('opencreatepage')
                } else {
                    this.$router.push({ path: '/studyCircleCreate', query: { id: this.TypeId } })
                }
            }
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
            .noData{
                img{
                    padding: toRem(30px);
                    width: toRem(508px);
                    height: toRem(804px);
                }
            }
            .noMoreData{
                text-align: center;
                padding: toRem(30px);
                font-size: 16px;
            }
        }
        .circleAdd{
            position: fixed;
            right: toRem(30px);
            bottom: toRem(500px);
            img{
                width: toRem(130px);
                height: toRem(130px);
            }
        }
    }
</style>
