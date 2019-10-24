/**
* 标签页 tab
*/
<template>
  <div class="mb_tab">
    <slot></slot>
    <span class="mb_tab_line"></span>
  </div>
</template>
<script>
  export default {
    name: 'mb-tab',
    props: {
      fixed: Boolean,
      value: {}
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .mb_tab {
    @include ht-lineHt(56px);
    background: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    @include flex(center);
    align-items: center;
    position: relative;
    .mb_tab_line{
      position: absolute;
      width: toRem(2px);
      height: toRem(34px);
      top: toRem(20px);
      right: 0;
      color: red;
    }
    :last-child {
      border-right: none;
    }
  }

</style>
