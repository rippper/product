/*
 * 通知公告页面
 */
<template>
    <div class="notifiPage" ref="notifiPage">
        <header-fix :title="label" :fixed="true">
            <i class="noti_Back" slot="left"></i>
        </header-fix>
        <div class="notifi_ItemList">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <li v-for="(item, index) in notifiData" :key="index">
                    <notify-item :data="item"></notify-item>
                </li>
            </ul>
            <div class="notifi_loadmore" v-text="attation"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { headerFix, notifyItem } from '../components'
import { InfiniteScroll } from 'mint-ui'
import { NoticeList } from '../service/getData'

Vue.use(InfiniteScroll)

export default {
    name: 'notification',
    data () {
        return {
            screenHeight: '',
            screenWidth: '',
            label: '通知公告',
            loading: false,
            notifiData: [],
            allCount: 0,
            Rows: 6,
            currentPage: 1,
            attation: '加载中'
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
        windowsChange () {
            return (() => {
                this.screenWidth = window.screen.width
                this.screenHeight = window.screen.height
            })()
        },
        calculateHeight () {
            this.$refs.notifiPage.style.height = window.screen.height + 'px'
        },
        async loadMore () {
            if (this.notifiData.length < this.Rows) {
                return false
            }
            if (this.allCount > this.notifiData.length) {
                this.currentPage = ++this.currentPage
                console.log(this.currentPage)
                let msg = await NoticeList({
                    Page: this.currentPage,
                    Rows: this.Rows,
                    Sort: 'Id',
                    Order: 'desc'
                })
                this.notifiData = this.notifiData.concat(msg.Data.ListData)
            } else if (this.allCount == this.notifiData.length) {
                this.attation = '已全部加载'
            }
        },
        async render () {
            let msg = await NoticeList({
                Page: this.currentPage,
                Rows: this.Rows,
                Sort: 'Id',
                Order: 'desc'
            })
            this.notifiData = msg.Data.ListData
            this.allCount = msg.Data.Count
            if (this.allCount <= this.Rows) {
                this.attation = '已全部加载'
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
        headerFix,
        notifyItem
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .notifiPage{
        overflow: auto;
        background: #fff;
        .noti_Back{
            width: toRem(24px);
            height: toRem(42px);
            background:url('../assets/tra_turnback.png');
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .notifi_ItemList{
            padding-top: toRem(92px);
            ul{
                padding-left: toRem(25px);
                padding-right: toRem(25px);
            }
            .notifi_loadmore{
                text-align: center;
                height: toRem(80px);
                line-height: toRem(80px);
            }
        }
    }
</style>
