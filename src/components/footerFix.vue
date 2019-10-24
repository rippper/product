<template>
  <div class="footerFix">
    <mt-tabbar :value="selected" fixed>
      <mt-tab-item id="home" href="#/home">
        <img class="footer_icon_1" v-if="selected == 'home'" slot="icon" src="../assets/hq-home-actived.png">
        <img class="footer_icon_1" v-else slot="icon" src="../assets/hq-home-normal.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="courseCenter" href="#/courseCenter">
        <img class="footer_icon_2" v-if="selected == 'courseCenter'" slot="icon" src="../assets/hq-course-actived.png">
        <img class="footer_icon_2" v-else slot="icon" src="../assets/hq-course-normal.png">
        视频
      </mt-tab-item>
      <mt-tab-item id="orangize" href="#/organise">
        <img class="footer_icon_2" v-if="selected == 'orangize'" slot="icon" src="../assets/hq-org-actived.png">
        <img class="footer_icon_2" v-else slot="icon" src="../assets/hq-org-normal.png">
       学习圈
      </mt-tab-item>
      <mt-tab-item id="personalCenter" href="#/personalCenter">
        <img class="footer_icon_4" v-if="selected == 'personalCenter'" slot="icon" src="../assets/hq-my-actived.png">
        <img class="footer_icon_4" v-else slot="icon" src="../assets/hq-my-normal.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import { Tabbar, TabItem } from 'mint-ui'
  import Vue from 'vue'

  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)
  export default {
    name: 'footerFix',
    props: ['selected']
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .footerFix {
    .mint-tabbar {
      height: toRem(105px);
    }

    .mint-tab-item-icon {
      .webapp {
        font-size: 24px;
      }
    }
    .mint-tabbar > .mint-tab-item.is-selected {
      background-color: #fff;
      background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
      background-size: 100% 1px;
      background-repeat: no-repeat;
      color: #4374df;
    }

    .mint-tab-item {
      padding: toRem(14px) 0;
    }

    .mint-tab-item-icon {
      width: toRem(48px);
      height: toRem(48px);
      margin: 0 auto 0;

      & > {
        .footer_icon_1 {
          width: toRem(40px);
          height: toRem(44px);
          margin: 0 auto;
        }

        .footer_icon_2 {
          width: toRem(40px);
          height: toRem(44px);
          margin: 0 auto;
        }

        .footer_icon_3 {
          width: toRem(44px);
          height: toRem(44px);
          margin: 0 auto;
        }

        .footer_icon_4 {
          width: toRem(44px);
          height: toRem(44px);
          margin: 0 auto;
        }
      }
    }

    .mint-tab-item-label {
      font-size: 12px;
      line-height: 1.5;
    }
  }
</style>
