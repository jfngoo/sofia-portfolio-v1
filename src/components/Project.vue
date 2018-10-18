<template>
  <div id="project" v-if="project">
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
            <li
              v-for="what in project.details.what"
              :key="what">{{what}}</li>
          </ul>
        </div>
        <div class="when block">
          <div class="title">When</div>
          {{project.details.when}}

        </div>
        <div class="who block">
          <div class="title">With</div>
          <ul class="list">
            <li
              v-for="who in project.details.who"
              :key="who">{{who}}</li>
          </ul>
        </div>
      </div>

      <div ref="container" id="container">

        <div
          v-for="(block, index) in project.content"
          :key="block.type + index">

          <div class="text" v-if="block.type == 'text'" v-html="block.value"></div>
          <div class="video" v-if="block.type == 'vimeoId'">
            <iframe
              :src="'https://player.vimeo.com/video/' + block.value" width="640px" height="360" frameborder="0"
              webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </div>

          <div class="video" v-if="block.type == 'youtubeId'">
            <iframe
              width="560" height="315" :src="'https://www.youtube.com/embed/' + block.value" frameborder="0"
              webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </div>

          <div id="gallery" v-if="block.type == 'photos'">
            <div
              v-for="photo in block.value"
              :key="photo">
              <img :src="getAssets(photo)" alt="Photo">
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import AssetsManager from 'lib/assetsManager'
import EventBus from 'lib/eventBus'

import { mapGetters, mapMutations } from 'vuex'
import { GET_PROJECTS, GET_PROJECT_BY_ID } from '../store/config.getters'
import { SET_CURRENT_PROJECT_ID, SET_PLAY_HOME_ANIMATION } from '../store/config.mutations'

import { TweenMax, TimelineMax, Power2 } from 'gsap'

export default {
  name: 'ProjectComponent',

  data () {
    return {
      isLoaded: false,
      project: null,
      vimeoURI: null,
      youtubeURI: null
    }
  },

  watch: {
    isLoaded (dataLoaded) {
      if (dataLoaded === true) {
        this.onLoad()
      }
    }
  },

  computed: {
    ...mapGetters({
      projects: GET_PROJECTS,
      getProjectById: GET_PROJECT_BY_ID
    })
  },

  created () {
    this.loadData()
  },

  methods: {
    ...mapMutations({
      setCurrentProjectId: SET_CURRENT_PROJECT_ID,
      setPlayHomeAnimation: SET_PLAY_HOME_ANIMATION
    }),

    loadData () {
      if (!this.projects) {
        setTimeout(() => {
          this.loadData()
        }, 300)
      } else {
        this.project = this.getProjectById(this.$route.params.id)
        this.isLoaded = true
      }
    },

    onLoad () {
      this.resetScroll()
      this.setPlayHomeAnimation(false)

      this.$nextTick(this.setTweens)
      this.setCurrentProjectId(this.project.id)

      this.addEventListeners()
    },

    resetScroll () {
      window.scrollTo(0, 0)
    },

    getCover (filename) {
      return AssetsManager.getCover(filename)
    },

    getAssets (filename) {
      return AssetsManager.getAssetInFolder(this.project.id, filename)
    },

    goTo (name) {
      TweenMax.to(window, 0.5, {
        scrollTo: {
          y: 0,
          autoKill: false,
          ease: Power2.easeOut
        },
        onComplete: () => {
          this.$router.push({ name: name })
        }
      })
    },

    setTweens () {
      const tl = new TimelineMax()

      tl.from(this.$refs.bannerMask, 1, { opacity: 0, force3D: true }, 'tag')
      tl.from(this.$refs.title, 1, { y: 40, opacity: 0, force3D: true }, 'tag -= .75')
      tl.staggerFrom('.block', 0.5, { y: 40, opacity: 0, force3D: true }, 0.15, 'tag -= 0.55')
      tl.from(this.$refs.container, 1, { y: 40, opacity: 0, force3D: true }, 'tag -= .05')
    },

    addEventListeners () {
      EventBus.$on('BACK_TO_HOME', () => {
        this.goTo('home')
      })
    }
  }
}
</script>

<style lang="scss">

  @import '../assets/style/global';

  #project {

    min-height: 100vh;
    background: #FFFFFF;
    font-size: .9rem;
    overflow: hidden;

    #project-wrapper {
      padding: 0 0 0 $border_width;
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
        top: 0;
        left: $border_width;
        width: calc(100% - #{$border-width});
        height: 500px;
        background: #FFFFFF;
        opacity: 0.5;
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
      margin: 20px auto 0;
      padding: 60px 0 5px;
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
