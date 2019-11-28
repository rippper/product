<template>
    <div class="examResultTable">
        <p class="examResult_topType"><span class="examResult_typeBox"></span><span v-text="topicName" class="examResult_typewords"></span></p>
        <div class="examResult_topicList">
            <ul>
                <li v-for="(item, index) in topicList" :key="index" :class="{ 'is-corrent': item.topicResult == 1, 'is-worry': item.topicResult == 2, 'not-result': item.topicResult == 3 }" v-text="item.topicIndex"></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'examResultTable',
    data () {
        return {
        }
    },
    props: {
        topicName: String,
        topicList: Array
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .examResultTable{
        .examResult_topType{
            height: toRem(80px);
            line-height: toRem(80px);
            font-size: toRem(30px);
            font-weight: 600;
            .examResult_typeBox{
                display: inline-block;
                width: toRem(25px);
                height: toRem(25px);
                margin-right: toRem(18px);
                background: linear-gradient(to right, #f7c24f, #f1a42a);
                border-radius: toRem(3px);
            }
            .colorbox-red{
                background: linear-gradient(to right, #f7c24f, #f1a42a);
            }
            .colorbox-yellow{
                background: linear-gradient(to right, #f7c24f, #f1a42a);
            }
            .colorbox-blue{
                background: linear-gradient(to right, #f7c24f, #f1a42a);
            }
        }
        .examResult_topicList{
            ul{
                display:flex;
                flex-wrap: wrap;
                li{
                    width: toRem(70px);
                    height: toRem(70px);
                    margin: 0 toRem(16px) toRem(16px) 0;
                    line-height: toRem(70px);
                    text-align: center;
                }
                .is-corrent{
                    background: url('../assets/exam-resultcorrent.png') no-repeat;
                    background-size: 100%;
                }
                .is-worry{
                    background: url('../assets/exam-resultcross.png') no-repeat;
                    background-size: 100%;
                }
                .not-result{
                    background: url('../assets/exam-noresult.png') no-repeat;
                    background-size: 100%;
                }
            }
        }
    }
</style>
