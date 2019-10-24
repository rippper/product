/**
* 滑动导航
*/
<template>
  <div class="nav_slide">
    <div class="nav_top" :class="{'show':showLayer}">
      <slot name="top"></slot>
    </div>
    <!-- <div class="nav_down" :class="{'show':showLayer}">
      <slot name="down"></slot>
    </div> -->
    <transition name="fade">
      <div class="layer" @click="closeLayer" v-if="showLayer"></div>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showLayer: this.show
      }
    },
    props: {
      show: Boolean
    },
    methods: {
      closeLayer () {
        this.showLayer = false
        this.$emit('toggleNavDown', false)
      }
    },
    watch: {
      show (val) {
        this.showLayer = val
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .nav_slide {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .nav_top {
      background-color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      overflow-y: auto;
    }

    .nav_down {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow-y: scroll;

    }

    .layer {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.6);
      z-index: 100;
      height: 100%;
      transition: all 0.5s;
    }
  }
</style>
