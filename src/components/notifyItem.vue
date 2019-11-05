<template>
    <div class="notifyItem">
        <p class="noti_Title"><span class="noti_TitleContent" v-text="data.Name"></span><span class="noti_important" v-if="data.NoticeCategory[0].Name == '重要通知'">重要通知</span></p>
        <p><span class="noit_InforText" v-text="Time"></span><span class="noit_Eyes"></span><span class="noit_InforText" v-text="data.Click"></span></p>
    </div>
</template>

<script>
export default {
    name: 'notifyItem',
    data () {
        return {
            
        }
    },
    props: {
        data: Object
    },
    mounted () {

    },
    methods: {

    },
    computed: {
        Time () {
            let last = new Date(this.data.CreateDate).getTime()
            let now = new Date().getTime()

            let between = (now - last) / 1000
                between = Math.floor(between / 3600)
                
            if (between <= 12) {
                return between + '小时前' 
            } else {
                return this.data.CreateDate.substr(0, 16)
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .notifyItem{
        background: #fff;
        padding-top: toRem(20px);
        padding-bottom: toRem(30px);
        border-bottom: toRem(1px) solid #b1b1b1;
        .noti_Title{
            font-size: toRem(34px);
            font-weight: 600;
            margin-bottom: toRem(35px);
            &:before{
                content: '';
                height: 100%;
                vertical-align: middle;
                display: inline-block;
            }
            .noti_TitleContent{
                margin-right: toRem(15px);
            }
            .noti_important{
                vertical-align: middle;
                display: inline-block;
                width: toRem(120px);
                height: toRem(36px);
                line-height: toRem(30px);
                padding-top: toRem(3px);
                padding-bottom: toRem(3px);
                border-radius: 3px;
                position: relative;
                bottom: toRem(3px);
                font-size: toRem(25px);
                font-family: '宋体';
                font-weight: lighter;
                color: #fff;
                background: #f00;
                text-align: center;
            }
        }
        .noit_InforText{
            margin-right: toRem(50px);
        }
        .noit_Eyes{
            display: inline-block;
            width: toRem(27px);
            height: toRem(18px);
            margin-right: toRem(15px);
            background: url('../assets/noti_watcher.png');
            background-size: 100%;
        }
    }
    
</style>
