<template>
    <div class="studyCirclePublish container_top">
        <header-fix fixed title="发布动态">
            <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <section class="createPost">
            <textarea name="" id="" placeholder="分享一些新鲜事~" v-model="trendData.textArea"></textarea>
            <div class="picAdd">
                <!-- <ul>
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
                </ul> -->
                <ul>
                    <li class="upload-item" v-for="(item,index) in picList" :key="index">
                        <img class="uploaded_attach" :src="item.Url" alt="upload">
                        <img class="delete_btn" src="../assets/close-icon.png" alt="delete" @click="deleteAttach(item, index)">
                    </li>
                    <li class="upload-btn">
                        <img 
                            class="uploaded_attach"
                            src="../assets/upload-btn.png" 
                            alt="upload"
                        >
                        <input type="file" ref="attach" @change="onchangeImgFun($event)">
                    </li>
                </ul>
            </div>
        </section>
        <mt-button class="publishBtn" @click="publishArticle">立即发布</mt-button>
    </div>
</template>

<script>
    import { UploadAttachment, CircleArticleCreate } from '../service/getData'
    import { Toast, MessageBox } from 'mint-ui'
    export default {
        data () {
            return {
                picList: [], // 上传图片的展示列表
                trendData: { // 发布时提交的数据
                    uploadPicList: [],
                    textArea: ''
                },
                textareaVal: {},
                id: ''
            }
        },
        created () {
            this.id = this.$route.query.id
        },
        mounted () {

        },
        methods: {
            async publishArticle () {
                // let time = new Date()
                // this.CreatedDate = formatDate(time, 'yyyy-MM-dd')
                if (!this.trendData.textArea) {
                    Toast('请填写您的发布内容')
                } else {
                    let data = await CircleArticleCreate({
                        CircleEnclosure: this.trendData.uploadPicList,
                        Content: this.trendData.textArea,
                        CircleId: this.id,
                        Title: this.trendData.textArea
                    })
                    if (data.Type == 1) {
                        this.trendData = []
                        this.picList = []
                        Toast('动态发布成功,内容正在审核中')
                        this.$nextTick(() => {
                            this.$router.push({ path: '/studyCircleStageDetail', query: { id: this.id } })
                        })
                    }
                }
            },
            async onchangeImgFun (e) {
                var file = e.target.files[0]
                // console.log(file)
                let arr = file.name.split('.')
                let fileType = arr[arr.length - 1]
                let formData = new FormData()
                let fileName = `${+new Date()}.${fileType}`
                this.imgName = fileName
                formData.append('FileType', 'ImageCircle')
                formData.append('FileCode', fileName)
                formData.append('FileName', fileName)
                formData.append('file', file, fileName)
                let res = await UploadAttachment(formData)
                if (res.IsSuccess) {
                    let obj = {
                        Name: fileName,
                        Url: window.URL.createObjectURL(file),
                        Type: 'Pic'
                    }
                    let obj1 = {
                        Name: fileName,
                        Url: fileName,
                        Type: 'Pic'
                    }
                    this.picList.push(obj)
                    this.trendData.uploadPicList.push(obj1)
                }
                // console.log(this.picList)
            },
            deleteAttach (item, index) {
                MessageBox.confirm('是否要删除该文件？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.picList.splice(index, 1)
                    this.trendData.uploadPicList.splice(index, 1)
                    Toast({ message: '删除成功!' })
                }).catch(() => {
                    Toast({ message: '已取消删除!' })
                })
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
