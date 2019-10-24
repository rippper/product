<template>
  <div class="swipe_item_component"
       v-clickoutside:touchstart="swipeMove"
       @click="swipeMove()"
       @touchstart="startDrag"
       @touchmove="onDrag"
       @touchend="endDrag"
       ref="cell">
    <div class="swipe_item_left_block" ref="left" @click.prevent.stop="swipeMove()">
      <slot name="left"></slot>
    </div>
    <div class="swipe_item_center_block" ref="center">
      <slot name="center"></slot>
    </div>
    <div class="swipe_item_right_block" ref="right" @click.prevent.stop="swipeMove()">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  import { once, Clickoutside } from '../plugins/utils'

  export default {
    directives: { Clickoutside },
    data () {
      return {
        start: { x: 0, y: 0 }
      }
    },
    props: {
      direction: {
        type: String,
        default: 'left'
      }
    },
    mounted () {
      this.wrap = this.$refs.cell
      this.leftElm = this.$refs.left
      this.centerElm = this.$refs.center
      this.rightElm = this.$refs.right
      this.leftWidth = this.leftElm.getBoundingClientRect().width
      this.centerWidth = this.centerElm.getBoundingClientRect().width
      this.rightWidth = this.rightElm.getBoundingClientRect().width
    },
    methods: {
      resetSwipeStatus () {
        this.swiping = false
        this.opened = true
        this.offsetLeft = 0
      },

      translate3d (offset) {
        return `translate3d(${offset}px, 0, 0)`
      },

      setAnimations (val) {
        this.wrap.style.transitionDuration = val
        this.rightElm.style.transitionDuration = val
        this.leftElm.style.transitionDuration = val
        this.centerElm.style.transitionDuration = val
      },

      swipeMove (offset = 0) {
        this.leftElm.style.webkitTransform = this.translate3d(offset - this.leftWidth)
        this.centerElm.style.webkitTransform = this.translate3d(offset)
        this.rightElm.style.webkitTransform = this.translate3d(offset + this.rightWidth)
        offset && (this.swiping = true)
        if (offset === 0) {
          this.setAnimations('300ms')
          setTimeout(() => {
            this.setAnimations('')
          }, 300)
        }
      },

      swipeLeaveTransition (direction) {
        setTimeout(() => {
          this.swipeLeave = true

          // left
          if (direction > 0 && this.direction === 'left' && -this.offsetLeft > this.rightWidth * 0.4) {
            this.swipeMove(-this.rightWidth)
            this.resetSwipeStatus()
            return
            // right
          } else if (direction < 0 && this.direction === 'right' && this.offsetLeft > this.leftWidth * 0.4) {
            this.swipeMove(this.leftWidth)
            this.resetSwipeStatus()
            return
          }

          this.swipeMove(0)
          once(this.wrap, 'webkitTransitionEnd', _ => {
            this.wrap.style.webkitTransform = ''
            this.swipeLeave = false
            this.swiping = false
          })
        }, 0)
      },

      startDrag (evt) {
        evt = evt.changedTouches ? evt.changedTouches[0] : evt
        this.dragging = true
        this.start.x = evt.pageX
        this.start.y = evt.pageY
      },

      onDrag (evt) {
        if (this.opened) {
          if (!this.swiping) {
            this.swipeMove(0)
            this.setAnimations('')
          }
          this.opened = false
          return
        }
        if (!this.dragging) return

        let swiping
        const e = evt.changedTouches ? evt.changedTouches[0] : evt
        const offsetTop = e.pageY - this.start.y
        const offsetLeft = this.offsetLeft = e.pageX - this.start.x

        const y = Math.abs(offsetTop)
        const x = Math.abs(offsetLeft)

        this.setAnimations('0ms')

        evt.preventDefault()
        evt.stopPropagation()

        swiping = !(x < 5 || (x >= 5 && y >= x * 1.73))
        if (!swiping) return

        if ((offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
          (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
          (offsetLeft > 0 && !this.leftWidth) ||
          (offsetLeft < 0 && !this.rightWidth)) {
        } else {
          this.swipeMove(offsetLeft)
        }
      },

      endDrag () {
        this.setAnimations('')
        if (!this.swiping) return
        this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .swipe_item_component {
    position: relative;
    max-width: 100vw;
    overflow-x: hidden;

    .swipe_item_center_block {
      width: 10rem;
      transition: transform 150ms ease-in-out;
    }

    .swipe_item_left_block {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transform: translateX(-100%);
      @include flex(flex-start);
      transition: transform 150ms ease-in-out;
    }

    .swipe_item_right_block {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      transform: translateX(100%);
      @include flex(flex-start);
      transition: transform 150ms ease-in-out;
    }
  }
</style>
