/**
* 注册
*/
<template>
  <div class="register container_top">
    <!--头部-->
    <header-fix title="注册" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <mt-field class="account_field" label="用户名" v-model="infoSend.Account" placeholder=""></mt-field>
    <mt-field label="密码" v-model="infoSend.Password" placeholder=""></mt-field>
    <mt-field label="确认密码" v-model="confirmPwd" placeholder=""></mt-field>
    <mt-field label="姓名" v-model="infoSend.Name" placeholder=""></mt-field>
    <mt-cell title="所在区镇" @click.native="openGroupList" is-link>
      <span>{{infoSend.groupName|| '请选择'}}</span>
    </mt-cell>
    <mt-field class="idcard_field" label="身份证号" v-model="infoSend.IdCard" :attr="{maxlength:18}"
              placeholder=""></mt-field>
    <!-- <mt-cell class="not-required" title="选择职级" @click.native="openGradeList" is-link>
      <span>{{gradeName|| '请选择'}}</span>
    </mt-cell> -->
    <div class="phone-handle">
      <mt-field label="手机号码" v-model="infoSend.Mobile" class="num"></mt-field>
      <mt-cell class="getcode" is-link title="获取验证码" @click.native="getCodeF"></mt-cell>
    </div>
    <mt-field label="邮箱号码" v-model="infoSend.Email" placeholder=""></mt-field>
    <mt-field label="验证码" v-model="infoSend.MobileCode" placeholder=""></mt-field>
    <div class="codeImg-handle">
      <mt-field label="图片验证码" v-model="infoSend.ValidateCode" class="code-num"></mt-field>
      <img :src="this.codeImgSrc" alt="" class="cerCodeImg">
      <p class="codeChange"  @click="codeChange">看不清?<span>换一张</span> </p>
    </div>
    <div class="checkbox">
      <label for="remember_checkbox">
        <span class="mint-checkbox">
          <input id="remember_checkbox" v-model="agreeState" type="checkbox" class="mint-checkbox-input">
          <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label">我已经阅读且同意 <router-link to="/userAgreement">"用户协议和隐私政策声明协议" </router-link></span>&nbsp;
      </label>
    </div>
        <!-- <div class="option-val">
            </router-link> 
        </div> -->
    <div class="submit_edit">
      <mt-button type="primary" size="large" @click.native="verification">注册</mt-button>
    </div>
    <!--选择地区-->
    <group-list-popup :is-show="isShowGroupList" :group-name="groupName"
                      @update:data="overWriteInfoSend"
                      @close="isShowGroupList=false"></group-list-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Button, Cell, Field, MessageBox, Picker, Popup, Toast } from 'mint-ui'
  import { Register, SendMsg, RegPhoneCheck, CheckUserPhone, GetLoginVC } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.component(Button.name, Button)
  Vue.component(Field.name, Field)
  Vue.component(Cell.name, Cell)
  Vue.component(Popup.name, Popup)
  Vue.component(Picker.name, Picker)

  export default {
    mixins: [goBack],
    data () {
      return {
        groupName: '所在区镇',
        infoSend: {
          Account: '',
          Password: '',
          Name: '',
          GroupId: '',
          IdCard: '',
          Email: '',
          Mobile: '',
          MobileCode: '',
          ValidateCode: ''
        },
        confirmPwd: '', // 确认密码,
        isShowGroupList: false,
        gradeList: [], // 职级列表
        gradeSlots: [
          // 职级数据
          {
            flex: 1,
            values: [],
            defaultIndex: 1,
            className: 'gradeList',
            textAlign: 'center'
          }
        ],
        isPassConfirm: false, // 两次输入密码确认
        isPassIdCard: false, // 身份证验证
        isPassMobile: false, // 手机号验证
        isPassPwd: true, // 密码验证
        agreeState: false, // 是否同意注册协议
        RegPhonePass: false, // 改手机号码是否允许注册
        codeImgSrc: '',
        phoneCode: '' // 验证码
      }
    },
    mounted () {
      // this.getGradeList()
      // this.getAllGroupList()
      this.getCodeImg()
    },
    methods: {
      // 注册
      async userRegister () {
        let data = await Register(this.infoSend)
        if (data.Type == 1) {
          Toast({ message: '注册成功', position: 'bottom' })
          this.$router.push('/login')
        } else if (data.Type != 401) {
          this.getCodeImg()
          MessageBox('警告', data.Message)
        }
      },
      // 通过部门列表组件重写数据
      overWriteInfoSend (data) {
        this.infoSend = { ...this.infoSend, ...data }
        this.groupName = data.Name
      },
      openGroupList () {
        this.isShowGroupList = true
      },
      async getCodeF () {
        if (!this.infoSend.Mobile) {
          Toast({ message: '请先输入手机号码' })
          return
        } 
        let phoneNum = this.infoSend.Mobile
        this.RegPhoneCheck(phoneNum)
        if (!this.RegPhonePass) {
          Toast({ message: '该用户已存在' })
        } 
        let data = await SendMsg({ MobileNo: phoneNum })
        console.log(data)
      },
      codeChange () {
        this.getCodeImg()
      },
      async RegPhoneCheck (num) {
        let data = await RegPhoneCheck({ PhoneNo: num })
        if (data.IsSuccess) {
          this.RegPhonePass = true
        }
      },
      async getCheckUserPhone (phone, code) {
        let data = await CheckUserPhone({
          Phonenumber: phone,
          PhoneCode: code
        })
        if (data.IsSuccess) {
          this.codePass = true
        }
      },
      async getCodeImg () {
        let data = await GetLoginVC({ BoolRes: true })
        if (data.IsSuccess) {
            this.codeImgSrc = data.Data.Img
        }
      },
      verification () {
        const toastInfo = message => {
          return { message, position: 'bottom', duration: 2000 }
        }
        if (!this.infoSend.Account) {
          Toast(toastInfo('用户名不能为空'))
        } else if (!this.infoSend.Password) {
          Toast(toastInfo('密码不能为空'))
        } else if (!this.isPassPwd) {
          Toast(toastInfo('密码长度为6~16位'))
        } else if (!this.confirmPwd) {
          Toast(toastInfo('确认密码不能为空'))
        } else if (!this.isPassConfirm) {
          Toast(toastInfo('两次输入密码不一致'))
        } else if (!this.infoSend.Name) {
          Toast(toastInfo('姓名不能为空'))
        } else if (!this.infoSend.GroupId) {
          Toast(toastInfo('请选择所在区镇'))
        } else if (this.isPassIdCard == false) {
          Toast(toastInfo('请输入有效身份证号码'))
        } else if (this.isPassMobile == false) {
          Toast(toastInfo('手机号格式不正确'))
        } else if (this.isPassEmail == false) {
          Toast(toastInfo('邮箱格式不正确'))
        } else if (!this.infoSend.ValidateCode) {
          Toast(toastInfo('图形验证码不能为空'))
        } else if (!this.agreeState) {
          Toast(toastInfo('请同意注册协议'))
        } else {
           this.userRegister()
        }
      }
    },
    watch: {
      confirmPwd: function (val) {
        if (val == this.infoSend.Password) {
          this.isPassConfirm = true
        } else {
          this.isPassConfirm = false
        }
      },
      'infoSend.IdCard': {
        handler: function (val, oldVal) {
          if (val) {
            let regIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            this.isPassIdCard = regIdCard.test(val)
          } else {
            this.isPassIdCard = true
          }
        }
      },
      'infoSend.Mobile': {
        handler: function (val, oldVal) {
          if (val) {
            let regMobile = /^1[3|4|5|7|8]\d{9}$/
            this.isPassMobile = regMobile.test(val)
          } else {
            this.isPassMobile = true
          }
        }
      },
      'infoSend.Password': {
        handler: function (val, oldVal) {
          if (val) {
            if (val.length < 6 || val.length > 16) {
              this.isPassPwd = false
            } else {
              this.isPassPwd = true
            }
          }
        }
      },
      'infoSend.Email': {
        handler: function (val, oldVal) {
          if (val) {
            let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            this.isPassEmail = regEmail.test(val)
          } else {
            this.isPassEmail = false
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .register {
    background-color: $fill-body;

    .account_field, .idcard_field {
      margin-top: toRem(20px);
    }

    .mint-cell {
      .mint-cell-wrapper {
        padding: 0 toRem(30px);
        .mint-cell-text {
          margin-left: 0;
          font-size: 15px;
          &:after {
            content: "*";
            display: inline;
            padding-left: toRem(10px);
            color: $brand-primary;
            font-size: 16px;
            line-height: 1;
          }
        }
      }

      .mint-field-core {
        text-align: right;
      }

      &.not-required {
        .mint-cell-text {
          &:after {
            display: none;
          }
        }
      }
    }

    .webapp-right {
      margin-left: toRem(15px);
      color: #666;
      font-size: 20px;
    }

    .label {
      @extend %pull-left;
      text-align: left;
      width: 30%;
      font-size: 15px;
    }

    .right {
      @extend %pull-right;
      width: 70%;

      input {
        width: 95%;
        padding: toRem(10px) 0;
        line-height: 1.2em;
      }
    }

    .department {
      display: inline-block;
      width: 95%;
      height: toRem(90px);
    }
    .phone-handle{
      @extend %clearFix;
      background: #fff;
      border-bottom: 1px solid #e8e8e8;
      .num{
        float: left;
        width: toRem(550px);
        .mint-cell-wrapper{
          border-bottom: none!important;
        }
      }
      .getcode{
        float: right;
        width: toRem(200px);
        color: #a9bcc7;
        .mint-cell-wrapper{
          padding: 0 0;
          .mint-cell-text{
            &:after {
              content: "";
              line-height: 1;
            }
          }
        }
      }
    }
    .codeImg-handle{
      @extend %clearFix;
      background: #fff;
      .code-num{
        width: toRem(420px);
        float: left;
      }
      .cerCodeImg{
        float: left;
        width: toRem(90px);
        margin-left: toRem(10px);
        height: toRem(36px);
        margin-top: toRem(20px);
      }
      .codeChange{
        float: left;
        margin-left: toRem(15px);
        margin-top: toRem(20px);
        font-size: 14px;
        span{
          color:#089efa;
        }
      }
    }
    .group_list {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }

    .picker-toolbar {
      background-color: $brand-primary;
      color: $color-text-reverse;
      font-size: 16px;

      .btn {
        display: inline-block;
        @include ht-lineHt(80px);
        width: 50%;
        text-align: center;
      }
    }

    .mint-popup-bottom {
      width: 100%;
    }

    .mint-datetime-action {
      color: $color-text-reverse;
    }
    .checkbox {
        font-size: 14px;
        margin-top: toRem(-20px);
        label{
          margin-left: toRem(30px);
        }
        input[type=checkbox] {
          width: toRem(24px);
          height: toRem(24px);
          margin: 0;
        }
        .mint-checkbox-label{
          a {
            color: #5a85e3;
          }
        }
        .mint-checkbox-core {
          border-radius: toRem(5px);
          @include square(30px);
        }
        .mint-checkbox-core::after {
          left: 4px;
          top: 0;
          width: 5px;
          height: 10px;
        }
        .mint-checkbox-input:checked + .mint-checkbox-core {
          background-color: #4374df;
          border-color: #4374df;
        }
    }
    .submit_edit {
      margin-top: toRem(130px);
      padding: 0 toRem(30px);
    }
    .submit_edit button {
      background-color: #4374df;
      border-radius: toRem(50px);
      color: #fff;
    }
  }
</style>
