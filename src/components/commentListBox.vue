<template>
    <div class="commentListBox">
        <header-fix title="全部评价">
          <i class="webapp webapp-left" @click.stop="backComment" slot="left"></i>
        </header-fix>
        <div class="clb-con">
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
            backComment: {
                type: Function
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
    .commentListBox{
        .clb-con{
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
                    }
                }
            }
        }
    }
</style>
