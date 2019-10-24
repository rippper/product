/**
* 修改个人信息
*/
<template>
  <div class="user_info_edit container_top">
    <!--头部-->
    <header-fix title="修改个人信息" fixed>
      <i class="webapp webapp-left" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="setting_1">
      <div class="setting_item">
        <span class="label">姓名</span>
        <div class="right"><span class="user">{{userInfo.Username}}</span></div>
      </div>
      <!--<div class="setting_item">
        <span class="label">部门</span>
        <div class="right"><span class="department">{{userInfo.GroupName}}</span></div>
      </div>-->
      <div class="setting_item">
        <span class="label">身份证号</span>
        <div class="right"><input v-model="infoSend.IdCard" type="text" maxlength="18"/></div>
      </div>
    </div>
    <div class="setting_2">
      <div class="setting_item">
        <span class="label">电子邮箱</span>
        <div class="right">
          <input v-model="infoSend.Email" type="text"/>
        </div>
      </div>
    </div>
    <mt-cell title="选择部门" @click.native="openGroupList">
      <span>{{infoSend.GroupName|| '请选择'}}</span><i class="webapp webapp-right"></i>
    </mt-cell>
    <div class="setting_3">
      <div class="setting_item">
        <span class="label">性别</span>
        <div class="right">
          <mt-radio v-model="infoSend.Sex" :options="sexList"></mt-radio>
        </div>
      </div>
      <!--<div class="setting_item">
        <span class="label">民族</span>
        <div class="right"><input v-model="infoSend.Nation" type="text"/></div>
      </div>-->
      <!--<div class="setting_item">
        <span class="label">学历</span>
        <div class="right"><p @click="openDegreeList">{{userInfo.DegreeName}} &nbsp;></p></div>
      </div>-->
      <!--<div class="setting_item">
        <span class="label">政治面貌</span>
        <div class="right"><input v-model="infoSend.Party" type="text"/></div>
      </div>-->
      <div class="setting_item" @click="openBirthday">
        <span class="label">出生日期</span>
        <div class="right">
          <p>
            {{userInfo.Birthday| dateFilter('yyyy-MM-dd')}}
            <span class="arrowRight"><i class="webapp webapp-right"></i></span>
          </p>
        </div>
      </div>
      <div class="setting_item">
        <span class="label">办公室电话</span>
        <div class="right"><input v-model="infoSend.Tel" type="text"/></div>
      </div>
    </div>
    <div class="submit_edit">
      <mt-button type="primary" size="large" @click.native="updateUserInfo">保存</mt-button>
    </div>
    <!--日期选择器-->
    <mt-datetime-picker
      v-model="birthday"
      type="date"
      ref="birthdayPicker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="new Date(1900,0,1)"
      :endDate="new Date()"
      @confirm="selectedBirthday">
    </mt-datetime-picker>
    <!--选择地区-->
    <group-list-popup :is-show="isShowGroupList" :group-name="groupName"
                      @update:data="overWriteInfoSend"
                      @close="isShowGroupList=false"></group-list-popup>
  </div>
</template>
<script>
  import { Button, Cell, DatetimePicker, MessageBox, Picker, Popup, Radio, Toast } from 'mint-ui'
  import Vue from 'vue'
  import { headerFix } from '../components'
  import { formatDate } from '../plugins/utils'
  import { GetDegreeList, GetGradeList, GetUserInfo, UpdateUserInfo } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.component(Cell.name, Cell)
  Vue.component(Radio.name, Radio)
  Vue.component(Button.name, Button)
  Vue.component(Popup.name, Popup)
  Vue.component(Picker.name, Picker)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    mixins: [goBack],
    data () {
      return {
        groupIdStack: [], // 记录部门的Id的栈
        groupListStack: {}, // 存储已获取的部门列表
        groupList: [], // 部门列表
        groupName: '选择部门',
        parentId: '1',
        userInfo: {}, // 用户信息
        infoSend: {
          Account: '', // 帐号
          Name: '', // 姓名
          DepartmentName: '', // 部门名称
          GroupId: '', // 单位 编号
          GroupName: '', // 单位名称
          IdCard: '', // 身份证
          Email: '', // 邮箱
          Grade: '', // 职级
          Business: '', // 职务
          Sex: '', // 性别
          Nation: '', // 民族
          Degree: '', // 学历
          Party: '', // 政治面貌
          Birthday: '', // 出生日期
          Tel: '', // 办公室电话
          Mobile: '', // 手机号码
          SmgCode: '' // 验证码
        }, // 提交数据
        gradeSelected: {}, // 被选中职级的数据
        gradeList: [], // 职级列表
        isShowGradeList: false, // 是否显示职级选择器
        isShowGroupList: false,
        gradeSlots: [ // 职级数据
          {
            flex: 1,
            values: [],
            defaultIndex: 1,
            className: 'gradeList',
            textAlign: 'center'
          }
        ],
        sexList: ['男', '女'], // 性别
        degreeSelected: {}, // 被选中学历的数据
        degreeList: [], // 学历列表
        isShowDegreeList: false, // 是否显示学历选择器
        degreeSlots: [ // 职级数据
          {
            flex: 1,
            values: [],
            defaultIndex: 1,
            className: 'degreeList',
            textAlign: 'center'
          }
        ],
        birthday: '', // 出生日期
        isPassIdCard: false, // 身份证号码验证
        isPassEmail: false, // 邮箱验证
        isPassPhone: false
      }
    },
    created () {
      this.getUserInformation()
    },
    mounted () {
    },
    props: [],
    components: {
      headerFix
    },
    computed: {},
    updated () {

    },
    methods: {
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
        this.userInfo.GradeName = this.gradeSelected.Name
      },
      // 学历选择器
      onDegreeChange (picker, values) {
        let selected = values[0]
        if (selected) {
          this.degreeSelected = selected
        }
      },
      closeDegreeList () {
        this.isShowDegreeList = false
      },
      openDegreeList () {
        this.isShowDegreeList = true
      },
      confirmDegreeList () {
        this.isShowDegreeList = false
        this.infoSend.Degree = this.degreeSelected.Id
        this.userInfo.DegreeName = this.degreeSelected.Name
      },
      // 生日选择
      selectedBirthday (time) {
        console.log(time)
        let formate = formatDate(time, 'yyyy-MM-dd')
        this.infoSend.Birthday = formate
        this.userInfo = { ...this.userInfo, Birthday: formate }
        console.log(this.userInfo.Birthday, 22, this.birthday)
      },
      // 打开生日选择器
      openBirthday () {
        this.$refs.birthdayPicker.open()
      },
      // 关闭生日选择器
      closeBirthday () {
        this.$refs.birthdayPicker.close()
      },
      // 通过部门列表组件重写数据
      overWriteInfoSend (data) {
        this.infoSend = { ...this.infoSend, ...data }
        this.groupName = data.groupName
      },
      openGroupList () {
        this.isShowGroupList = true
      },
      async getUserInformation () {
        let data = await GetUserInfo()
        if (data.Type == 1) {
          this.userInfo = data.Data
          this.birthday = new Date(data.Data.Birthday)
          this.groupName = data.Data.GroupName
          this.infoSend = {
            Account: data.Data.UserAccount,
            Name: data.Data.Username,
            DepartmentName: data.Data.DepartmentName,
            GroupId: data.Data.GroupId,
            GroupName: data.Data.GroupName,
            IdCard: data.Data.IdCard,
            Email: data.Data.Email,
            Grade: data.Data.Grade,
            Business: data.Data.UserZW,
            Sex: data.Data.Sex,
            Nation: data.Data.Nation,
            Degree: data.Data.Degree,
            Party: data.Data.Party,
            Birthday: data.Data.Birthday,
            Tel: data.Data.Tel,
            //            Mobile: data.Data.Mobile,
            SmgCode: ''
          }
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }
      },
      async getGradeList () {
        let data = await GetGradeList()
        if (data.Type == 1) {
          this.gradeList = data.Data.GroupInfoList
          this.gradeSlots[0].values = data.Data.GroupInfoList
        }
      },
      async getDegreeList () {
        let data = await GetDegreeList()
        if (data.Type == 1) {
          this.degreeList = data.Data.GroupInfoList
          this.degreeSlots[0].values = data.Data.GroupInfoList
        }
      },
      // 保存修改
      async updateUserInfo () {
        if (this.isPassIdCard && this.isPassEmail && this.isPassPhone) {
          let data = await UpdateUserInfo(this.infoSend)
          if (data.Type == 1) {
            Toast({ message: '修改成功', position: 'bottom' })
            this.$router.push('setting')
          } else if (data.Type != 401) {
            MessageBox('警告', data.Message)
          }
        } else if (!this.isPassIdCard) {
          Toast({ message: '请输入18位有效身份证号', position: 'bottom' })
        } else if (!this.isPassEmail) {
          Toast({ message: '邮箱格式错误', position: 'bottom' })
        } else if (!this.isPassPhone) {
          Toast({ message: '电话格式错误', position: 'bottom' })
        }
      }
    },
    watch: {
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
      'infoSend.Email': {
        handler: function (val, oldVal) {
          console.log(val)
          let regEmail = /^([\w.-]+)@(\w+)(.([\w^_]+)){1,2}$/
          if (val) {
            this.isPassEmail = regEmail.test(val)
          } else {
            this.isPassEmail = true
          }
        }
      },
      'infoSend.Tel': {
        handler: function (val, oldVal) {
          console.log(val)
          let regTel = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (val) {
            this.isPassPhone = regTel.test(val)
          } else {
            this.isPassPhone = true
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .user_info_edit {
    background-color: $fill-body;

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

    .webapp-right {
      margin-left: toRem(15px);
      color: #666;
      font-size: 20px;
    }

    .setting_item {
      @extend %clearFix;
      margin: 0 toRem(30px);
      height: toRem(82px);
      line-height: toRem(82px);
      border-bottom: 1px solid $border-color-base;
      font-size: 14px;

      &:last-child {
        border-bottom: transparent;
      }
    }

    .label {
      @extend %pull-left;
      text-align: left;
    }

    .right {
      @extend %pull-right;
      text-align: right;

      input {
        text-align: right;
        line-height: 1.2em;
        padding: toRem(10px) toRem(20px);
      }

      .webapp-right {
        color: $color-text-thirdly;
      }
    }

    .user {
      display: inline-block;
      background-color: #efefef;
      border: 1px dotted #b8b8b8;
      height: toRem(55px);
      padding: 0 toRem(20px);
      line-height: toRem(55px);
      @include borderRadius(6px);
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

    .setting_1 {
      background-color: $fill-base;
    }

    .setting_2 {
      background-color: $fill-base;
      margin: toRem(20px) 0;
    }

    .setting_3 {
      background-color: $fill-base;
    }

    .mint-radiolist {
      width: toRem(600px);

      .mint-radiolist-title {
        margin: 0;
      }

      .mint-cell {
        @include ht-lineHt(80px);
        min-height: toRem(30px);
        width: 40%;
        float: left;
        border-bottom: none;
      }

      .mint-cell-wrapper {
        display: inline-block;
        @include ht-lineHt(80px);
        border-bottom: none;
      }

      .mint-radiolist-label {
        display: inline-block;
      }
    }

    .mint-datetime-action {
      color: $color-text-reverse;
    }

    .submit_edit {
      padding: toRem(50px) toRem(30px) 0;
    }
  }
</style>
