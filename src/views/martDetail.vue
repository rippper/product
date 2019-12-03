<template>
    <div class="martDetail">
        <div class="banner">
            <header-fix></header-fix>
            <swiper :options="productSwiperOption">
                <swiper-slide v-for="(item, index) in productList" :key="index">
                    <img :src="item.Img" alt="">
                </swiper-slide>
            </swiper>
            <div class="bannerIndex">
                <span v-text="imgIndex"></span>/<span v-text="productList.length"></span>
            </div>
        </div>
        
    </div>
</template>

<script>
import { headerFix } from '../components'
export default {
    name: 'martDetail',
    data () {
        const that = this
        return {
            productList: [
                {
                    Img: require('../assets/productexample_pic1.jpg')
                },
                {
                    Img: require('../assets/productexample_pic2.jpg')
                },
                {
                    Img: require('../assets/productexample_pic3.jpg')
                },
                {
                    Img: require('../assets/productexample_pic4.jpg')
                }
            ],
            imgIndex: 1,
            productSwiperOption: {
                slidesPerView: 'auto',
                grabCursor: true,
                initialSlide: 0,
                speed: 800,
                on: {
                    slideChangeTransitionStart: function () {
                        that.imgIndex = this.realIndex + 1
                    }
                }
            }
        }
    },
    methods: {

    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .martDetail{
        .swiper-wrapper{
            height: toRem(650px);
            
        }
        .swiper-slide{
            display: flex;
            align-items:center; 
            background: #fff;
            img{
                width: 100%;
                max-height: toRem(650px);
            }
        }
        .banner{
            position: relative;
            .bannerIndex{
                position: absolute;
                bottom: 0;
                right: 0;
                background: #888;
            }
        }
    }
    
</style>
