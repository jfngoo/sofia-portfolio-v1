<template>
  <div id="project" v-if="project">

    <borders></borders>

    <div id="project-wrapper">

      <div id="header" v-if="project.title">
        <div id="banner" :style="{ backgroundImage: 'url(' + getCover(project.background) +')' }"></div>
        <h1 class="title">{{project.title}}</h1>
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

      <div id="container">

        <div class="text" v-if="project.text1">
          {{project.text1}}
        </div>

        <div class="video" v-if="project.vimeoId">
          <iframe :src="vimeoURI" width="640px" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen
                  allowfullscreen></iframe>
        </div>

        <div class="video" v-if="project.youtubeId">
          <iframe width="560" height="315" :src="youtubeURI" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
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

  export default {
    name: 'project',

    components: {
      Borders
    },

    data () {
      return {
        project: null,
        vimeoURI: null,
        youtubeURI : null
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
        this.$router.push({name: name});
      }
    }
  }
</script>

<style lang="scss">

  @import '../utils/global.scss';

  #project {

    min-height: 100vh;
    background: #FFFFFF;

    #project-wrapper {
      padding: 0 $border_width;
    }

    #header {
      padding-top: 60px;

      #banner {
        width: calc(100vw - 120px);
        height: 500px;
        margin: 0 auto;
        background: center center no-repeat;
        background-size: cover;
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
