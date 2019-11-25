<template>
    <div class="commentBox">
        <div class="cb-title">
          <p class="text">全部{{commentCount}}条评论</p>
          <p class="close" @click.stop="closeBox()"><img src="../assets/cancel.png" alt=""></p>
        </div>
          <section v-infinite-scroll="getCommentList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
              <div class="cb-con">
                <ul>
                  <li v-for="item in commentList" :key="item.Id">
                    <div class="hd">
                      <img :src="item.UserImg" alt="">
                    </div>
                    <div class="bd">
                      <div class="left-hand">
                        <div class="nt">
                          <div class="name">
                            {{item.UserName}}
                          </div>
                          <div class="time">
                            {{item.CreateDate || dateFilter("yyyy-MM-dd")}}
                          </div>
                        </div>
                        <div class="text">
                          {{item.Comment}}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
          </section>
          <!-- <div class="no-data">没有更多评价啦</div> -->
        <div class="reply">
          <div class="reply-box">
            <img src="../assets/message-blue.png" alt="">
            <input type="text" placeholder="说点什么吧..." v-model="commentText">
          </div>
          <p class="btn" @click="addCourseComment">评价</p>
        </div>
    </div>

</template>
  
<script>
    import { AddCourseComment, GetCourseCommentList } from '../service/getData'
    import { Toast } from 'mint-ui'
    export default {
        data () {
            return {
              commentText: '',
              page: 1,
              commentList: [],
              commentCount: '',
              immediate: false,
              loading: false
            }
        },
        props: {
            closeBox: {
              type: Function
            },
            courseId: {
              type: String || Number
            }
        },
        created () {
        },
        mounted () {
          this.getCommentList()
        },
        methods: {
          async addCourseComment () {
            let res = await AddCourseComment({
              mainId: this.courseId,
              parentId: 0,
              content: this.commentText
            })
            if (res.IsSuccess) {
              this.page = 1
              this.commentList = []
              this.commentText = ''
              this.getCommentList()
              Toast({ message: res.Message, position: 'bottom' })
            } else {
              Toast({ message: res.Message, position: 'bottom' })
            }
          },
          // 课程评论列表
          async getCommentList () {
            this.loading = true
            let res = await GetCourseCommentList({ id: this.courseId, Page: this.page })
            this.loading = false
            let list = res.ListData || []
            this.commentCount = res.Count
            this.$emit('counts', this.commentCount)
            if (this.page == 1 && list.length == 0) {
              this.noData = true
              return
            }
            if (this.page > 1 && list.length == 0) {
              this.noMoreData = true
              return
            }
            this.commentList = this.commentList.concat(list)
            this.page += 1
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
                  width: toRem(510px);
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
              }
            }
          }
        }
        .reply{
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
            margin-left: toRem(30px);
            margin-top: toRem(20px);
          }
        }
      }
</style>
