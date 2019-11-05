<template>
    <div class="commentBox">
        <div class="cb-title">
          <p class="text">评论</p>
          <p class="close" @click.stop="closeBox()"><img src="../assets/cancel.png" alt=""></p>
        </div>
        <div class="cb-con">
          <ul>
            <li>
              <div class="hd">
                <img src="../assets/headImg-per2.png" alt="">
              </div>
              <div class="bd">
                <div class="left-hand">
                  <div class="nt">
                    <div class="name">
                      李顺成
                    </div>
                    <div class="time">
                      2018-07-06
                    </div>
                  </div>
                  <div class="text">
                    好棒！好像参加！组织的真好！！！
                  </div>
                </div>
                <div class="right-hand" @click.stop="showListBox">
                  <p><img src="../assets/message-icon.png" alt=""></p>
                  <p class="num">9条</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props: {
            closeBox: {
                type: Function
            },
            showListBox: {
                type: Function
            }
        },
        created () {

        },
        mounted () {

        },
        methods: {

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
          text-align: center;
          color: #333;
          font-size: 16px;
          border-bottom: toRem(5px) solid #e8e8e8;
          .text{
              float: left;
              width: 8rem;
              text-align: center;
              margin-left: 1rem;
          }
          .close{
              float: left;
              width: 1rem;
              img{
                  width: toRem(26px);
                  height: toRem(27px);
              }
          }
        }
        .cb-con{
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
                    line-height: toRem(30px);
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
                    line-height: toRem(20px);
                    font-size: 14px;
                  }
                }
                .right-hand{
                  float: right;
                  margin-right: toRem(30px);
                  p{
                    img{
                      width: toRem(30px);
                      height: toRem(28px);
                    }
                    &:nth-child(2){
                      margin-top: toRem(10px);
                      color: #989898;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
      }
</style>
