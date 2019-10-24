/**
* Created by admin on 2017/12/4.
*/
<template>
  <a class="mb_tab_item"
     @click="$parent.$emit('input', id)"
     :class="{ 'active': $parent.value === id }">
    <slot></slot>
  </a>
</template>
<script>
  export default {
    name: 'mb-tab-item',
    props: ['id']
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .mb_tab_item {
    flex: 1;
    text-align: center;
    @include ht-lineHt(56px);
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
    background-color: $color-text-reverse;
    color: $brand-primary;
    font-size: 14px;

    img {
      width: toRem(32px);
      height: toRem(32px);
    }

    &.active {
      border-bottom: toRem(4px) solid #d61300;
    }
  }

</style>
