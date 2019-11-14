<template>
  <div class="studyCircleCenter container_top">
    <header-fix title="学习圈" fixed>
    </header-fix>
    <!-- 交流圈子 -->
    <section class="communicate-circle">
      <div class="title">
        交流圈子
      </div>
       <swiper :options="srSwiperOption1">
          <swiper-slide >
            <router-link to="/">
                <img src="../assets/circle-img1.png" alt="">
            </router-link>
          </swiper-slide>
          <swiper-slide >
            <router-link to="/">
                <img src="../assets/circle-img1.png" alt="">
            </router-link>
          </swiper-slide>
          <swiper-slide >
            <router-link to="/">
                <img src="../assets/circle-img1.png" alt="">
            </router-link>
          </swiper-slide>
          <swiper-slide >
            <router-link to="/">
                <img src="../assets/circle-img1.png" alt="">
            </router-link>
          </swiper-slide>
        </swiper>
    
    </section>
    <!-- 热门动态 -->
    <section class="hot-trends">
      <div class="title">
        热门动态
      </div>
      <div class="content">
        <ul>
          <li>
            <div class="hd">
              <img src="../assets/headImg-per2.png" alt="" class="headImg">
              <div class="nt">
                <div class="name">
                  周耀炳
                </div>
                <div class="time">
                  2019-09-26 10:38:12
                </div>
              </div>
            </div>
            <div class="bd">
              <div class="text">
                郭达 杰森斯坦森 男生 壁纸有要的拿走的参考...
              </div>
              <div class="imgCon">
                <ul>
                  <li>
                    <img src="../assets/new-course-img1.png" alt="">
                  </li>
                  <li>
                    <img src="../assets/new-course-img1.png" alt="">
                  </li>
                  <li>
                    <img src="../assets/new-course-img1.png" alt="">
                  </li>
                </ul>
              </div>
            </div>
            <div class="ft">
              <div class="sort">
                <p>生活</p>
                <p>诗歌朗诵</p>
              </div>
              <div class="handle">
                <div class="praise">
                  <img src="../assets/praise-white.png" alt=""> 20
                </div>
                <div class="message">
                  <img src="../assets/message-white.png" alt=""> 20
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer-fix selected="studyCircleCenter"></footer-fix>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
              proList1: [],
              srSwiperOption1: {
                slidesPerView: 'auto',
                grabCursor: true,
                loop: true,
                freeMode: true,
                freeModeMomentum: false
              }
            }
        },
        created () {

        },
        mounted () {

        },
        methods: {

        },
        watch: {

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .studyCircleCenter{
      height: 100vh;
      background: #fff;
      .header{
        .header_title{
          font-size: 16px;
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
                  display: flex;
                  justify-content: space-around;
                  margin-top: toRem(25px);
                  li{
                    box-shadow: none;
                    margin: 0;
                    width: toRem(197px);
                    height: toRem(197px);
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
      }
    }
</style>
