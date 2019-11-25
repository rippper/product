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
      if (!this.src) {
        this.imageSrc = this.imgErrorSrc || baseErrorSrc
      } else {
        this.imageSrc = this.src
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
