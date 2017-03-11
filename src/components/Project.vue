<template>
  <div id="project">

  </div>
</template>

<script>

  import DataManager from 'lib/dataManager'
  import AssetsManager from 'lib/assetsManager'
  export default {
    name: 'home',
    data () {
      return {
        projects: null
      }
    },

    mounted() {
      this.setScroll();
      this.projects = DataManager.getProjects();
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
