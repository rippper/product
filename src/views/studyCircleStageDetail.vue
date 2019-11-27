<template>
    <div class="studyCircleStageDetail">
        <div class="brief-intro">
            <div class="theme"
                :style="{background: `url(${coverImgUrl}) no-repeat left center/100% 100%`}"
            >
            <!-- :style="backgroundImage: url()" -->
                <p class="theme-text1">#{{circleDetail.Name}}</p>
                <p class="theme-text2">{{circleDetail.Remark}}</p>
                <p class="theme-text3">
                    <span class="content-num">{{circleDetail.ArticleCount}}篇内容</span>
                    <span class="view-num">{{circleDetail.ClickCount}}人浏览</span>
                </p>
            </div>
            <div class="account">
                <error-img :src="circleDetail.UserImg" :error-src="Avatar" class="accountImg"></error-img>
                <div class="nt">
                    <p class="name">群主：{{circleDetail.UserName}}</p>
                    <p class="time">{{circleDetail.CreateDate|dateFilter('yyyy年MM月dd日')}}创建</p>
                </div>
            </div>
        </div>
        <section class="dynamics">
            <div class="title">
                全部动态
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in articleInfoList" :key="item.Id">
                        <div class="hd">
                            <error-Img :src="item.Img" :error-src="Avatar" class="headImg"></error-Img>
                            <div class="nt">
                                <div class="name">
                                    {{item.UserName}}
                                </div>
                                <div class="time">
                                    {{item.CreateDate}}
                                </div>
                            </div>
                        </div>
                        <div class="bd">
                            <div class="text">
                                {{item.Content}}
                            </div>
                            <div class="imgCon" v-if="item.CircleEnclosure.length > 0">
                                <ul>
                                    <li v-for="item1 in item.CircleEnclosure" :key="item1.Id">
                                        <img :src="item1.Url" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ft">
                            <div class="num">{{item.AssistCount}}人点赞</div>
                            <div class="handle">
                                <p class="handle-praise" @click="addAssist(item)" v-if="item.IsAssist == 0"><img src="../assets/praise-white.png" alt=""></p>
                                <p class="handle-praise" @click="deleteAssist(item)" v-else><img src="../assets/praise-red.png" alt=""></p>
                                <p class="handle-mes" @click="showCommentBox(item)"><img src="../assets/message-white.png" alt="">{{item.CommentCount}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <mt-popup
            position="bottom"
            v-model="commentBox"
            class="circleCommentBox"
            :closeOnClickModal="false"
            > 
            <circle-comment-box 
                :close-box="closeBox" 
                :circle-comment-id="circleCommentId" 
                :circle-comment-list="circleCommentList"
                :comment-count="commentCount"
                :get-comment-box-list="getCommentBoxList"
                :open-detail="openDetail"
                :comment-input-state="commentInputState"
                :typeName="typeName"
                @emitstate="emitstate"
                >
            </circle-comment-box>
        </mt-popup>
        <mt-popup
            position="right"
            v-model="commentListDetail"
            class="commentListDetail"
            >
            <comment-list-box 
                :back-comment="backComment"
                :comment-detail-list="commentDetailList"
            >
            </comment-list-box>
        </mt-popup>
        <div class="circleArticleAdd">
            <router-link :to="{path: '/studyCirclePublish', query: {id: id}}">
                <img src="../assets/circle-addBtn.png" alt="">
            </router-link>
        </div>
    </div>
</template>

<script>
    import Avatar from '../assets/headImg-default.png'
    import { Indicator } from 'mint-ui'
    import { CircleDetail, CircleArticleList, AddUserAssist, DelUserAssist, CommentList } from '../service/getData'
    import defaultImg from '../assets/no_data@2x.png'
    export default {
        data () {
            return {
                circleDetail: [],
                coverImgUrl: '',
                pageNum: 1,
                articleInfoList: [],
                noData: false,
                noMoreData: false,
                Avatar: Avatar,
                loading: false,
                commentCount: null,
                commentListDetail: false,
                commentDetailpid: null,
                commentDetailList: [],
                commentInputState: true,
                statec: true,
                circleCommentList: [],
                circleCommentId: null,
                commentBox: false,
                TypeId: null,
                id: '',
                boxArr: null,
                typeName: 'CircleArticle'
            }
        },
        created () {
            this.id = this.$route.query.id
        },
        mounted () {
            this.getCircleDetail()
            this.getCircleArticleList()
        },
        methods: {
            // 获取学习圈详情
            async getCircleDetail () {
                let data = await CircleDetail({ Id: this.id })
                if (data.IsSuccess) {
                    this.circleDetail = data.Data
                    this.coverImgUrl = data.Data.Img
                    if (!this.coverImgUrl) {
                        this.coverImgUrl = defaultImg
                    }
                }
            },
            // 学习圈 帖子全部动态
            async getCircleArticleList () {
                Indicator.open()
                this.loading = true
                let data = await CircleArticleList({
                    Sort: 'Id',
                    Order: 'desc',
                    Page: this.pageNum,
                    Rows: 5,
                    CircleId: this.id
                })
                Indicator.close()
                this.loading = false
                if (data.IsSuccess) {
                    let arr = data.Data
                    if (arr.length == 0 && this.pageNum > 1) {
                        this.noMoreData = true
                        return
                    }
                    if (arr.length == 0 && this.pageNum == 1) {
                        this.noData = true
                        return
                    }
                    this.pageNum += 1
                    this.articleInfoList = this.articleInfoList.concat(arr)
                }
            },
            // 添加点赞
            async addAssist (item) {
              let data = await AddUserAssist({
                  ObjType: 'CircleArticle',
                  ObjId: item.Id
              })
              if (data.IsSuccess) {
                  item.AssistCount += 1
                  item.IsAssist = 1
              }
            },
            // 删除点赞
            async deleteAssist (item) {
                let data = await DelUserAssist({
                    ObjType: 'CircleArticle',
                    ObjId: item.Id
                })
                if (data.IsSuccess) {
                    item.AssistCount -= 1
                    item.IsAssist = 0
                }
            },
            showCommentBox (item) {
                let body = document.querySelector('body')
                body.addEventListener('click', this.catchHandle, false) 
                this.commentBox = true
                body.style.overflow = 'hidden'
                body.style.height = '100vh'
                this.boxArr = item
                this.circleCommentId = item.Id
                // console.log(this.circleCommentId)
                this.getCommentBoxList()
            },
            catchHandle () {
                this.commentInputState = true
            },
            closeBox () {
                let body = document.querySelector('body')
                this.commentBox = false
                this.boxArr = {}
                body.style.overflow = 'auto'
                body.style.height = 'auto'
                body.removeEventListener('click', this.catchHandle, false)
            },
            emitstate (val) {
                this.commentInputState = val
            },
            // 获取评论列表
            async getCommentBoxList () {
                if (!this.boxArr.Id) {
                return
                }
                Indicator.open()
                this.loading = true
                let data = await CommentList({
                    MainId: this.boxArr.Id,
                    Type: 'CircleArticle',
                    ParentId: 0,
                    Sort: 'Id',
                    Order: 'desc',
                    Page: this.boxArr.page,
                    Rows: 5
                })
                this.loading = false
                Indicator.close()
                if (data.IsSuccess) {
                    this.circleCommentList = data.Data.List
                    this.commentCount = data.Data.TotalCount
                }
            },
            backComment () {
                this.commentListDetail = false
                this.showCommentBox(this.boxArr)
            },
            openDetail (val) {
                this.closeBox()
                this.commentDetailpid = val.Id
                this.commentListDetail = true
                let body = document.querySelector('body')
                body.removeEventListener('click', this.catchHandle, false)
                this.$nextTick(() => {
                this.circleCommentList.forEach((item) => {
                    if (item.Id == this.commentDetailpid) {
                    this.commentDetailList = item.List
                    }
                })
                })
            }
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
                background-repeat: no-repeat;
                background-size: 100% 100%;
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
        .circleCommentBox{
          top: 5rem;
          width: 100%;
          .commentBox{
            .cb-con{
              height: toRem(750px);
            }
          }
        }
        .commentListDetail{
            &.mint-popup-right{
            width: 100%;
            height: 100vh;
            }
        }
        .circleArticleAdd{
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
