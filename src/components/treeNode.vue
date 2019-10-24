/**
* 树节点
*/
<template>
  <li class="tree_node">
    <div class="tree_title" :class="{
       tree_selected: dataList[Id] == selectedId,
       activeBg1 : floor == 1 && dataList[Id] == selectedId  && dataList,
       activeBg2 : floor == 2 && dataList[Id] == selectedId  && dataList,
       activeBg3 : floor == 3 && dataList[Id] == selectedId  && dataList,
       floor1 : floor == 1 && dataList,
       floor2 : floor == 2 && dataList,
       floor3 : floor == 3 && dataList,
    }">
      <div class="tree_floor">
        <span class="tree_name" @click="nodeClick(dataList)">{{dataList[name]}}</span>
      </div>
      <div class="tree_toggle_icon" v-if="hasNodes">
        <i v-if="open" @click="toggle()" class="webapp"><img src="../assets/square-minus.png" alt=""></i>
        <i v-if="!open" @click="toggle()" class="webapp "><img src="../assets/square-add.png" alt=""></i>
      </div>
    </div>
    <ul class="tree_container" v-show="open" v-if="hasNodes">
      <node v-for="(item,index) in dataList[nodes]"
            :data-list="item"
            :floor="floor + 1"
            @itemClick="selectedNode"
            :option="option || {}"
            :on-select="onSelect"
            :selected-id="selectedId"
            :key="index">
      </node>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'node',
    data () {
      return {
        open: false,
        name: this.option.name || 'name',
        nodes: this.option.nodes || 'nodes',
        Id: this.option.Id || 'Id'
      }
    },
    props: ['dataList', 'onSelect', 'selectedId', 'option', 'floor'],
    computed: {
      hasNodes: function () {
        if (!this.dataList) return false
        return this.dataList.ChildCount > 0 || (this.dataList.Nodes && this.dataList.Nodes.length)
      }
    },
    created () {
      // this.dataList[this.nodes] = this.getChildNode(this.dataList.UserGroupId)
      // console.log(this.dataList,this.selectedId,this.Id)
    },
    mounted () {
    },
    methods: {
      toggle () {
        this.open = !this.open
      },
      nodeClick (data) {
        this.$emit('itemClick', data)
      },
      selectedNode (data) {
        this.onSelect(data)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .tree_container {
    width: 100%;
    padding: 0 0;
  }

  .tree_node {
    font-size: 15px;
    border-bottom: 1px solid #e4ebf3;
  }

  .tree_title {
    @include ht-lineHt(88px);
    @extend %clearFix;
    position: relative;

    .tree_name {
      @extend %pull-left;
      width: 80%;
      @extend %ellipsis;
      text-indent: toRem(70px);
      line-height: toRem(88px);
    }

    .tree_toggle_icon {
      @extend %pull-right;
      padding-right: toRem(20px);

      .webapp {
        color: $color-text-thirdly;

        img {
          width: toRem(30px);
          height: toRem(30px);
        }
      }
    }

    .tran_line {
      display: inline-block;
      width: toRem(6px);
      height: toRem(28px);
      margin-right: toRem(20px);
      background-color: transparent;
    }

    .primary_line, .tran_line {
      margin-top: toRem(30px);
    }

    .selected_icon {
      display: none;
      position: absolute;
      right: toRem(80px);
      font-size: 24px;
    }

    // &.tree_selected {
    //   background-color:#fadcd9;
    //   color: #db1101;
    //   .selected_icon {
    //     display: block;
    //     color: $brand-primary;
    //   }
    // }
    &.activeBg1 {
      background-color: #db1101;
      color: #fff;
    }

    &.activeBg2 {
      background-color: #fadcd9;
      color: #db1101;
    }

    &.activeBg3 {
      background-color: #fff;
      color: #333;
    }
  }
</style>
