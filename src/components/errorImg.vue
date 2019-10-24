<template>
  <img class="errorImg" :src="imageSrc" ref="img"/>
</template>
<script>
  import baseErrorSrc from '../assets/notFound.jpg'

  export default {
    data () {
      return {
        imageSrc: '',
        imgErrorSrc: this.errorSrc
      }
    },
    created () {
      const assetsOrigin = 'http://115.238.238.242:8099'
      if (!this.src) {
        this.imageSrc = this.imgErrorSrc || baseErrorSrc
      } else {
        let flag = /^http/.test(this.src)
        if (!flag) {
          this.imageSrc = assetsOrigin + this.src
        } else {
          this.imageSrc = this.src
        }
      }
    },
    mounted () {
      this.$refs.img.onerror = () => {
        this.imageSrc = this.imgErrorSrc || baseErrorSrc
      }
    },
    props: ['src', 'errorSrc'],
    watch: {
      src (val) {
        this.imageSrc = val || this.imgErrorSrc || baseErrorSrc
      }
    }
  }
</script>
