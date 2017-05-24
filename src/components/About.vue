<template>
  <div id="about">

    <borders></borders>

    <div id="about-wrapper">

      <div id="header">
        <div id="banner" :style="{ backgroundImage: 'url(' + getBackground('about.jpg') +')' }"></div>
        <div ref="bannerMask" id="banner-mask"></div>
        <h1 ref="title" class="title" v-html="about.head_title"></h1>
      </div>

      <div ref="container" id="container">

        <div id="description" v-html="about.description">
        </div>

        <div id="social">
          <ul>
            <li><a :href="mail" target="_blank">Mail</a></li>
            <li><a :href="about.facebookURL" target="_blank">Facebook</a></li>
            <li><a :href="about.twitterURL" target="_blank">Twitter</a></li>
            <li><a :href="about.behanceURL" target="_blank">Behance</a></li>
            <li><a :href="about.twitchURL" target="_blank">Twitch</a></li>
          </ul>
        </div>

        <div id="thanks">Made with <a href="https://jackyfong.com">Jacky Fong</a></div>

      </div>

    </div>

  </div>
</template>

<script>

  import Borders from 'components/Borders'

  import DataManager from 'lib/dataManager'
  import AssetsManager from 'lib/assetsManager'
  import StateManager from 'lib/stateManager'

  import EventBus from 'lib/eventBus'

  import {TweenMax} from 'gsap'

  export default {
    name: 'ProjectComponent',

    components: {
      Borders
    },

    data () {
      return {
        about: null,
        mail: null
      }
    },

    beforeMount() {
      this.about = DataManager.getAbout();

      this.mail = "mailto:" + this.about.mail;
    },

    mounted() {
      this.resetScroll();

      StateManager.setPlayHomeAnimation(true);
      this.$nextTick(this.setTweens);
      //StateManager.setIsInProject(this.project.id);

      //this.addEventListeners();
    },

    beforeDestroy() {

    },

    methods: {
      resetScroll() {
        window.scrollTo(0, 0);
      },

      getBackground(filename) {
        return AssetsManager.getAboutBackground(filename);
      },

      getAssets(filename) {
        return AssetsManager.getAssetInFolder(this.project.id, filename);
      },

      goTo(name) {
        TweenMax.to(window, .3, {
          scrollTo: {y: 0, autoKill: false}, onComplete: () => {
            this.$router.push({name: name});
          }
        });
      },

      setTweens() {
        const tl = new TimelineMax();

        tl.from(this.$refs.bannerMask, 1, {opacity: 0}, "tag");
        tl.from(this.$refs.title, 1, {y: 40, opacity: 0}, "tag -= .75");
        tl.staggerFrom(".block", .5, {y: 40, opacity: 0}, .15, "tag -= .55");
        tl.from(this.$refs.container, 1, {y: 40, opacity: 0}, "tag -= .05");
      },

      addEventListeners() {
        EventBus.$on("BACK_TO_HOME", () => {
          this.goTo("home");
        });
      }
    }
  }
</script>

<style lang="scss">

  @import '../utils/global.scss';

  #about {

    min-height: 100vh;
    background: #FFFFFF;
    font-size: .9rem;

    #about-wrapper {
      padding: $border_width;
    }

    #header {

      #banner {
        position: relative;
        width: 100%;
        height: 500px;
        margin: 0 auto;
        background: center center no-repeat;
        background-size: cover;
      }

      #banner-mask {
        position: absolute;
        top: $border_width;
        left: $border_width;
        width: calc(100% - 2 * #{$border-width});
        height: 500px;
        background: #FFFFFF;
        opacity: .3;
        overflow: hidden;
      }

      .title {
        text-transform: uppercase;
        font-size: 4rem;
        position: relative;
        top: -30px;
        margin: 0;
      }
    }

    #container {
      margin: 0 auto;
      padding: 0 20px 60px 20px;
      max-width: 500px;
      line-height: 1.4rem;
      font-size: 1rem;
      text-align: left;

      #social {
        ul {
          margin: 40px 0;
          padding: 0;
          display: flex;
          justify-content: space-between;

          li {
            display: inline-block;

            a {
              color: #3c3d4c;
            }
          }
        }
      }

      #thanks {
        a {
          color: #3c3d4c;
        }
      }
    }
  }


</style>
