<template>
    <div class="commentBox">
        <div class="cb-title">
          <p class="text">全部{{commentCount}}条评论</p>
          <p class="close" @click.stop="closeBox()"><img src="../assets/cancel.png" alt=""></p>
        </div>
        <section v-infinite-scroll="getCommentBoxList"
              infinite-scroll-immediate-check="immediate2"
              infinite-scroll-disabled="loading2"
              infinite-scroll-distance="10">
            <div class="cb-con">
              <ul>
                <li v-for="item in circleCommentList" :key="item.Id">
                  <div class="hd">
                    <img :src="item.Img" alt="">
                  </div>
                  <div class="bd">
                    <div class="left-hand">
                      <div class="replyF" @click.stop="focusInput(item)">
                        <div class="nt">
                          <div class="name">
                            {{item.UserName}}
                          </div>
                          <div class="time">
                            {{item.CreateDate || dateFilter("yyyy-MM-dd")}}
                          </div>
                        </div>
                        <div class="text">
                          {{item.Content}}
                        </div>
                      </div>
                      <div class="replyS" v-if="item.List.length > 0">
                        <ul>
                          <li v-for="item1 in item.List.slice(0, 2)" :key="item1.Id">
                              <div class="replyList">
                                  <p class="replyList_p1 l">
                                      <template>
                                          <div v-if="item1.UserName != item.UserName">
                                                <span>{{item1.UserName}}</span>：
                                          </div>
                                      </template>
                                  </p>
                                  <p class="replyList_p2 l">{{item1.Content}}</p>
                              </div>
                          </li>
                        </ul>
                        <div class="seeMore" v-if="item.List.length > 2" @click.stop="openDetail(item)">
                          全部<span>{{item.List.length}}</span>条评论
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
        </section>
        <!-- <div class="no-data">没有更多评价啦</div> -->
        <section>
          <div class="reply" v-if="commentF">
            <div class="reply-box">
              <img src="../assets/message-blue.png" alt="">
              <input 
                type="text" 
                placeholder="说点什么吧..." 
                v-model="commentText" 
                ref="focusInput"
                autofocus="autofocus"
              >
            </div>
            <p class="btn" @click="addCourseComment">评价</p>
          </div>
          <div class="replyUser" v-else>
            <div class="reply-box">
              <img src="../assets/message-blue.png" alt="">
              <input 
                type="text" 
                placeholder="您想对ta说点什么呢..."
                v-model="commentText"
                ref="focusInput2"
                autofocus="autofocus"
              >
            </div>
            <p class="btn" @click.stop="addCourseComment">评价</p>
          </div>
        </section>
    </div>

</template>
  
<script>
    import { AddComment } from '../service/getData'
    import { Toast } from 'mint-ui'
    export default {
        data () {
            return {
              commentText: '',
              MainId: '',
              ParentId: '',
              commentF: null,
              commentListDetail: false
            }
        },
        props: {
            closeBox: {
              type: Function
            },
            circleCommentList: {
              type: Array
            },
            getCommentBoxList: {
              type: Function
            },
            immediate2: {
              type: Boolean,
              default: false
            },
            loading2: {
              type: Boolean,
              default: false
            },
            commentCount: {
              type: Number
            },
            circleCommentId: {
              type: Number
            },
            openDetail: {
              type: Function
            },
            commentInputState: {
              type: Boolean,
              default: false
            },
            typeName: {
              type: String
              // 用于记录添加评论接口AddComment调用时的type
            }
        },
        created () {
        },
        mounted () {
          this.commentF = this.commentInputState
          // 如果支持 popstate 一般移动端都支持了
          if (window.history && window.history.pushState) {
            // 往历史记录里面添加一条新的当前页面的url
            history.pushState(null, null, document.URL)
            // 给 popstate 绑定一个方法 监听页面刷新
            window.addEventListener('popstate', this.backChange, false) // false阻止默认事件
          }
        },
        methods: {
          // 该页面以学习圈评论为模板 复用至其余页面
          backChange () {
            // 使用了手机的物理回退按键时 显示对圈子-详情一级评论的回复框
            this.commentF = true
          },
          async addCourseComment () {
            // eslint-disable-next-line 
            let mId = this.MainId ? this.MainId : this.circleCommentId // MainId存在对评论进行回复，否则对圈子回复
            let pId = this.ParentId ? this.ParentId : 0 // parentId为0代表1级评论 不为0 为对评论进行回复
            let tName = this.typeName
            let res = await AddComment({
              Type: tName,
              Content: this.commentText,
              ParentId: pId,
              MainId: mId
            })
            if (res.IsSuccess) {
              this.page = 1
              this.commentText = ''
              this.getCommentBoxList()
              this.commentF = true
              Toast({ message: res.Message, position: 'bottom' })
            } else {
              Toast({ message: res.Message, position: 'bottom' })
            }
          },
          focusInput (item) {
            this.MainId = item.MainId
            this.ParentId = item.Id
            // console.log(this.MainId, this.ParentId)
            if (this.ParentId == 0) {
              this.commentF = true
              this.$nextTick(() => {
                this.$refs.focusInput.focus()
              })
            } else {
              this.commentF = false
              this.$emit('emitstate', this.commentF)
              this.$nextTick(() => {
                this.$refs.focusInput2.focus()
              })
            }
          }
        },
        destroyed () {
          window.removeEventListener('popstate', this.backChange, false) // false阻止默认事件
        },
        watch: {
          commentInputState (val) {
            if (val) {
              this.commentF = val
            }
          } 
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
     .commentBox{
        top: toRem(400px);
        width: 100%;
        .cb-title{
          width: 100%;
          height: toRem(96px);
          line-height: toRem(96px);
          color: #333;
          font-size: 16px;
          border-bottom: toRem(5px) solid #e8e8e8;
          display: flex;
          justify-content: space-between;
          .text{
              margin-left: toRem(30px);
          }
          .close{
              margin-right: toRem(30px);
              img{
                  width: toRem(26px);
                  height: toRem(27px);
              }
          }
        }
        .cb-con{
          overflow: scroll;
          ul{
            li{
              display: flex;
              justify-content: space-between;
              padding: toRem(30px) 0 0 toRem(30px);
              .hd{
                img{
                  width: toRem(80px);
                  height: toRem(80px);
                  border-radius: 50%;
                }
              }
              .bd{
                width: toRem(620px);
                border-bottom: 1px solid #ddd;
                @extend %clearFix;
                padding-bottom: toRem(20px); 
                .left-hand{
                  float: left;
                  width: toRem(600px);
                  .replyF{
                    .nt{
                      @extend %clearFix;
                      line-height: toRem(40px);
                      .name{
                        color: #333;
                        float: left;
                        font-size: 16px;
                      }
                      .time{
                        color: #989898;
                        float: left;
                        margin-left: toRem(20px);
                      }
                    }
                    .text{
                      margin-top: toRem(15px);
                      line-height: toRem(25px);
                      font-size: 14px;
                    }
                  }
                  
                  .replyS{
                    ul{
                      margin-top: toRem(30px);
                      li{
                        background: #f4f4f4;
                        padding: toRem(20px);
                        &:nth-child(1){
                          padding-top: toRem(20px);
                        }
                        &:nth-child(2){
                          padding-top: toRem(0px);
                        }
                        .replyList{
                          @extend %clearFix;
                          font-size: 15px;
                          .replyList_p1{
                            float: left;
                            line-height: toRem(32px);
                            div{
                              &:nth-child(1){
                                font-weight: bold;
                              }
                            }
                          }
                          .replyList_p2{
                            float: left;
                            line-height: toRem(32px);
                          }
                        }
                      }
                    }
                    .seeMore{
                      background: #f4f4f4;
                      padding: 0 0 toRem(20px) toRem(20px);
                      color: #333;
                      font-size: 16px;
                      font-weight: bold;
                      span{
                        color: #3462c6;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .reply,.replyUser{
          padding: toRem(15px) toRem(30px);
          position: absolute;
          bottom: 0;
          display: flex;
          background: #fff;
          justify-content: space-between;
          color: #4a608c;
          box-shadow: 0 0 toRem(10px) #d8d8d8;
          .reply-box{
            width: toRem(600px);
            background: #f5f9ff;
            height: toRem(68px);
            display: flex;
            justify-content: flex-start;
            border-radius: toRem(40px);
            img{
              width: toRem(34px);
              height: toRem(32px);
              margin-left: toRem(40px);
              margin-top: toRem(20px);
            }
            input{
              margin-left: toRem(10px);
              width: toRem(480px);
              height: toRem(40px);
              margin-top: toRem(16px);
              background: transparent;
              font-size: 16px;
              &::-webkit-input-placeholder{
                  color: #4a608c;
              }
              &::-moz-placeholder{  
                  color: #4a608c;        
              }
              &:-ms-input-placeholder{
                  color: #4a608c;        
              }
            }
          }
          .btn{
            color: #4a608c;
            font-size: 16px;
            margin-left: toRem(15px);
            margin-top: toRem(20px);
          }
        }
      }
</style>
