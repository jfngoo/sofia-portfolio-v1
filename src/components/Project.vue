<template>
  <div id="project">

    <borders></borders>

    <div id="header">
      <div id="banner" :style="{ backgroundImage: 'url(' + getPhoto(project.background) +')' }"></div>
      <h1 class="title">{{project.title}}</h1>
    </div>

    <div id="details">
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
        project: null
      }
    },

    beforeMount() {
      this.project = DataManager.getProjectWithName(this.$route.params.id);
      console.log(this.project.details);
    },

    mounted() {
      this.setScroll();
    },

    methods: {
      setScroll() {
        document.querySelector('body').style.overflow = "auto";
        document.querySelector('html').style.overflow = "auto";
      },

      getPhoto(fileName) {
        return AssetsManager.getPhoto(fileName);
      },

      goTo(name) {
        console.log(name);
        this.$router.push({name: name});
      }
    }
  }
</script>

<style lang="scss">

  #project {

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

      width: 100%;

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

  }

</style>
