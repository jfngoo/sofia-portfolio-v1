<template>
  <div id="intro">

    <borders ref="borders" id="borders"></borders>

    <div id="intro-wrapper">
      <div ref="title" class="center">
        <h1>sofia boggio</h1>
        <img src="../assets/svg/logo-sofia.svg">
      </div>
      <div ref="scroll" id="scrollto">
        <router-link to="home">scroll to discover</router-link>
      </div>
      <div ref="bar" id="bar"></div>
    </div>

  </div>
</template>

<script>

  import _ from 'lodash'
  import {TweenMax} from 'gsap'

  import Borders from 'components/Borders'

  export default {
    name: 'intro',

    components: {
        Borders,
    },

    mounted() {
      this.blockScroll();
      this.addEventListeners();
      this.launched = false;
    },

    beforeDestroy() {
      this.removeEventListeners();
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
      },

      addEventListeners() {
        this.scrollListener = _.throttle(this.onScroll, 200);

        window.addEventListener("mousewheel", this.scrollListener);
      },

      removeEventListeners() {
        window.removeEventListener("mousewheel", this.scrollListener);
      },

      onScroll(e) {
        if (!this.launched && e.deltaY > 10) {
          this.launched = true;
          let tl = new TimelineMax({onComplete: this.goTo});
//          let tl = new TimelineMax();

          tl.to(this.$refs.title, 2, {y: -1000, opacity: 0, ease: Power3.easeIn}, "tag");
          tl.to(this.$refs.scroll, .5, {y: -10, opacity: 0}, "tag");
          tl.to(this.$refs.bar, 2, {height: "100vh", ease: Power3.easeIn}, "tag");
          tl.to(this.$refs.bar, 1, {scaleX: 500});
          tl.set(document.getElementById("borders"), {display: "block"});
          tl.fromTo(document.querySelector("#borders .border-left"), 1, {opacity: 0}, {opacity: 1});
        }
      },
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

    background: $clear_purple;

    #borders {
      position: absolute;
      height: 100vh;
      width: 100vw;
      display: none;
      top: 0;
      left: 0;
    }

    #intro-wrapper {

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
      }

      #bar {
        height: 40px;
        width: 4px;
        background: $dark_purple;
        position: absolute;
        bottom: 0;
        display: block;
        left: calc(50% - 2px);
      }

    }

  }

</style>
