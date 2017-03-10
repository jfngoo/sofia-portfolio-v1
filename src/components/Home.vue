<template>
  <div id="home">
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },

    mounted() {
      this.setScroll();
    },

    methods: {
      setScroll() {
        document.querySelector('body').style.overflow = "auto";
        document.querySelector('html').style.overflow = "auto";
      }
    }
  }
</script>

<style scoped lang="scss">

  #home {
    min-height: 100vh;
  }

</style>
