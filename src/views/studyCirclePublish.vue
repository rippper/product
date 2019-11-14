<template>
    <div class="studyCirclePublish container_top">
        <header-fix fixed title="发布动态">
            <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <section class="createPost">
            <textarea name="" id="" placeholder="分享一些新鲜事~"></textarea>
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
        </section>
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
            onchangeImgFun () {

            }
        },
        watch: {

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .studyCirclePublish{
        width: 100vw;
        height: 100vh;
        background: #fff;
        .header{
            .header_title{
                font-size: 18px;
                font-weight: bold;
            }
        }
        .createPost{
            padding: toRem(45px) toRem(30px) 0 toRem(30px);
            textarea{
                color: #a9bcc7;
                font-size: 15px;
                height: toRem(120px);
                &::-webkit-input-placeholder{
                    color: #a9bcc7;
                }
                &::-moz-placeholder{  
                    color: #a9bcc7;        
                }
                &:-ms-input-placeholder{
                    color: #a9bcc7;        
                }
            }
            .picAdd{
                margin-bottom: toRem(30px);
                ul{
                    @extend %clearFix;
                    .upload-item{
                        position: relative;
                        height: toRem(168px);
                        width: toRem(168px);
                        margin-right: toRem(45px);
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
</style>
