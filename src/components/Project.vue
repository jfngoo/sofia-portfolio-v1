<template>
  <div id="project">

    <borders></borders>

    <h2>{{project.title}}</h2>
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

<style scoped lang="scss">

  @import '../utils/global.scss';
</style>
