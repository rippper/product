<template>
  <div class="studyCircleCenter container_both">
    <header-fix title="学习圈" fixed>
    </header-fix>
    <!-- 交流圈子 -->
    <section class="communicate-circle">
      <div class="title">
        交流圈子
      </div>
      <swiper :options="srSwiperOption1">
        <swiper-slide v-for="item in circleTypeInfo" :key="item.Id">
          <router-link :to="{path: '/studyCircleStage', query: {id: item.Id, title: item.Name}}">
              <img :src="item.Img" alt="">
          </router-link>
        </swiper-slide>
      </swiper>
    
    </section>
    <!-- 热门动态 -->
    <section class="hot-trends">
      <div class="title">
        热门动态
      </div>
      <section
        v-infinite-scroll="getCircleArticleList"
        infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="immediate"
        infinite-scroll-distance="10"
      >
        <div class="content">
          <ul>
            <li v-for="item in hotCircleList" :key="item.Id">
              <div class="hd">
                <error-img :src="item.HeadImg" :error-src="male" class="headImg"></error-img>
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
                <div class="text" v-html="item.Content">
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
                <div class="sort">
                  <p>{{item.CircleName}}</p>
                </div>
                <div class="handle">
                  <p class="praise" v-show="item.IsAssist == 0" @click="addAssist(item)">
                    <img src="../assets/praise-white.png" alt="">{{item.AssistCount}}
                  </p>
                  <p class="praise" v-show="item.IsAssist == 1" @click="deleteAssist(item)">
                    <img src="../assets/praise-red.png" alt="">{{item.AssistCount}}
                  </p>
                  <div class="message" @click="showCommentBox(item)">
                    <img src="../assets/message-white.png" alt="">{{item.CommentCount}}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="noData" v-if="noData">暂无数据</div>
        <div class="noMoreData" v-if="noMoreData">没有更多数据了</div>
      </section>
      
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
    <footer-fix selected="studyCircleCenter"></footer-fix>
  </div>
    
</template>
<script>
    import Vue from 'vue'
    import { CircleArticleList, AddUserAssist, DelUserAssist, CommentList, CircleTypeInfoList } from '../service/getData'
    import { Indicator, Popup } from 'mint-ui'
    import male from '../assets/headImg-default.png'
    Vue.component(Popup.name, Popup)
    export default {
        data () {
            return {
              male,
              proList1: [],
              page: 1,
              loading: false,
              id: '',
              immediate: false,
              noMoreData: false,
              noData: false,
              hotCircleList: [],
              srSwiperOption1: {
                slidesPerView: 'auto',
                grabCursor: true,
                loop: false,
                freeMode: true,
                freeModeMomentum: false
              },
              commentBox: false,
              circleCommentId: null,
              circleCommentList: [],
              immediate2: false,
              loading2: false,
              boxArr: [],
              commentCount: null,
              commentListDetail: false,
              commentDetailpid: null,
              commentDetailList: [],
              commentInputState: true,
              statec: true,
              circleTypeInfo: []
            }
        },
        created () {
        },
        mounted () {
          this.getCircleArticleList()
          this.getCircleTypeInfoList()
        },
        methods: {
          async getCircleTypeInfoList () {
              let data = await CircleTypeInfoList({ Id: 0 })
              if (data.IsSuccess) {
                  this.circleTypeInfo = data.Data.List
                  // console.log(this.circleTypeInfo)
              }
          },
          async getCircleArticleList () {
            Indicator.open()
            this.loading = true
            let data = await CircleArticleList({
              Sort: 'Id',
              Order: 'desc',
              Page: this.page,
              Rows: 5,
              CircleId: this.id
            })
            this.loading = false
            Indicator.close()
            if (data.IsSuccess) {
              let list = data.Data
              if (list.length === 0 && this.page > 1) {
                this.noMoreData = true
                return 
              }
              if (list.length === 0 && this.page == 1) {
                this.noData = true
                return
              }
              list.forEach(item => {
                item.page = 1 // 二级列表翻页时候请求的page
              })
              this.hotCircleList = this.hotCircleList.concat(list)
              this.page += 1
            }
          },
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
            this.loading2 = true
              let data = await CommentList({
                  MainId: this.boxArr.Id,
                  Type: 'CircleArticle',
                  ParentId: 0,
                  Sort: 'Id',
                  Order: 'desc',
                  Page: this.boxArr.page,
                  Rows: 5
              })
              this.loading2 = false
              Indicator.close()
              if (data.IsSuccess) {
                  this.circleCommentList = data.Data.List
                  this.commentCount = this.circleCommentList.length
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

    .studyCircleCenter{
      background: #fff;
      .header{
        .header_title{
          font-size: 17px;
          color: #333;
        }
      }
      .communicate-circle{
        background: #fff;
        padding-top: toRem(40px);
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
          height: toRem(150px);
          .swiper-wrapper{
            .swiper-slide{
              width: toRem(200px);
              height: toRem(150px);
              border-radius: 5%;
              margin-right: toRem(20px);
              a{
                img{
                  width: toRem(200px);
                  height: toRem(150px);
                  margin-left: toRem(20px);
                }
              }
            }
          }
        }
      }
      .hot-trends{
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
                  @extend %clearFix;
                  margin-top: toRem(25px);
                  margin-right: toRem(-20px);
                  li{
                    box-shadow: none;
                    float: left;
                    margin: 0;
                    width: toRem(197px);
                    height: toRem(197px);
                    margin-right: toRem(18px);
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
                .sort{
                  display: flex;
                  p{
                    padding: toRem(10px) toRem(15px);
                    background: #f5f9ff;
                    color: #4a608c;
                    margin-right: toRem(20px);
                  }
                }
                .handle{
                  display: flex;
                  .praise{
                    margin-top: toRem(10px);
                    img{
                      width: toRem(24px);
                      height: toRem(24px);
                      margin-right: toRem(10px);
                      vertical-align: inherit;
                    }
                    margin-right: toRem(40px);
                  }
                  .message{
                    margin-top: toRem(10px);
                    background: none;
                    img{
                      width: toRem(24px);
                      height: toRem(24px);
                      margin-right: toRem(10px);
                      vertical-align: inherit;
                    }
                  }
                }
              }
            }
          }
        }
        .noData{
          text-align: center;
          font-size: 16px;
          margin: toRem(30px) 0;
        }
        .noMoreData{
          text-align: center;
          font-size: 16px;
          margin: toRem(30px) 0;
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
    }
</style>
