<template>
    <div class="studyCircleCreate container_top">
        <header-fix fixed title="创建圈子">
            <i @click.stop="goBack" class="webapp webapp-left" slot="left"></i>
        </header-fix>
        <section class="circleCon">
            <div class="name">
               <p class="title">圈子名称</p>
               <input type="text" placeholder="请输入圈子名称" v-model="circleName">
            </div>
            <div class="tip">
               <p class="title">圈子说明</p>
               <textarea name="" id="" placeholder="请输入您的圈子说明" v-model="circleTip"></textarea>
            </div>
            <div class="upload">
                <p class="title">上传封面</p>
                <div class="picAdd">
                    <div class="uc">
                        <input type="file" name="image" ref="attach" accept="image/*" @change='onchangeImgFun($event)'
                        class="header-upload-btn user-header-com">
                        <img alt="" :src='imgSrc' class="user-header-img user-header-com" >
                    </div>
                </div>
            </div>
        </section>
        <mt-button type="default" class="publishBtn" @click.stop="getCircleCreate">立即发布</mt-button>
    </div>
</template>

<script>
    import { CircleCreate, UploadAttachment } from '../service/getData'
    import { Toast } from 'mint-ui'
    import { goBack } from '../service/mixins'
    export default {
        mixins: [goBack],
        data () {
            return {
                circleName: '',
                circleTip: '',
                imgSrc: require('../assets/upload-btn.png'),
                imgName: '',
                TypeId: '',
                title: ''
            }
        },
        created () {
            this.TypeId = this.$route.query.id
            this.title = this.$route.query.title
        },
        mounted () {

        },
        methods: {
            async getCircleCreate () {
                if (!this.circleName) {
                    Toast({ message: '圈子名称不能为空', position: 'bottom' })
                } else if (!this.circleTip) {
                    Toast({ message: '圈子说明不能为空', position: 'bottom' })
                } else {
                    let res = await CircleCreate({
                        Name: this.circleName,
                        Remark: this.circleTip,
                        Img: this.imgName,
                        TypeId: this.TypeId
                    })
                    if (res.IsSuccess) {
                        this.circleName = ''
                        this.circleTip = ''
                        this.imgName = ''
                        this.imgSrc = ''
                        Toast({ message: '恭喜您,圈子创建成功,正在审核中', position: 'bottom' })
                        this.$nextTick(() => {
                            this.$router.push({ path: '/studyCircleStage', query: { id: this.TypeId, title: this.title } })
                        })
                    }
                }
            },
            async onchangeImgFun (e) {
                let file = e.target.files[0]
                // console.log(file)
                let arr = file.name.split('.')
                let fileType = arr[arr.length - 1]
                let formData = new FormData()
                let fileName = `${+new Date()}.${fileType}`
                this.imgName = fileName
                // console.log(fileName)
                formData.append('FileType', 'ImageCircle')
                formData.append('FileCode', fileName)
                formData.append('FileName', fileName)
                // this.imgSrc = window.URL.createObjectURL(file)
                formData.append('file', file, fileName)
                // console.log(this.imgSrc)
                console.log(formData.get('FileCode'), formData.get('FileName'), formData.get('FileType'))
                let res = await UploadAttachment(formData)
                if (res.IsSuccess) {
                    this.imgSrc = window.URL.createObjectURL(file)
                }
            }
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
                    padding-top: toRem(45px);
                }
                .picAdd{
                    margin-top: toRem(30px);
                    .uc{
                        position: relative;
                        display: inline-block;
                        cursor: pointer;
                        .user-header-com{
                            width: toRem(134px);
                            height: toRem(133px);
                            display: inline-block;
                        }
                        .header-upload-btn{
                            position: absolute;
                            left: 0;
                            top: 0;
                            opacity: 0;
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
