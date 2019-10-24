/**
* 注册
*/
<template>
  <div class="register container_top">
    <!--头部-->
    <header-fix title="注册" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <mt-field class="account_field" label="用户名" v-model="infoSend.Account" placeholder="请输入用户名"></mt-field>
    <mt-field label="密码" v-model="infoSend.Password" placeholder="密码长度为6~16个字符"></mt-field>
    <mt-field label="确认密码" v-model="confirmPwd" placeholder="请再次确认密码"></mt-field>
    <mt-field label="姓名" v-model="infoSend.Name" placeholder="请输入姓名"></mt-field>
    <mt-cell title="选择部门" @click.native="openGroupList" is-link>
      <span>{{infoSend.groupName|| '请选择'}}</span>
    </mt-cell>
    <mt-field class="idcard_field" label="身份证号码" v-model="infoSend.IdCard" :attr="{maxlength:18}"
              placeholder="请输入18位有效身份证"></mt-field>
    <mt-cell class="not-required" title="选择职级" @click.native="openGradeList" is-link>
      <span>{{gradeName|| '请选择'}}</span>
    </mt-cell>
    <mt-field label="手机号码" v-model="infoSend.Mobile" placeholder="请输入手机号码"></mt-field>
    <div class="submit_edit">
      <mt-button type="primary" size="large" @click.native="verification">注册</mt-button>
    </div>
    <!--职级选择器-->
    <mt-popup
      v-model="isShowGradeList"
      popup-transition="popup-fade"
      position="bottom">
      <div slot class="grade_list">
        <mt-picker :slots="gradeSlots" show-toolbar value-key="Name" @change="onGradeChange">
          <div class="clearFix">
            <span class="btn pull-left" @click="closeGradeList">取消</span>
            <span class="btn pull-right" @click="confirmGradeList">确定</span>
          </div>
        </mt-picker>
      </div>
    </mt-popup>
    <!--选择地区-->
    <group-list-popup :is-show="isShowGroupList" :group-name="groupName"
                      @update:data="overWriteInfoSend"
                      @close="isShowGroupList=false"></group-list-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Button, Cell, Field, MessageBox, Picker, Popup, Toast } from 'mint-ui'
  import { GetGradeList, Register } from '../service/getData'
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
        groupName: '选择部门',
        infoSend: {
          Account: '',
          Password: '',
          Name: '',
          GroupId: '',
          IdCard: '',
          Grade: '',
          Mobile: '',
          SmgCode: ''
        },
        confirmPwd: '', // 确认密码,
        isShowGradeList: false, // 是否显示职级选择器
        isShowGroupList: false,
        gradeList: [], // 职级列表
        gradeName: '选择职级', // 职级名称
        gradeSelected: {}, // 被选中职级的数据
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
        isPassPwd: true // 密码验证
      }
    },
    mounted () {
      this.getGradeList()
    },
    methods: {
      // 注册
      async userRegister () {
        let data = await Register(this.infoSend)
        if (data.Type == 1) {
          Toast({ message: '注册成功', position: 'bottom' })
          this.$router.push('/login')
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }
      },
      // 通过部门列表组件重写数据
      overWriteInfoSend (data) {
        this.infoSend = { ...this.infoSend, ...data }
        this.groupName = data.groupName
      },
      openGroupList () {
        this.isShowGroupList = true
      },
      // 职级列表
      async getGradeList () {
        let data = await GetGradeList()
        if (data.Type == 1) {
          this.gradeList = data.Data.GroupInfoList
          this.gradeSlots[0].values = data.Data.GroupInfoList
        }
      },
      // 职级选择器
      onGradeChange (picker, values) {
        let selected = values[0]
        if (selected) {
          this.gradeSelected = selected
        }
      },
      closeGradeList () {
        this.isShowGradeList = false
      },
      openGradeList () {
        this.isShowGradeList = true
      },
      confirmGradeList () {
        this.isShowGradeList = false
        this.infoSend.Grade = this.gradeSelected.Id
        this.gradeName = this.gradeSelected.Name
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
          Toast(toastInfo('请选择地区'))
        } else if (this.isPassIdCard == false) {
          Toast(toastInfo('请输入有效身份证号码'))
        } else if (this.isPassMobile == false) {
          Toast(toastInfo('手机号格式不正确'))
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

    .submit_edit {
      margin-top: toRem(50px);
      padding: 0 toRem(30px);
    }

    .submit_edit button {
      background-image: linear-gradient(to right, #fb9f22, #dd1100);
      border-radius: toRem(50px);
      color: #fff;
    }
  }
</style>
