<template>
    <div class="studyCircleCreate container_top">
        <header-fix fixed title="创建圈子">
            <i @click.stop="goBack" class="webapp webapp-left" slot="left"></i>
        </header-fix>
        <section class="circleCon">
            <div class="name">
               <p class="title">圈子名称</p>
               <input type="text" placeholder="请输入圈子名称">
            </div>
            <div class="tip">
               <p class="title">圈子说明</p>
               <textarea name="" id="" placeholder="请输入您的圈子说明"></textarea>
            </div>
            <div class="upload">
                <p class="title">上传封面</p>
                <div class="picAdd">
                    <ul>
                        <li class="upload-item">
                            <img class="uploaded_attach" src="../assets/class_bg.png" alt="upload">
                            <img src="../assets/close-icon.png" class="delete_btn" alt="">
                        </li>
                        <li class="upload-btn">
                            <img 
                                src="../assets/upload-btn.png" 
                                alt="upload"
                                class="uploaded_attach"
                            >
                            <input type="file" ref="attach" @change="onchangeImgFun($event)">
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <mt-button type="default" class="publishBtn">立即发布</mt-button>
    </div>
</template>

<script>
    export default {
        data () {
            return {

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

    .studyCircleCreate{
        background: #fff;
        height: 100vh;
        width: 100vw;
        .circleCon{
            padding: 0 toRem(30px);
            .name{
                border-bottom: 1px solid #ddd;
                padding: toRem(45px) 0;
                .title{
                    color: #a9bcc7;
                }
                input{
                    margin-top: toRem(30px);
                    color: #333;
                    font-weight: bold;
                    font-size: 15px;
                }
            }
            .tip{
                border-bottom: 1px solid #ddd;
                padding: toRem(45px) 0;
                .title{
                    color: #a9bcc7;
                }
                textarea{
                    margin-top: toRem(30px);
                    height: toRem(60px);
                    font-size: 15px;
                    color: #333;
                    font-weight: bold;
                }
            }
            .upload{
                .title{
                    color: #a9bcc7;
                    padding-top: toRem(45px) ;
                }
                .picAdd{
                    ul{
                        @extend %clearFix;
                        .upload-item{
                            position: relative;
                            height: toRem(168px);
                            width: toRem(168px);
                            margin-right: toRem(50px);
                            float: left;
                            margin-top: toRem(25px);
                            .uploaded_attach{
                                position: absolute;
                                width: toRem(168px);
                                height: toRem(168px);
                                top: 0;
                            }
                            .delete_btn{
                                position: absolute;
                                top: toRem(-20px);
                                right: toRem(-20px);
                                width: toRem(40px);
                                height: toRem(40px);
                                cursor: pointer;
                            }
                        }
                        .upload-btn{
                            position: relative;
                            float: left;
                            display: block;
                            height: toRem(168px);
                            width: toRem(168px);
                            margin-right: toRem(20px);
                            margin-top: toRem(25px);
                            cursor: pointer;
                            margin-top: toRem(24px);
                            img{
                                position: absolute;
                                width: toRem(168px);
                                height: toRem(168px);
                                display: inline-block;
                            }
                            input{
                                position: absolute;
                                left: 0;
                                top: 0;
                                opacity: 0;
                                width: toRem(168px);
                                height: toRem(168px);
                                z-index: 1;
                            }
                        }
                    }
                }
            }
        }
        .publishBtn{
            margin: 0 toRem(50px);
            background: #3462c6;
            color: #fff;
            width: toRem(650px);
            font-size: 17px!important;
            border-radius: toRem(50px)!important;
            position: fixed;
            bottom: toRem(100px);
        }
    }
</style>
