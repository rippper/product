<template>
    <div class="exam_Conp_titlelist">
        <div class="exam_Conp_titlename">
            <span class="exam_Conp_colorbox" :class="{'exam_Conp_colorboxblue':keys == 'singleList', 'exam_Conp_colorboxred':keys == 'moreList', 'exam_Conp_colorboxyellow':keys == 'textList'}"></span><span class="exam_Conp_titlelabel" v-text="topicTitle"></span>
        </div>
        <div class="exam_Conp_titlebutton">
            <ul>
                <li v-for="(item, index) in data" :key="index">
                    <div class="exam_Conp_donebutton" v-text="item.Sequence" v-if="item.result != 'no answer'" @click="navigationWay(item.Sequence)"></div>
                    <div class="exam_Conp_unfinishbutton" v-text="item.Sequence" v-if="item.result == 'no answer'" @click="navigationWay(item.Sequence)"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'examTitleList',
    data () {
        return {
            topicTitle: '单选题'
        }
    },
    props: {
        data: Array,
        keys: String,
        navigationWay: Function
    },
    mounted () {
        this.editTitle()
    },
    methods: {
        editTitle () {
            switch (true) {
                case this.keys == 'singleList':
                    this.topicTitle = '单选题'
                    break
                case this.keys == 'moreList':
                    this.topicTitle = '多选题'
                    break
                case this.keys == 'textList':
                    this.topicTitle = '简答题(意见题)'
                    break
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .exam_Conp_titlelist{
        padding-top: toRem(35px);
        .exam_Conp_titlename{
            margin-bottom: toRem(30px);
            .exam_Conp_colorbox{
                display: inline-block;
                width: toRem(20px);
                height: toRem(20px);
                margin-right: toRem(13px);
            }
            .exam_Conp_colorboxblue{
                background: #4674df;
            }
            .exam_Conp_colorboxred{
               background: #e36355;
            }
            .exam_Conp_colorboxyellow{
               background: #e8b22c;
            }
            .exam_Conp_titlelabel{
                font-size: toRem(30px);
                font-weight: 600;
            }
        }
        .exam_Conp_titlebutton{
            ul{
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                li{
                    .exam_Conp_unfinishbutton,
                    .exam_Conp_donebutton{
                        width: toRem(70px);
                        height: toRem(70px);
                        text-align: center;
                        line-height: toRem(70px);
                        margin-right: toRem(6px);
                        margin-bottom: toRem(10px);
                        border-radius: 3px;
                    }
                    .exam_Conp_unfinishbutton{
                        background: #f4f8ff;
                        color: #4674df;
                    }
                    .exam_Conp_donebutton{
                        background: #4674df;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
