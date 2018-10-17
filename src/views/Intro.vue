<template>
  <div id="intro">
    <div id="intro-wrapper">
      <div ref="title" class="center">
        <h1>sofia boggio</h1>
        <img src="../assets/svg/logo-sofia.svg">
      </div>
      <div ref="scroll" id="scrollto">
        <a @click="goToHome">{{ $t('intro.scroll') }}</a>
      </div>
      <div ref="bar" id="bar"></div>
    </div>

  </div>
</template>

<script>

import _ from 'lodash'
import { TweenMax, TimelineMax, Power3 } from 'gsap'

import { mapMutations } from 'vuex'
import { SET_PLAY_HOME_ANIMATION } from '../store/config.mutations'

export default {
  name: 'IntroComponent',

  data () {
    return {
      launched: false
    }
  },

  mounted () {
    this.blockScroll()
    this.addEventListeners()
    this.setTweens()
  },

  beforeDestroy () {
    this.removeEventListeners()
    this.unblockScroll()
  },

  methods: {
    ...mapMutations({
      setPlayHomeAnimation: SET_PLAY_HOME_ANIMATION
    }),

    goTo () {
      this.setPlayHomeAnimation(true)
      this.$router.push({ name: 'home' })
    },

    blockScroll () {
      window.scrollTo(0, 0)
      document.querySelector('body').style.overflow = 'hidden'
      document.querySelector('html').style.overflow = 'hidden'
    },

    unblockScroll () {
      document.querySelector('body').style.overflow = 'auto'
      document.querySelector('html').style.overflow = 'auto'
    },

    addEventListeners () {
      this.scrollListener = _.throttle(this.onScroll, 200)

      window.addEventListener('wheel', this.scrollListener)
      window.addEventListener('touchmove', this.scrollListener)
    },

    removeEventListeners () {
      window.removeEventListener('mousewheel', this.scrollListener)
      window.removeEventListener('touchmove', this.scrollListener)
    },

    setTweens () {
      TweenMax.from(this.$refs.title, 1, { y: 50, opacity: 0 })
      TweenMax.from(this.$refs.bar, 1, { bottom: -50, opacity: 0, delay: 0.5 })
      TweenMax.from(this.$refs.scroll, 1, { opacity: 0, delay: 1.5 })
    },

    goToHome () {
      this.animateIntro()
    },

    onScroll (e) {
      if (!this.launched && (e.deltaY > 1 || e.changedTouches)) {
        this.animateIntro()
      }
    },

    animateIntro () {
      this.launched = true

      TweenMax.killAll()

      TweenMax.set(this.$refs.title, { y: 0, opacity: 1 })
      TweenMax.set(this.$refs.bar, { opacity: 1 })

      let tl = new TimelineMax({ onComplete: this.goTo })

      tl.to(this.$refs.title, 1.75, { y: -1000, opacity: 0, ease: Power3.easeIn, force3D: true }, 'tag')
      tl.to(this.$refs.scroll, 0.5, { y: -10, opacity: 0 }, 'tag')
      tl.to(this.$refs.bar, 1.75, { height: '120vh', ease: Power3.easeIn }, 'tag')
      tl.to(this.$refs.bar, 0.5, { width: '100vw' })
      tl.set('#borders', { display: 'block' })
      tl.fromTo('#borders .border-left', 0.5, { opacity: 0 }, { opacity: 1, force3D: true }, 'tag2')
      tl.fromTo('#borders .border-bottom', 0.5, { opacity: 0 }, { opacity: 1, force3D: true }, 'tag2')
    }
  }
}
</script>

<style lang="scss">

  @import '../assets/style/global';

  #intro {
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    background: $clear_purple;

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

          &:hover {
            cursor: pointer;
          }
        }
      }

      #bar {
        height: 40px;
        width: 4px;
        background: $background_color;
        position: absolute;
        bottom: 0;
        display: block;
        left: 50%;
        transform: translateX(-50%);
      }

    }

  }

</style>
