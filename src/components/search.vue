/**
* 搜索
*/
<template>
  <div class="search_com">
    <div class="search_bar">
      <input type="text" class="webapp" v-model="currentValue" @keyup.13="search" :placeholder="placeholder"/>
      <mt-button size="small" type="primary" @click.native="search">
        搜索
      </mt-button>
    </div>
    <!-- <slot name="history"></slot> -->
    <div class="search-list">
      <slot></slot>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui'

  Vue.component(Button.name, Button)
  export default {
    data () {
      return {
        currentValue: this.value
      }
    },
    props: {
      value: String,
      placeholder: {
        default: '\ue6ac 输入关键词搜索'
      },
      search: Function
    },
    watch: {
      currentValue (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .search_com {
    margin: toRem(20px) auto;

    .search_bar {
      padding: toRem(20px);
      background: #fff;
      @extend %clearFix;

      input {
        @extend %pull-left;
        width: 78%;
        padding: toRem(15px) toRem(30px) toRem(15px) toRem(20px);
        background: $fill-body;
        font-size: 14px;
        color: #333;
        @include borderRadius(10px);
      }

      .mint-button--primary {
        @extend %pull-left;
        margin-left: toRem(20px);
        padding: 0;
        width: 16%;
        height: toRem(60px);
        background-color: #f11f0e;
      }
    }

    .search-list {
      margin-top: toRem(20px);
    }
  }
</style>
