<template>
  <div>

    <borders></borders>

    <div id="project">
      <div id="banner" :style="{ backgroundImage: 'url(' + getPhoto(project.background) +')' }"></div>
      <h1 class="title">{{project.title}}</h1>
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
      this.projects = DataManager.getProjects();

      for (let i = 0; i < this.projects.length; i++) {
        const project = this.projects[i];
        if (project.id === this.$route.params.id) {
          this.project = project;
        }
      }
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
      top: -80px;
    }
  }

</style>
