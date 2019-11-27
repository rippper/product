/**
* 电子书
*/
<template>
  <div class="ebook container_top">
    <!--头部-->
    <header-fix title="电子书" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
      <router-link slot="right" to="/ebookSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
     <div class="category">
        <div class="eb-swiper">
          <div class="swiper-con">
            <ul ref="cataF_ul">
              <li v-for="(item, index) in cataListF" 
                    :key="index" 
                    :class="{'actived': item.jugement}" 
                    @click.stop="chooseListF(index, item.id)"
                    ref="cataF_item"
                >
                  {{item.text}}
              </li>
            </ul>
          </div>
          <div class="gallery-thumbs">
              <div class="gt-layer" v-if="showGtLayer" @click="toggleGtLayer"></div>
              <div class="gt-wrapper" :class="{'show': showGtLayer}">
                <ul ref="cataS_ul">
                  <li 
                  v-for="(item, index) in cataListF" 
                  :key="index"
                  @click="chooseListFdata(index, item.id)"
                  ref="cataS_item"
                  >
                    {{item.text}}
                  </li>
                </ul>
              </div>
            </div>
          
        </div>
        <div class="btn" @click="toggleGtLayer">
            <img src="../assets/course-classify-icon.png" alt="">分类
        </div>
      </div>
    <div class="eb-container">

      <section v-infinite-scroll="getEbookList"
              infinite-scroll-immediate-check="immediate"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
        <ebook-list :data="ebookData" :no-data-bg="noDataBg" :no-data="noData"></ebook-list>
      </section>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { headerFix, ebookList } from '../components'
  import { BookList, BookCategory } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        ebookData: [],
        page: 1,
        immediate: false,
        loading: false,
        noDataBg: false,
        noData: false,
        cataListF: [],
        showGtLayer: false,
        showCcLayer: false,
        CategoryId: '',
        title: ''
      }
    },
    mounted () {
      this.getEbookList()
      this.getBookCategory()
    },
    components: {
      headerFix,
      ebookList
    },
    methods: {
      // 图书列表
      async getEbookList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await BookList({ Page: this.page, Rows: '5', CategoryId: '0', Sort: 'Id', Order: 'desc' })
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data.ListData
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.ebookData = this.ebookData.concat(list)
          this.loading = false
          this.page += 1
        }
      },
       /* 搜索图书列表 */
      searchBookList (data) {
        this.page = 1
        this.CategoryId = data.id
        this.title = data.text
        this.showSlide = false
        this.ebookData = []
        this.getEbookList()
      },
      toggleGtLayer () {
        this.showGtLayer = !this.showGtLayer 
      },
      toggleCcLayer () {
        this.showCcLayer = !this.showCcLayer
      },
      chooseListF (num, id) {
        this.cataListF.forEach(item => {
          item.jugement = false
          this.cataListF[num].jugement = true
        })
        this.CategoryId = id
        console.log(this.cataListF, num, id)
        let offset1 = this.$refs.cataF_item[num].offsetLeft // 当前选中元素距离左边的间距
        let width1 = this.$refs.cataF_item[num].clientWidth // 当前选中元素的宽度
        let bodyWidth = document.body.clientWidth // 页面宽度
        let halfWidth = (550 / 75 * bodyWidth / 10) / 2 // (当前父元素宽度,由设计图550转化rem后计算成当前页面宽度,取一半)
        // 当选中元素的左间距大于父元素一半时使选中元素一直居中 小于时保持不动
        // console.log(offset1, halfWidth, offset2)
        if (offset1 > halfWidth) {
          let offset2 = offset1 - halfWidth + width1 / 2
          this.$nextTick(() => {
              this.$refs.cataF_ul.scrollTo(offset2, 0)
          }) 
        } else {
          this.$refs.cataF_ul.scrollTo(0, 0)
        }
      },
      chooseListFdata (num, id) {
        this.CategoryId = id
        this.showGtLayer = !this.showGtLayer
        this.chooseListF(num, id)
        this.cataListF.forEach(item => {
          this.$set(item, 'jugement', false)
          this.$set(this.cataListF[num], 'jugement', true)
        })
      },
      async getBookCategory () {
        let data = await BookCategory({ ParentId: ' ' })
        if (data.Status == '200') {
          this.cataListF = data.Data.DataList
          this.cataListF.forEach(item => {
            this.$set(item, 'jugement', false)
          })
        }
      }
      
    },
    watch: {
      CategoryId (val) {
        this.page = 1
        this.noMoreData = false
        this.noData = false
        this.ebookData = []
        this.getEbookList()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook {
    background-color: #4070da;
    .header{
      background: transparent;
      border-bottom: none; 
      .webapp{
        color: #fff;
      }
      .header_title{
        color: #fff;
      }
      .header_right{
        .webapp-search:before{
          color: #fff;
        }
      }
    }
    .eb-container{
      background: #fff;
      border-radius: toRem(30px) toRem(30px) 0 0;
      min-height: 94vh;
    }
    .category{
        @extend %clearFix;
        .eb-swiper{
          float: left;
          width: toRem(550px);
          margin-left: toRem(30px);
          overflow: hidden;
          .swiper-con{
            width: toRem(550px);
            height: toRem(80px);
            line-height: toRem(80px);
            font-size: 16px;
            overflow: hidden;
            position: relative;
            ul{
              display: flex;
              height: toRem(80px);
              overflow: auto;
              li{
                text-align: center;
                flex-shrink: 0;
                color: #fff;
                font-size: 14px;
                margin-right: toRem(50px);
                &:nth-last-child(1){
                  margin-right: 0;
                }
                &.actived{
                  background: url("../assets/block-yel.png") no-repeat center bottom;
                  background-size: toRem(30px) toRem(6px); 
                  color: #fed803;
                  font-size: 16px;
                }
              }
            }
          }
          .gallery-thumbs{
            .gt-layer{
              position: absolute;
              top: toRem(170px);
              left: 0;
              height: 100vh;
              z-index: 50;
              background: rgba(0,0,0,0.4);
              width: 100%;
            }
            .gt-wrapper{
              position: absolute;
              max-height: 0;
              overflow: hidden;
              left: 0;
              right: 0;
              z-index: 100;
              background-color: $fill-base;
              font-size: 15px;
              transition: max-height ease 0.5s;
              &.show {
                max-height: 100vh;
              }
              ul{
                padding: toRem(30px);
                @extend %clearFix;
                li{
                  float: left;
                  margin:toRem(10px) toRem(40px) 0 0;
                  font-size: 14px;
                  color: #333;
                }
              }
            }
          }
        }
        .btn{
          float: left;
          color: #fff;
          margin-top: toRem(15px);
          font-size: 16px;
          margin-left: toRem(40px);
          img{
            width: toRem(28px);
            height: toRem(28px);
            vertical-align: baseline;
            margin-right: toRem(8px);
          }
        }
      }
  }
</style>
