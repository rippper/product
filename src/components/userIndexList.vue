<template>
  <div class="user_index_list_component container_top">
    <header-fix :title="title" fixed>
      <i slot="left" class="webapp webapp-left" @click="close"></i>
    </header-fix>
    <div class="search_container">
      <input type="text" v-model="search" @keyup.enter="searchUser" placeholder="搜索">
      <i class="webapp webapp-search"></i>
    </div>
    <section class="user_index_list_container">
      <mt-index-list :height="indexListHeight">
        <mt-index-section v-for="index in indexList" :key="index" :index="index">
          <mt-cell v-for="item in listObj[index]" :key="item.UserId">
            <label class="user_label" slot="title" :for="'user_'+item.UserId">
              <span class="mint-checkbox">
                <input :id="'user_'+item.UserId" type="checkbox" @change="chooseUser($event, item)"
                       :checked="selectedUser[item.UserId]" class="mint-checkbox-input">
                <span class="mint-checkbox-core"></span>
              </span>
              {{item.UserName}}
            </label>
          </mt-cell>
        </mt-index-section>
      </mt-index-list>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { IndexList, IndexSection } from 'mint-ui'
  import { UserList } from '../service/getData'
  import { getPYFirst } from '../plugins/utils'

  Vue.component(IndexList.name, IndexList)
  Vue.component(IndexSection.name, IndexSection)
  export default {
    props: {
      title: {
        type: String,
        default: '通知人员'
      },
      user: {
        type: Object
      }
    },
    data () {
      return {
        search: '',
        userList: [],
        page: 1,
        indexList: [],
        listObj: [],
        indexListHeight: 600,
        selectedUser: {}
      }
    },
    created () {
      this.getUserList()
    },
    mounted () {
      let winHeight = window.innerHeight
      let headerHeight = document.querySelector('.header').getBoundingClientRect().height
      let topHeight = (headerHeight / 92) * 207
      this.indexListHeight = winHeight - topHeight
    },
    methods: {
      close () {
        this.$emit('update:data', this.selectedUser)
        this.$emit('update:user', this.selectedUser)
        this.$emit('close')
      },
      searchUser () {
        this.page = 1
        this.userList = []
        this.listObj = {}
        this.indexList = []
        this.getUserList()
      },
      async getUserList () {
        let res = await UserList({ Page: this.page, Rows: 200, Name: this.search })
        if (res.IsSuccess) {
          let userList = res.Data.rows
          let obj = {}
          if (userList.length == 0) {
            let list = this.userList
            for (let i = 0; i < list.length; i++) {
              let item = list[i]
              let str = item.UserName.charAt(0)
              if (!/[a-z]/.test(str)) {
                str = getPYFirst(str)
              }
              this.appendData(str, item, this.listObj)
              this.appendData(str, item.UserName, obj)
            }
            this.indexList = Object.keys(this.listObj).sort((a, b) => a.localeCompare(b))
            return
          }
          this.userList = this.userList.concat(userList)
          this.page++
          this.getUserList()
        }
      },
      appendData (str, item, obj) {
        if (/[a-z]/.test(str)) {
          if (!Array.isArray(obj[str.toUpperCase()])) {
            obj[str.toUpperCase()] = []
          }
          obj[str.toUpperCase()].push(item)
        } else {
          if (!Array.isArray(obj['#'])) {
            obj['#'] = []
          }
          obj['#'].push(item)
        }
      },
      chooseUser (e, item) {
        if (e.target.checked) {
          this.selectedUser[item.UserId] = item
        } else {
          delete this.selectedUser[item.UserId]
        }
        this.$emit('update:user', this.selectedUser)
      }
    },
    watch: {
      user: {
        handler: function (val) {
          if (val) {
            this.selectedUser = val
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .user_index_list_component {
    &.container_top {
      padding-top: toRem(207px);
    }

    .header {
      border-bottom: 1px solid $border-color-base;
    }

    .search_container {
      position: fixed;
      top: toRem(92px);
      width: 100%;
      background-color: $fill-body;
      padding: 0 toRem(30px);
      height: toRem(115px);
      @include flex(space-between);
      align-items: center;

      input {
        border-radius: toRem(10px);
        width: toRem(690px);
        height: toRem(70px);
        padding: 0 toRem(30px) 0 toRem(60px);
      }

      .webapp-search {
        position: absolute;
        top: 50%;
        left: toRem(50px);
        transform: translateY(-50%);
      }
    }

    .user_label {
      width: 100%;

      .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: transparent;
        background-image: url("../assets/hq-radio-actived@2x.png");
        background-size: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        border: none;
        animation: activeRadio 0.2s linear;

        @keyframes activeRadio {
          0% {
            background-size: 0%;
          }
          100% {
            background-size: 100%;
          }
        }

        &::after {
          transform: scale(0);
        }
      }
    }
  }

</style>
