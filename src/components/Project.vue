<template>
  <div id="project" v-if="project">

    <borders></borders>

    <div id="project-wrapper">

      <div id="header" v-if="project.title">
        <div id="banner" :style="{ backgroundImage: 'url(' + getCover(project.background) +')' }"></div>
        <div ref="bannerMask" id="banner-mask"></div>
        <h1 ref="title" class="title">{{project.title}}</h1>
      </div>

      <div id="details" v-if="project.details">
        <div class="what block">
          <div class="title">What</div>
          <ul class="list">
            <li v-for="what in project.details.what">{{what}}</li>
          </ul>
        </div>
        <div class="when block">
          <div class="title">When</div>
          {{project.details.when}}
        </div>
        <div class="who block">
          <div class="title">With</div>
          <ul class="list">
            <li v-for="who in project.details.who">{{who}}</li>
          </ul>
        </div>
      </div>

      <div ref="container" id="container">

        <div class="text" v-if="project.text1">
          {{project.text1}}
        </div>

        <div class="video" v-if="project.vimeoId">
          <iframe :src="vimeoURI" width="640px" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen
                  allowfullscreen></iframe>
        </div>

        <div class="video" v-if="project.youtubeId">
          <iframe width="560" height="315" :src="youtubeURI" frameborder="0" webkitallowfullscreen mozallowfullscreen
                  allowfullscreen></iframe>
        </div>

        <div class="text" v-if="project.text2">
          {{project.text2}}
        </div>

        <div id="gallery">
          <div v-for="photo in project.photos">
            <img :src="getAssets(photo)" alt="Photo">
          </div>
        </div>

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
        project: null,
        vimeoURI: null,
        youtubeURI: null
      }
    },

    beforeMount() {
      this.project = DataManager.getProjectWithName(this.$route.params.id);

      if (this.project.vimeoId) {
        this.vimeoURI = "https://player.vimeo.com/video/" + this.project.vimeoId;
      }
      if (this.project.youtubeId) {
        this.youtubeURI = "https://www.youtube.com/embed/" + this.project.youtubeId;
      }
    },

    mounted() {
      this.resetScroll();

      this.$nextTick(this.setTweens);
      StateManager.setIsInProject(this.project.id);

      this.addEventListeners();
    },

    methods: {
      resetScroll() {
        window.scrollTo(0, 0);
      },

      getCover(filename) {
        return AssetsManager.getCover(filename);
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
        tl.from(this.$refs.title, 1, {y: 40, opacity: 0}, "tag -= .5");
        tl.staggerFrom(".block", .5, {y: 40, opacity: 0}, .15, "tag -= .25");
        tl.from(this.$refs.container, 1, {y: 40, opacity: 0});
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

  #project {

    min-height: 100vh;
    background: #FFFFFF;
    font-size: .9rem;

    #project-wrapper {
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
        opacity: .5;
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

    #details {

      padding: 0 40px;

      ul {
        margin: 0;
        padding: 0;

        li {
          display: block;
          line-height: 1.4rem;
        }
      }

      .title {
        margin-bottom: 10px;
        font-weight: bold;
      }

      .block {
        display: inline-block;
        vertical-align: top;
        min-width: 200px;
        margin-top: 40px;
      }
    }

    #container {
      margin: 20px auto;
      padding: 60px 0;
      max-width: 800px;

      .text {
        padding: 0 15px;
        text-align: left;
        line-height: 1.5rem;
      }

      .video {
        margin: 40px auto;

        iframe {
          width: 100%;
          height: 450px;
        }
      }

      #gallery {
        margin: 40px auto;
        img {
          width: 100%;
          height: auto;
          margin: 10px auto;
        }
      }
    }
  }

  @media all and (max-width: 680px) {
    #project {
      #header {
        .title {
          font-size: 10vw;
        }
      }
      #container {
        .video {
          iframe {
            height: 360px;
          }
        }
      }
    }
  }

  @media all and (max-width: 520px) {
    #project {
      #container {
        .video {
          iframe {
            height: 300px;
          }
        }
      }
    }
  }

  @media all and (max-width: 460px) {
    #project {
      #container {
        .video {
          iframe {
            height: 220px;
          }
        }
      }
    }
  }


</style>
