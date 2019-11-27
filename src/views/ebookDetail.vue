/**
* 图书内容详情
*/
<template>
  <div class="ebook_detail">
    <!--头部-->
    <transition name="fade">
      <header-fix :title="bookName" fixed v-if="showConfig">
        <div slot="left" class="backEbook" @click.stop="toChapter({path:'ebook'})">
          <i class="webapp webapp-left"></i>
          <!-- <span>返回书架</span> -->
        </div>
      </header-fix>
    </transition>
    <div class="bg_container" :style="{background: bgColor }" @click.stop="toggleShowConfig">
      <div class="content" :style="{fontSize: fontSize + 'rem' }" v-html="detailData.Content"></div>
      <div class="ebook_footer">
        <mt-button v-if="index>1" class="prev" size="small" @click.native.stop="prevChapter()">上一章节
        </mt-button>
        <mt-button class="next" size="small" @click.native.stop="nextChapter()">下一章节</mt-button>
      </div>
    </div>
    <transition name="fade">
      <div v-if="showStyleSetting" class="style_setting">
        <div class="light_setting">
          <img src="../assets/sun-icon1.png" alt="">
          <div class="wind_range">
            <mt-range 
              v-model="rangeValue" 
              :barHeight="4" 
              class="range"
              :min="0"
              :max="100"
              @change="changeEvent()"
            ></mt-range>
          </div>
          
          <img src="../assets/sun-icon1.png" alt="">
        </div>
        <div class="font-bg">
          <div class="font_setting">
            <span class="font_small" @click.stop="changeFontSize(-0.1)">A-</span>
            <span class="font_large" @click.stop="changeFontSize(0.1)">A+</span>
          </div>
          <div class="bg_setting clearFix">
            <span>背景:</span>
            <span class="bg_1" @click.stop="changeBgColor('#d7d2bd')"></span>
            <span class="bg_2" @click.stop="changeBgColor('#dccbcb')"></span>
            <span class="bg_3" @click.stop="changeBgColor('#e0ebfc')"></span>
            <span class="bg_4" @click.stop="changeBgColor('#edf4e8')"></span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showConfig" class="ebook_config">
        <mt-tabbar fixed>
          <mt-tab-item id="ebookChapterList"
                       @click.native="toChapter({path:'ebookChapterList',query:{id:detailData.BookContentId}})">
            <p><img src="../assets/category-icon.png" alt=""></p>
            <p>目录</p>
          </mt-tab-item>
          <mt-tab-item id="setting" @click.native.stop="toggleStyleSetting">
            <p><img src="../assets/set-icon2.png" alt=""></p>
            <p>设置</p>
          </mt-tab-item>
          <mt-tab-item id="night" @click.native.stop="toggleNight">
            <!-- <i  slot="icon" class="webapp webapp-sun"></i> -->
            <p v-if="isNight"><img src="../assets/sun-icon2.png" alt="" ></p>
            <p v-if="!isNight"><img src="../assets/moon.png" alt="" ></p> 
            <!-- <i v-if="!isNight" slot="icon" class="webapp webapp-moon"></i> -->
            <p>{{isNight ? '白天' : '夜间'}}</p>
          </mt-tab-item>
        </mt-tabbar>
      </div>
    </transition>
    <div class="ebookMod" @click.stop="toggleShowConfig">

    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Toast, Button, Tabbar, TabItem, Range } from 'mint-ui'
  import { headerFix } from '../components'
  import { GetBookChapterContent } from '../service/getData'
  import { setStore, getStore } from '../plugins/utils'
  import { goBack } from '../service/mixins'

  Vue.component(Button.name, Button)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(Range.name, Range)
  export default {
    mixins: [goBack],
    data () {
      return {
        detailId: '',
        bookName: '',
        index: 1,
        detailData: {},
        showConfig: false,
        showStyleSetting: false,
        isNight: false, // 白天夜间
        fontSize: 0.5, // 字体大小
        bgColor: '#fff', // 切换背景
        nextId: '',
        nextIndex: '',
        rangeValue: 0
      }
    },
    components: {
      headerFix
    },
    created () {
      // 初始化设置
      let ebookConfig = getStore('ebookConfig')
      if (ebookConfig) {
        this.isNight = ebookConfig.isNight
        this.fontSize = ebookConfig.fontSize
        this.bgColor = ebookConfig.bgColor
        this.rangeValue = ebookConfig.rangeValue
      }
      this.bookName = getStore('bookName') || ''
      this.detailId = this.$route.query.id || ''
      this.index = this.$route.query.index || 1
    },
    mounted () {
      window.scrollTo(0, 0)
      this.getChapterContent()
      let ebookMod = document.querySelector('.ebookMod')
      let opNum = 0.1 + (0.9 * this.rangeValue / 100)
      ebookMod.style.background = 'rgba(0,0,0,' + `${opNum}` + ')' 
    },
    methods: {
      // 图书章节
      async getChapterContent () {
        let data = await GetBookChapterContent({ Id: this.detailId })
        if (data.Type == 1) {
          this.detailData = data.Data
        }
      },
      /* 返回 */
      toChapter (path) {
        this.$router.replace(path)
      },
      /* 显示/隐藏 头尾 */
      toggleShowConfig () {
        this.showConfig = !this.showConfig
        this.showStyleSetting = false
      },
      /* 白天/夜间切换 */
      toggleNight () {
        if (this.isNight) {
          this.bgColor = '#f6eee3'
        } else {
          this.bgColor = 'rgba(0, 0, 0, 0.9)'
        }
        this.isNight = !this.isNight
      },
      /* 显示/隐藏 设置 */
      toggleStyleSetting () {
        this.showStyleSetting = !this.showStyleSetting
      },
      /* 字体大小控制 */
      changeFontSize (step) {
        let newFontSize = this.fontSize + step
        if (newFontSize < 0.3) {
          Toast({ message: '字体已最小', position: 'bottom' })
        } else if (newFontSize > 0.7) {
          Toast({ message: '字体已最大', position: 'bottom' })
        } else {
          this.fontSize = newFontSize
        }
      },
      /* 默认字体大小 */
      defaultFontSize () {
        this.fontSize = 0.5
      },
      /* 切换背景 */
      changeBgColor (color) {
        this.bgColor = color
      },
      /* 存储个人配置 */
      storeConfig () {
        let config = {
          fontSize: this.fontSize,
          isNight: this.isNight,
          bgColor: this.bgColor,
          rangeValue: this.rangeValue
        }
        setStore('ebookConfig', config)
      },
      changeEvent () {
          // console.log(this.rangeValue)
      },
      /* 下一章 */
      nextChapter () {
        this.nextId = parseInt(this.detailId) + 1
        this.nextIndex = parseInt(this.index) + 1
        this.$router.replace({ path: '/ebookDetail', query: { id: this.nextId, index: this.nextIndex } })
        window.location.reload()
      },
      /* 上一章 */
      prevChapter () {
        this.nextId = parseInt(this.detailId) - 1
        this.nextIndex = parseInt(this.index) - 1
        this.$router.replace({ path: '/ebookDetail', query: { id: this.nextId, index: this.nextIndex } })
        window.location.reload()
      }
      
    },
    watch: {
      fontSize: function (val) {
        this.storeConfig()
      },
      bgColor: function (val) {
        this.storeConfig()
      },
      rangeValue: function (val) {
        this.storeConfig()
        let ebookMod = document.querySelector('.ebookMod')
        let opNum = 1 - (0.1 + (0.9 * val / 100)) 
        // console.log(opNum)
        ebookMod.style.background = 'rgba(0,0,0,' + `${opNum}` + ')'
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook_detail {
    height: 100vh;

    .header {
      z-index: 25;
      background-color:#4a608c;
      color: #fff;
      .webapp-left {
        font-size: 16px;
        color: #fff;
      }
      .header_title{
        color: #fff;
      }
    }

    .backEbook {
      color: $color-text-reverse;
      font-size: 16px;
    }

    .bg_container {
      padding: toRem(30px);
      min-height: 100vh;
    }

    .ebook_footer {
      padding-top: toRem(20px);
      padding-bottom: toRem(80px);
      text-align: center;
      @extend %clearFix;

      .mint-button--default {
        color: $color-text-thirdly;
        background-color: rgba(0, 0, 0, 0.82);
      }

      .prev {
        //        @extend %pull-left;
        width: toRem(260px);
      }

      .next {
        //        @extend %pull-right;
        width: toRem(260px);
      }
    }

    .ebook_config {

      .webapp {
        color: $color-text-reverse;
      }

      .mint-tabbar {
        // background-color: rgba(0, 0, 0, 0.82);
        background-color: #4a608c; 
        z-index: 30;
      }

      .mint-tabbar > .mint-tab-item.is-selected {
        background-color: #eaeaea;
        color: $brand-primary;
      }

      .mint-tab-item {
        padding: toRem(14px) 0;
        p{
          height: toRem(44px);
          margin-bottom: toRem(10px);
          img{
            vertical-align: bottom;
          }
        }
        &:nth-child(1){
          p{
            img{
              width: toRem(38px);
              height: toRem(44px);
            }
          }
        }
        &:nth-child(2){
          p{
            img{
              width: toRem(47px);
              height: toRem(30px);
              margin-top: toRem(7px);
            }
          }
        }
        &:nth-child(3){
          p{
            img{
              width: toRem(35px);
              height: toRem(36px);
              margin-top: toRem(4px);
            }
          }
        }
      }

      .mint-tab-item-icon {
        width: toRem(42px);
        height: toRem(46px);
        margin: 0 auto toRem(5px);
      }

      .mint-tab-item-label {
        font-size: 15px;
        color: $color-text-reverse;
      }
    }

    .content {
      font-size: 0.5rem;
    }

    .style_setting {
      position: fixed;
      bottom: toRem(136px);
      width: 100vw;
      left: 0;
      background: #4a608c;
      color: $color-text-reverse;
      z-index: 25;
      .light_setting{
        padding:toRem(30px);
        display: flex;
        justify-content: space-between;
        img{
          width: toRem(28px);
          height: toRem(28px);
        }
        .range{
          width: toRem(560px);
          height: toRem(24px);
          .mt-range-content{
            margin-right: toRem(24px);
          }
          .mt-range-thumb{
            width: toRem(24px);
            height: toRem(24px);
          }
          .mt-range-runway{
            border-top-color: #3f5277;
            margin-right: toRem(-24px);
          }
          .mt-range-progress{
            background: #0196ff;
          }
        }
      }
      .font-bg{
        display: flex;
        justify-content: space-between;
        padding-bottom: toRem(30px);
        margin: 0 toRem(30px);
        border-bottom: 1px solid #6e80a3;
      }
      .font_setting {
        padding: toRem(15px) 0 toRem(15px) 0;
        font-size: 14px;
        span {
          display: inline-block;
          width: toRem(96px);
          @include ht-lineHt(46px);
          text-align: center;
          border: 1px solid #fff;
          border-radius: toRem(10px);
          &:nth-child(1){
            margin-right: toRem(30px);
          }
        }
      }

      .bg_setting {
        // padding: toRem(15px) 0 toRem(15px) toRem(15px);
        // 
        font-size: 14px;
        line-height: toRem(75px);

        :first-child {
          margin: 0;
        }

        span {
          float: left;
          @include square(75px);
          line-height: toRem(75px);
          margin-right: toRem(18px);
          border-radius: 50%;
          font-size: 13px;
        }

        .bg_1 {
          background: #f6eee3;
        }

        .bg_2 {
          background: #e5dfc5;
        }

        .bg_3 {
          background: #a4a4a4;
        }

        .bg_4 {
          background: #ccf1d0;
        }

        .bg_5 {
          background: #0e150e;
        }
      }
    }
    .ebookMod{
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index:20;
      top: 0;
      left: 0;
    }
  }
</style>
