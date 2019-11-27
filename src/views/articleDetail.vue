/*
 * 文章详情页面
 */
<template>
    <div class="articleDetail" ref="totalHeight">
        <header-fix :fixed="true">
            <i class="arti_Back" slot="left" @click="LinkBack()"></i>
            <div class="arti_CollectDepart" slot="right">
                <i class="arti_CollectNone" @click="collect()" v-if="articleCollect == false"></i>
                <i class="arti_CollectTrue" @click="discollect()" v-else-if="articleCollect == true"></i>
                <span class="arti_CollectNum" v-text="collectNumber"></span>
            </div>
        </header-fix>
        <div class="arti_ArticleDepart">
            <p class="arti_Title" v-text="articleTitle"></p>
            <p class="arti_InforContent">来源：<span v-text="articleFrom"></span>发布时间：<span v-text="articleTime"></span>作者：<span v-text="articleAuthor"></span></p>
        </div>
        <div class="arti_ArticleContent" v-html="articleContent"></div>
    </div>
</template>

<script>
import { headerFix } from '../components'
import { ArticleContent, FavoriteAdd, FavoriteDelete } from '../service/getData'
import { MessageBox } from 'mint-ui'

export default {
    name: 'articleDetail',
    data () {
        return {
            screenHeight: '',
            screenWidth: '',
            collectNumber: 0,
            articleId: this.$route.query.Id,
            comeFrom: this.$route.query.from,
            articleTitle: '',
            articleFrom: '',
            articleTime: '',
            articleAuthor: '',
            articleContent: `<div></div>`,
            articleCollect: ''
        }
    },
    mounted () {
        this.calclulate()
        this.render()
        window.addEventListener('resize', this.windowsChange)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.windowsChange)
    },
    methods: {
        calclulate () {
            this.screenWidth = window.screen.width
            this.screenHeight = window.screen.height
            this.$refs.totalHeight.style.height = this.screenHeight + 'px'
        },
        windowsChange () {
            return (() => {
                this.screenWidth = window.screen.width
                this.screenHeight = window.screen.height
            })()
        },
        LinkBack () {
            if (this.comeFrom == 'type') {
                this.$router.push({ path: '/articletype' })
            } else if (this.comeFrom == 'home') {
                this.$router.push({ path: '/home' })
            }
        },
        async render () {
            let msg = await ArticleContent({
                Id: this.articleId
            })
            this.articleTitle = msg.Data.Name
            this.articleAuthor = msg.Data.Author ? msg.Data.Author : '匿名'
            this.articleTime = msg.Data.CreateDate.substr(0, 10)
            this.articleFrom = msg.Data.Source ? msg.Data.Source : '暂无'
            this.articleContent = msg.Data.Content
            this.collectNumber = msg.Data.FavoriteCount
            this.articleCollect = msg.Data.IsFavorite
            console.log(msg)
        },
        async collect () {
            let msg = await FavoriteAdd({
                mainId: this.articleId,
                type: 'Article'
            })
            if (msg.Type == 1) {
                MessageBox('提示', '收藏成功!')
            } else {
                MessageBox('提示', '收藏失败!')
            }
            this.render()
        },
        async discollect () {
            let msg = await FavoriteDelete({
                Ids: this.articleId,
                Type: 'Article'
            })
            if (msg.Type == 1) {
                MessageBox('提示', '取消收藏成功!')
            } else {
                MessageBox('提示', '取消收藏失败!')
            }
            this.render()
        }
    },
    watch: {
        screenWidth (newsvalue, oldvalue) {
            this.calclulate()
        },
        screenHeight (newsvalue, oldvalue) {
            this.calclulate()
        }
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .articleDetail{
        height: 100vh;
        background: #fff;
        .arti_Back{
            width: toRem(24px);
            height: toRem(42px);
            background:url('../assets/tra_turnback.png');
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .arti_CollectDepart{
            width: toRem(85px);
            height: toRem(60px);
            position: absolute;
            top: 50%;
            left: 10%;
            transform: translate(-50%,-50%);
            .arti_CollectNone,
            .arti_CollectTrue{
                width: toRem(44px);
                height: toRem(44px);
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .arti_CollectNone{
                background: url('../assets/arti_heartempty.png') no-repeat;
                background-size: 100%;
            }
            .arti_CollectTrue{
                background: url('../assets/arti_heart.png') no-repeat;
                background-size: 100%;
            }
            .arti_CollectNum{
                color: #4674df;
                width: toRem(48px);
                position: absolute;
                top: toRem(12px);
                right: toRem(-6px);
                font-size: toRem(12px);
                height: toRem(24px);
                line-height: toRem(24px);
                text-align: center;

            }
        }
        .arti_ArticleDepart{
            padding-top: toRem(118px);
            padding-left: toRem(15px);
            padding-right: toRem(15px);
            .arti_Title{
                font-size: toRem(42px);
                font-family: '微软雅黑';
                font-weight: 600;
                line-height: toRem(58px);
            }
            .arti_InforContent{
                margin-top: toRem(18px);
                font-size: toRem(20px);
                span{
                    padding-right: toRem(25px);
                }
            }
        }
        .arti_ArticleContent{
            padding-top: toRem(68px);
            padding-left: toRem(15px);
            padding-right: toRem(15px);
            img{
                width:100%!important;
            }
            video{
                width: 100%!important;
                height: 100%!important;
            }
        }
    }
</style>
