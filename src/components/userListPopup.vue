<template>
  <transition name="slide-left">
    <section class="user_list_popup container_top" v-if="isShow">
      <header-fix :title="title" fixed>
        <i slot="left" class="webapp webapp-left" @click="back"></i>
      </header-fix>
      <div class="boundary"></div>
      <section v-infinite-scroll="getUserList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
        <div class="user_list">
          <mt-cell v-for="item in userList" :key="item.UserId">
            <label slot="title">
              <img class="user_head_img" src="../assets/hq-head-portrait@2x.png" alt="">
              {{item.UserName}}
            </label>
          </mt-cell>
        </div>
        <div v-if="noUser" class="no-meet-data">暂时没有数据</div>
        <div v-if="noMoreUser" class="no-data">没有更多数据啦</div>
      </section>
    </section>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { UserList } from '../service/getData'

  Vue.use(InfiniteScroll)
  export default {
    data () {
      return {
        title: '人员筛选',
        userList: [],
        selectedUserList: {},
        immediate: false,
        loading: false,
        page: 1,
        noMoreUser: false,
        noUser: false
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      isMultiSelect: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.getUserList()
    },
    methods: {
      back () {
        this.page = 1
        this.noMoreUser = false
        this.noUser = false
        this.$emit('update:data', this.selectedUserList)
        this.$emit('close')
      },
      async getUserList () {
        if (this.page > 1 && this.noMoreUser) {
          return
        }
        Indicator.open()
        let res = await UserList({ Page: this.page, Rows: 15 })
        Indicator.close()
        if (res.IsSuccess) {
          let list = res.Data.rows
          if (this.page > 0 && list.length == 0) {
            this.noMoreUser = true
            return
          }
          if (this.page == 0 && list.length == 0) {
            this.noMoreUser = true
            return
          }
          this.userList = this.userList.concat(list)
          this.page++
        }
      },
      getUser (e, item) {
        this.selectedUserList[item.UserId] = item
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .user_select_component {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow-y: scroll;

    .mint-checkbox-core {
      @include square(32px);
      border-radius: toRem(5px);

      &::after {
        top: 0;
        left: 4px;
        width: 6px;
        height: 12px;
      }
    }

    .mint-cell-title {
      label {
        width: 100%;
      }
    }

    .user_list {
      .mint-cell {
        @include ht-lineHt(130px);

        .mint-cell-wrapper {
          line-height: toRem(130px);
        }
      }

      .mint-checkbox {
        margin-right: toRem(130px);
      }

      .user_name {
        background: url("../assets/hq-head-portrait@2x.png") no-repeat toRem(50px) center;
        background-size: toRem(100px) toRem(100px);
      }

      .user_head_img {
        @include square(100px);
        margin-right: toRem(20px);
      }
    }
  }
</style>
