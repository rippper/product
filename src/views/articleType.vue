/*
 * 文章分类 
 */
<template>
    <div class="articleType" ref="articleType">
        <div class="artic_Header">
            <div class="artic_LeftPart">
                <i class="artic_Reback"></i>
            </div>
            <div class="artic_Center">
                文章分类
            </div>
            <div class="artic_RightPart">
                <i class="artic_Search"></i>
            </div>
        </div>
        <div class="artic_Body" ref="artic_Body">
            <div class="artic_SelectName" ref="artic_SelectName">
                <ul ref="artic_lineLength">
                    <li 
                        v-for="(item, index) in articleType" 
                        :key="index" 
                        :class="{ 'artic_BeSelect':item.jugement }"
                        ref="artic_lineItem"
                    >
                    <span v-text="item.name" @click="MakeSelect(index)"></span>
                    <span :class="{ 'artic_BeChoose':item.jugement }"></span>
                    </li>
                </ul>
            </div>
            <div class="artic_SelectForMore">
                <span class="artic_ForTheMore"></span>
                <span class="artic_DeffType">分类</span>
            </div>
        </div>
        <div class="artic_NewsContent" ref="artic_NewsContent">

        </div>
    </div>
</template>

<script>
export default {
    name: 'articletype',
    data () {
        return {
            label: '文章分类',
            articleType: [
                {
                    name: '新闻资讯',
                    jugement: true
                }, 
                {
                    name: '常见问题',
                    jugement: false
                }, 
                {
                    name: '图片新闻',
                    jugement: false
                },
                {
                    name: '地方动态',
                    jugement: false    
                },
                {
                    name: '学习展示',
                    jugement: false
                },
                {
                    name: '新闻资讯',
                    jugement: true
                }, 
                {
                    name: '常见问题',
                    jugement: false
                }, 
                {
                    name: '图片新闻',
                    jugement: false
                },
                {
                    name: '地方动态',
                    jugement: false    
                },
                {
                    name: '学习展示',
                    jugement: false
                },
                {
                    name: '新闻资讯',
                    jugement: true
                }, 
                {
                    name: '常见问题',
                    jugement: false
                }, 
                {
                    name: '图片新闻',
                    jugement: false
                },
                {
                    name: '地方动态',
                    jugement: false    
                },
                {
                    name: '学习展示',
                    jugement: false
                }
            ]
        }
    },
    mounted () {
        this.calculateHeight()
    },
    methods: {
        calculateHeight () {
            let height = window.screen.height
            this.$refs.articleType.style.height = height + 'px'
            let top = parseFloat(window.getComputedStyle(this.$refs.artic_NewsContent).top)
            this.$refs.artic_NewsContent.style.height = height - top + 'px'
        },
        MakeSelect (index) {
            this.articleType.forEach(item => {
                item.jugement = false
            })
            this.articleType[index].jugement = true
            let leftindex = this.$refs.artic_lineItem[index].offsetLeft
            this.$nextTick(() => {
                this.$refs.artic_lineLength.scrollTo(leftindex, 0)
            })
            console.log(leftindex)
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .articleType{
        position: relative;
        .artic_Header{
            width: 100%;
            height: toRem(92px);
            line-height: toRem(92px);
            background: #4071da;
            color: #fff;
            display: flex;
            padding: 0 toRem(20px);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            .artic_LeftPart{
                flex: 1;
                text-align: left;
                position: relative;
                .artic_Reback{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: toRem(24px);
                    height: toRem(42px);
                    background: url('../assets/arti-rebackblank.png');
                    background-size: 100%;
                }
            }
            .artic_Center{
                flex: 14;
                text-align: center;
                font-size: toRem(35px);
            }
            .artic_RightPart{
                flex: 1;
                text-align: right;
                position: relative;
                .artic_Search{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: toRem(40px);
                    height: toRem(40px);
                    background: url('../assets/arti_searchblank.png');
                    background-size: 100%;
                }
            }
        }
        .artic_Body{
            height: toRem(250px);
            padding-top: toRem(92px);
            background: #4071da;
            display: flex;
            .artic_SelectName{
                width: toRem(612px);
                height: toRem(90px);
                line-height: toRem(90px);
                font-size: toRem(30px);
                color: #fff;
                overflow: hidden;
                position: relative;
                ul{
                    display: flex;
                    height: toRem(100px);
                    overflow: auto;
                    li{
                        width: toRem(168px);
                        // padding: 0 toRem(17px);
                        text-align: center;
                        flex-shrink: 0;
                        position: relative;
                        .artic_BeChoose{
                            width: toRem(32px);
                            height: toRem(8px);
                            background: #ff0;
                            position: absolute;
                            top:84%;
                            left:50%;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
                .artic_BeSelect{
                    font-size: toRem(35px);
                    color: #ff0;
                    border-radius: 4px;
                }
            }
            .artic_SelectForMore{
                vertical-align: middle;
                height: toRem(90px);
                line-height: toRem(90px);
                flex: 1;
                padding-left: toRem(15px);
                .artic_ForTheMore{
                    display: inline-block;
                    width: toRem(30px);
                    height: toRem(30px);
                    background: url('../assets/artic-templeformore.png') no-repeat;
                    background-size: 100%;
                    margin-right: toRem(5px);
                    position: relative;
                    top: toRem(4px);
                }
                .artic_DeffType{
                    color:#fff;
                    font-size: toRem(30px);
                }
            }
        }
        .artic_NewsContent{
            width: 100%;
            height: 100%;
            background: #fff;
            position:absolute;
            top: toRem(180px);
            left: 0;
            border-top-left-radius: toRem(45px);
            border-top-right-radius: toRem(45px);
        }
    }
</style>
