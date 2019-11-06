<template>
    <div class="artic_TheList">
        <div class="artic_TheList_LeftDepart">
            <div class="artic_LeftDepart_TitleDepart">
                <p>
                    <span class="artic_LeftDepart_RedFire" v-if="data.HotLevel == 1"></span>
                    <span class="artic_LeftDepart_YellowFire" v-else-if="data.HotLevel == 2"></span>
                    <span class="artic_LeftDepart_Title" v-text="data.ArticleTitle"></span>
                </p>
            </div>
            <div class="artic_LeftDepart_Infor">
                <span v-text="Time"></span>
                <span class="artic_EyesWatcher"></span>
                <span v-text="data.ClickCount"></span>
            </div>
        </div>
        <div class="artic_TheList_RightDepart">
            <img :src="data.ArticleImg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'articleList',
    props: {
        data: Object
    },
    computed: {
        Time () {
            let last = new Date(this.data.ArticleCreateDate).getTime()
            let now = new Date().getTime()

            let between = (now - last) / 1000
                between = Math.floor(between / 3600)

            if (between <= 12 && between == 0) {
                return '刚刚' 
            } else if (between <= 12 && between > 0) {
                return between + '小时前'
            } else {
                return this.data.ArticleCreateDate.substr(0, 16)
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .artic_TheList{
        display: flex;
        justify-content: space-between;
        .artic_TheList_LeftDepart{
            
            .artic_LeftDepart_TitleDepart{
                height: toRem(115px);
                p{
                    line-height: toRem(50px);
                    margin-bottom: toRem(15px);
                    @include ellipsis_two(2);
                    .artic_LeftDepart_RedFire,
                    .artic_LeftDepart_YellowFire{
                        display: inline-block;
                        width: toRem(30px);
                        height: toRem(32px);
                        position: relative;
                        top: toRem(2px);
                        margin-right: toRem(20px);
                    }
                    .artic_LeftDepart_RedFire{
                        background: url('../assets/article-firered.png');
                        background-size: 100%;
                    }
                    .artic_LeftDepart_YellowFire{
                        background: url('../assets/article-fireyellow.png');
                        background-size: 100%;
                    }
                    .artic_LeftDepart_Title{
                        font-size: toRem(30px);
                        font-weight: bold;
                    }
                }
            }
            .artic_LeftDepart_Infor{
                color: #b0c1cb;
                .artic_EyesWatcher{
                    display: inline-block;
                    width: toRem(27px);
                    height: toRem(18px);
                    margin: 0 toRem(15px) 0 toRem(50px);
                    background: url('../assets/article-eyes.png') no-repeat;
                    background-size: 100%;
                }
            }
        }    
        .artic_TheList_RightDepart{
            img{
                width: toRem(225px);
                height: toRem(150px);
                border-radius: toRem(15px);
            }
        }
    }
</style>
