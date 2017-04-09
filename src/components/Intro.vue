<template>
  <div id="intro">
    <div class="center">
      <h1>sofia boggio</h1>
      <img src="../assets/svg/logo-sofia.svg">
    </div>
    <div id="scrollto">
      <router-link to="home">scroll to discover</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'intro',

    mounted() {
      this.blockScroll();
    },

    beforeDestroy() {
      this.unblockScroll();
    },

    methods: {
      goTo() {
        this.$router.push({name: 'home'});
      },

      blockScroll() {
        window.scrollTo(0, 0);
        document.querySelector('body').style.overflow = "hidden";
        document.querySelector('html').style.overflow = "hidden";
      },

      unblockScroll() {
        document.querySelector('body').style.overflow = "auto";
        document.querySelector('html').style.overflow = "auto";
      }
    }
  }
</script>

<style lang="scss">

  @import '../utils/global';

  #intro {
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    .center {
      transform: rotate(-90deg);
    }

    h1 {
      display: inline-block;
    }

    img {
      display: inline-block;
      height: 20px;
      margin-left: 20px;
    }

    #scrollto {
      font-size: .8rem;
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      a {
        text-decoration: none;
        color: $dark_purple;
      }

      &:after {
        content: '';
        height: 200px;
        width: 4px;
        background: $dark_purple;
        position: absolute;
        display: block;
        top: 20px;
        left: calc(50% - 2px);
      }
    }

  }

</style>
