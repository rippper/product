<template>
  <transition :name="transitionName">
    <div class="cell_container container_top" v-if="isShow">
      <header-fix :title="title" fixed>
        <a @click="backGroupList" slot="left"><i class="webapp webapp-left"></i></a>
      </header-fix>
      <div class="cell" v-for="(item) in groupList" :key="item.Id"
           @click="getChildrenGroup(item)">
        <span>{{item.Name}}</span>
        <i class="webapp webapp-right"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import { GetAllGroupList } from '../service/getData'

  export default {
    data () {
      return {
        groupIdStack: [], // 记录部门的Id的栈
        groupListStack: {}, // 存储已获取的部门列表
        groupList: [], // 部门列表
        parentId: '0',
        title: this.groupName || '选择所在区镇', // 所在部门
        transitionName: 'slide-left'
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      groupName: {
        type: String
      }
    },
    methods: {
      async getGroupList () {
        let data = await GetAllGroupList({ ParentId: this.parentId })
        let list = data.GroupInfoList
        if (list && list.length > 0) {
          this.groupList = list
          this.groupListStack[this.parentId] = list
        } else if (list && list.length == 0) {
          this.groupIdStack = []
          this.groupList = []
          this.$emit('close')
        }
      },
      backGroupList () {
        this.groupIdStack.pop() // 移除堆栈末尾
        this.$nextTick(() => {
          let len = this.groupIdStack.length
          if (len === 0) {
            this.groupList = []
            this.$emit('close')
          } else {
            let Id = this.groupIdStack[len - 1]
            this.groupList = this.groupListStack[Id]
          }
        })
      },
      getChildrenGroup (item) {
        let ParentId = item.Id
        let title = item.Name
        this.title = title
        this.parentId = ParentId
        if (ParentId != 0) { // 如果为0，表示没有选择，不更新groupId
          this.$emit('update:data', { groupName: title, GroupId: ParentId })
        }
        this.groupIdStack.push(ParentId) // 将parentId推入栈
        if (this.groupListStack[ParentId]) {
          this.groupList = this.groupListStack[ParentId]
        } else {
          if (ParentId == 0 || item.Chirldren.length > 0) {
            this.getGroupList()
            return
          }
          if (item.Chirldren.length == 0) {
            this.groupIdStack = []
            this.groupList = []
            this.$emit('close')
          }
        }
      }
    },
    watch: {
      isShow (newVal) {
        if (newVal) {
          this.getChildrenGroup({ Id: '0', Name: '选择所在区镇' })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .cell_container {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow-y: scroll;

    .cell {
      @include ht-lineHt(90px);
      margin: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      color: $color-text-secondary;
      font-size: 14px;
      @extend %clearFix;
      position: relative;

      span {
        @extend %pull-left;
        color: $color-text-secondary;
        width: 100%;
      }

      .webapp-right {
        color: #666;
        font-size: 20px;
        position: absolute;
        right: 0;
      }
    }
  }
</style>
