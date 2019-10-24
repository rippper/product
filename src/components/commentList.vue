<template>
  <ul class="comment_list_component">
    <transition-group name="fade">
      <li class="comment_item" v-for="item in commentList" :key="item.Id">
        <error-img class="user_avatar" :src="item.PhotoUrl" :error-src="Avatar"></error-img>
        <div class="comment_info">
          <div class="comment_user_info">
            <span class="user_name">{{item.UserName}}</span>
            <span class="create_date">{{item.UpdateDate|dateFilter('yyyy-MM-dd')}}</span>
          </div>
          <div class="comment_content">
            {{item.Content}}
          </div>
        </div>
        <div v-if="!isReply" class="reply_count" @click="toggleClickEvent(item)">
          <img class="reply_img" src="../assets/Photowall-detail-evaluate-gray@2x.png" alt="">
          <div>{{item.ReplyCount}}条</div>
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
  import Avatar from '../assets/hq-head-portrait@2x.png'

  export default {
    props: {
      isReply: {
        type: Boolean,
        default: false
      },
      commentList: {
        type: Array
      }
    },
    data () {
      return {
        Avatar: Avatar
      }
    },
    methods: {
      toggleClickEvent (item) {
        this.$emit('clickReply', item)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .comment_list_component {
    background-color: #fff;

    .comment_item {
      padding-top: toRem(30px);
      @include flex(flex-start);

      .user_avatar {
        margin-right: toRem(20px);
        @include square(80px);
        border-radius: 50%;
      }

      .comment_info {
        flex: toRem(525px);
        max-width: toRem(525px);
        padding: toRem(10px) 0 toRem(30px) 0;
        font-size: 14px;
        border-bottom: 1px solid $border-color-base;

        .user_name {
          font-weight: bold;
          margin-right: toRem(20px);
        }

        .create_date {
          color: $color-text-thirdly;
        }

        .comment_content {
          margin-top: toRem(15px);
          word-break: break-all;
        }
      }

      .reply_count {
        margin-top: toRem(10px);
        flex: toRem(70px);
        color: $color-text-thirdly;
        border-bottom: 1px solid $border-color-base;

        .reply_img {
          width: toRem(30px);
          height: toRem(28px);
        }
      }
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }

    .slide-fade-leave-active {
      transition: all .3s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to {
      transform: scaleY(0);
      opacity: 0;
    }
  }
</style>
