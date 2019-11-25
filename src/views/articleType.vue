/*
 * 文章分类 
 */
<template>
    <div class="articleType" ref="articleType">
        <div class="artic_Header">
            <div class="artic_LeftPart">
                <i class="artic_Reback" @click="ToHome()"></i>
            </div>
            <div class="artic_Center">
                文章分类
            </div>
            <div class="artic_RightPart">
                <i class="artic_Search"></i>
            </div>
        </div>
        <div class="artic_Body" ref="artic_Body">
            <div class="artic_SelectName" ref="artic_SelectName">
                <ul ref="artic_lineLength">
                    <li 
                        v-for="(item, index) in articleType" 
                        :key="index" 
                        :class="{ 'artic_BeSelect':item.Jugement }"
                        ref="artic_lineItem"
                    >
                    <span v-text="item.Name" @click="MakeSelect(index)"></span>
                    <span :class="{ 'artic_BeChoose':item.Jugement }"></span>
                    </li>
                </ul>
            </div>
            <div class="artic_SelectForMore" v-if="differType == false" @click="changeType">
                <span class="artic_ForTheMore"></span>
                <span class="artic_DeffType">分类</span>
            </div>
            <div class="artic_SelectForMore" v-else-if="differType == true" @click="changeType">
                <span class="artic_ForTheMoreYellow"></span>
                <span class="artic_DeffTypeYellow">分类</span>
            </div>
        </div>
        <div class="artic_DifferentType" :class="{ 'artic_show':differType }" ref="artic_DifferentType">
            <ul>
                <li 
                    v-for="(item, index) in articleType"
                    :key="index"
                    v-text="item.Name"
                    :class="{ 'artic_bechoose': item.Jugement }"
                    @click="MakeSelect(index)"
                ></li>
            </ul>
        </div>
        <div class="artic_MoreSelectType" ref="artic_MoreSelectType" v-show="differType" @click="closeBox"></div>
        <div 
            class="artic_NewsContent"
            ref="artic_NewsContent"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
        >
            <ul>
                <li v-for="(item, index) in articleData" :key="index" @click="linkToContent(item.ArticleId)">
                    <article-item :data="item"></article-item>
                </li>
            </ul>
            <div class="artic_LoadForMore" v-text="TheLoader">
            </div>
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue'
import { articleItem } from '../components'
import { InfiniteScroll } from 'mint-ui'
import { GetArticleChannelInfoList, GetArticleInfoList } from '../service/getData'

Vue.use(InfiniteScroll)

export default {
    name: 'articletype',
    data () {
        return {
            screenHeight: '',
            screenWidth: '',
            label: '文章分类',
            articleType: [],
            articleTypeId: 0,
            articleData: [],
            TheLoader: '加载中',
            differType: false,
            Rows: 10,
            currentPage: 1,
            allCount: 0
        }
    },
    mounted () {
        this.calculateHeight()
        this.render()
        window.addEventListener('resize', this.windowsChange)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.windowsChange)
    },
    methods: {
        calculateHeight () {
            let height = window.screen.height
            this.$refs.articleType.style.height = height + 'px'
            let top = parseFloat(window.getComputedStyle(this.$refs.artic_NewsContent).top)
            this.$refs.artic_NewsContent.style.height = height - top + 'px'
            this.$refs.artic_MoreSelectType.style.height = height - top + 'px'
        },
        windowsChange () {
            return (() => {
                this.screenWidth = window.screen.width
                this.screenHeight = window.screen.height
            })()
        },
        changeType () {
            if (this.differType == true) {
                this.differType = false
            } else {
                this.differType = true
            }
        },
        linkToContent (index) {
            this.$router.push({ path: '/articledetail', query: { Id: index, from: 'type' } })
        },
        ToHome () {
            this.$router.push({ path: '/home' })
        },
        closeBox () {
            this.differType = false
        },
        async render () {
            let Type = await GetArticleChannelInfoList({
                ParentId: 0
            })
            Type.Data.ArticleCategoryResult.forEach((item, index) => {
                item.Jugement = false  
            })
            Type.Data.ArticleCategoryResult[0].Jugement = true
            this.articleTypeId = Type.Data.ArticleCategoryResult[0].Id
            this.articleType = Type.Data.ArticleCategoryResult
            let List = await GetArticleInfoList({
                CategoryId: this.articleTypeId,
                Sort: 'Id',
                Order: 'desc',
                Page: 1,
                Rows: this.Rows
            })
            List.Data.List.forEach((item, index) => {
                if (item.ClickCount >= 10 && item.ClickCount < 20) {
                    item.HotLevel = 2
                } else if (item.ClickCount >= 20) {
                    item.HotLevel = 1
                } else {
                    item.HotLevel = 0
                }
            })
            this.articleData = List.Data.List
            this.allCount = List.Data.TotalCount
            if (this.allCount <= this.Rows) {
                this.TheLoader = '已全部加载'
            }
        },
        async MakeSelect (index) {
            this.articleType.forEach(item => {
                item.Jugement = false
            })
            this.articleType[index].Jugement = true
            let leftindex = this.$refs.artic_lineItem[index].offsetLeft
            // let leftwidth = this.$refs.artic_lineItem[index].width
            let cc = this.$refs.artic_lineItem[index].clientWidth
            // let leftRem = leftindex / 75
            this.$nextTick(() => {
                this.$refs.artic_lineLength.scrollTo(leftindex, 0)
            })
            // console.log(leftindex, leftRem, leftwidth)
            console.log(cc)
            this.$refs.artic_lineLength.scrollTo(leftindex - 60, 0)
            this.articleTypeId = this.articleType[index].Id
            this.differType = false
            this.articleData = []
            this.TheLoader = '加载中'
            let List = await GetArticleInfoList({
                CategoryId: this.articleTypeId,
                Sort: 'Id',
                Order: 'desc',
                Page: 1,
                Rows: this.Rows
            })
            List.Data.List.forEach((item, index) => {
                if (item.ClickCount >= 10 && item.ClickCount < 20) {
                    item.HotLevel = 2
                } else if (item.ClickCount >= 20) {
                    item.HotLevel = 1
                } else {
                    item.HotLevel = 0
                }
            })
            this.currentPage = 1
            this.articleData = List.Data.List
            this.allCount = List.Data.TotalCount
            if (this.allCount <= this.Rows) {
                this.TheLoader = '已全部加载'
            }
        },
        async loadMore () {
            if (this.articleData.length < this.Rows) {
                return
            }
            if (this.allCount > this.articleData.length) {
                this.currentPage = ++this.currentPage
                let List = await GetArticleInfoList({
                    CategoryId: this.articleTypeId,
                    Page: this.currentPage,
                    Rows: this.Rows,
                    Sort: 'Id',
                    Order: 'desc'
                })
                List.Data.List.forEach((item, index) => {
                    if (item.ClickCount >= 10 && item.ClickCount < 20) {
                        item.HotLevel = 2
                    } else if (item.ClickCount >= 20) {
                        item.HotLevel = 1
                    } else {
                        item.HotLevel = 0
                    }
                })
                this.articleData = this.articleData.concat(List.Data.List)
            } else if (this.allCount == this.articleData.length) {
                this.TheLoader = '已全部加载'
            }
        }
    },
    watch: {
        screenWidth (newsvalue, oldvalue) {
            this.calculateHeight()
        },
        screenHeight (newsvalue, oldvalue) {
            this.calculateHeight()
        }
    },
    components: {
        articleItem
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .articleType{
        position: relative;
        .artic_Header{
            width: 100%;
            height: toRem(92px);
            line-height: toRem(92px);
            background: #4071da;
            color: #fff;
            display: flex;
            padding: 0 toRem(20px);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            .artic_LeftPart{
                flex: 1;
                text-align: left;
                position: relative;
                .artic_Reback{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: toRem(24px);
                    height: toRem(42px);
                    background: url('../assets/arti-rebackblank.png');
                    background-size: 100%;
                }
            }
            .artic_Center{
                flex: 14;
                text-align: center;
                font-size: toRem(35px);
            }
            .artic_RightPart{
                flex: 1;
                text-align: right;
                position: relative;
                .artic_Search{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: toRem(40px);
                    height: toRem(40px);
                    background: url('../assets/arti_searchblank.png');
                    background-size: 100%;
                }
            }
        }
        .artic_Body{
            height: toRem(250px);
            padding-top: toRem(92px);
            background: #4071da;
            display: flex;
            .artic_SelectName{
                width: toRem(612px);
                height: toRem(90px);
                line-height: toRem(90px);
                font-size: toRem(30px);
                color: #fff;
                overflow: hidden;
                position: relative;
                ul{
                    display: flex;
                    height: toRem(120px);
                    overflow: auto;
                    transition: 0.2s;
                    li{
                        width: toRem(168px);
                        text-align: center;
                        flex-shrink: 0;
                        position: relative;
                        .artic_BeChoose{
                            width: toRem(32px);
                            height: toRem(8px);
                            background: #ff0;
                            position: absolute;
                            top:70%;
                            left:50%;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
                .artic_BeSelect{
                    font-size: toRem(35px);
                    color: #ff0;
                    border-radius: 4px;
                }
            }
            .artic_SelectForMore{
                vertical-align: middle;
                height: toRem(90px);
                line-height: toRem(90px);
                flex: 1;
                padding-left: toRem(15px);
                .artic_ForTheMore,
                .artic_ForTheMoreYellow
                {
                    display: inline-block;
                    width: toRem(30px);
                    height: toRem(30px);
                    margin-right: toRem(5px);
                    position: relative;
                    top: toRem(4px);
                }
                .artic_ForTheMore{
                    background: url('../assets/artic-templeformore.png') no-repeat;
                    background-size: 100%;
                }
                .artic_ForTheMoreYellow{
                    background: url('../assets/artic-formoreyellow.png') no-repeat;
                    background-size: 100%;
                }
                .artic_DeffType{
                    color:#fff;
                    font-size: toRem(30px);
                }
                .artic_DeffTypeYellow{
                    color: #ff0;
                    font-size: toRem(30px);
                }
            }
        }
        .artic_MoreSelectType{
            width: 100%;
            position: absolute;
            top: toRem(180px);
            left: 0;
            background: rgba(0,0,0,0.2);
            z-index: 11;
        }
        .artic_DifferentType{
            width: 100%;
            max-height: 0;
            overflow: auto;
            background: #fff;
            z-index: 12;
            transition: 0.5s;
            position: absolute;
            top: toRem(180px);
            left: 0;
            ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 toRem(20px);
                margin: toRem(15px) 0;
                li{
                    font-size: toRem(28px);
                    line-height: toRem(45px);
                    border: toRem(2px) solid #555;
                    padding: toRem(5px) toRem(15px);
                    margin: toRem(8px) toRem(8px);
                    border-radius: toRem(38px);
                }
                .artic_bechoose{
                    border: toRem(2px) solid #4071da;
                    background: #4071da;
                    color: #fff;
                }
            }
        }
        .artic_show{
            max-height: toRem(600px);
        }
        .artic_NewsContent{
            width: 100%;
            padding-top: toRem(25px);
            background: #fff;
            overflow: auto;
            position:absolute;
            top: toRem(180px);
            left: 0;
            border-top-left-radius: toRem(45px);
            border-top-right-radius: toRem(45px);
            ul{
                padding: 0 toRem(20px);
                li{
                    padding: toRem(34px) 0 toRem(34px);
                    border-bottom: toRem(1px) solid #dfdfdf;
                }
            }
            .artic_LoadForMore{
                height: toRem(90px);
                line-height: toRem(90px);
                text-align: center;
                font-size: toRem(25px);
            }
        }
    }
</style>
