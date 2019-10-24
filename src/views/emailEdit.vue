/**
* 修改密码
*/
<template>
  <div class="change_email container_top">
    <!--头部-->
    <header-fix title="修改邮箱" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="change_mobile_list">
      <div class="change_mobile_item">
        <input class="old_email" v-model="sendData.OldEmail" type="text" placeholder="输入旧邮箱"/>
      </div>
      <div class="change_mobile_item newEmail">
        <input class="new_email" v-model="sendData.Email" type="text" placeholder="输入新邮箱"/>
        <span class="error" :class="!isPassEmail&&'active'">邮箱格式有误</span>
      </div>
      <div class="change_mobile_item">
        <input class="confirm_email" v-model="confirmEmail" type="text" placeholder="确认新邮箱"/>
      </div>
    </div>
    <div class="submit_edit">
      <mt-button type="primary" size="large" @click.native="updateEmail">提交</mt-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MessageBox, Toast, Button } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { SetUserEmail } from '../service/getData'

  Vue.component(Button.name, Button)
  export default {
    mixins: [goBack],
    data () {
      return {
        sendData: {
          OldEmail: '',
          Email: ''
        },
        confirmEmail: '',
        isPassConfirm: false,
        isPassEmail: true
      }
    },
    methods: {
      async updateEmail () {
        if (!this.sendData.OldEmail) {
          Toast({ message: '输入旧邮箱', position: 'bottom' })
        } else if (!this.sendData.Email) {
          Toast({ message: '请输入新邮箱', position: 'bottom' })
        } else if (!this.isPassEmail) {
          Toast({ message: '邮箱格式有误', position: 'bottom' })
        } else if (this.sendData.OldEmail == this.sendData.Email) {
          Toast({ message: '新旧邮箱不能一致', position: 'bottom' })
        } else if (!this.isPassConfirm) {
          Toast({ message: '两次输入新邮箱不一致', position: 'bottom' })
        } else {
          let data = await SetUserEmail(this.sendData)
          if (data.Type == 1) {
            MessageBox.alert('修改成功').then(() => {
              this.goBack()
            })
          } else if (data.Type != 401) {
            MessageBox('警告', data.Message)
          }
        }
      }
    },
    watch: {
      confirmEmail: function (val) {
        if (val == this.sendData.Email) {
          this.isPassConfirm = true
        } else {
          this.isPassConfirm = false
        }
      },
      'sendData.Email': {
        handler (newValue, oldValue) {
          let trimEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!trimEmail.test(newValue)) {
            this.isPassEmail = false
          } else {
            this.isPassEmail = true
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .change_email {
    background-color: $fill-body;

    .change_mobile_item {
      background-color: $fill-base;
      margin-top: toRem(20px);

      input {
        display: inline-block;
        width: 100%;
        padding: toRem(30px);
        line-height: 1.2em;
      }
    }

    .submit_edit {
      margin-top: toRem(50px);
      padding: 0 toRem(30px);
    }

    .newEmail {
      position: relative;

      .error {
        position: absolute;
        right: toRem(-150px);
        top: toRem(28px);
        color: $brand-error;
        transition: all 0.5s;

        &.active {
          right: toRem(50px);
        }
      }
    }
  }
</style>
