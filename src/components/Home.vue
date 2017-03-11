<template>
  <div id="home">

    <div id="borders">
      <!--<div class="border-top horizontal-border"></div>-->
      <div class="border-right vertical-border"></div>
      <!--<div class="border-bottom horizontal-border"></div>-->
      <div class="border-left vertical-border">
        <img class="logo" src="../assets/svg/logo-sofia.svg" alt="">
          <nav>
            <ul>
              <li>about & contact</li>
              <li>archive</li>
              <li>work</li>
            </ul>
          </nav>
      </div>
    </div>

    <div id="projects">
      <ul>
        <li v-for="project in projects">
          <div class="title">{{project.title}}</div>
          <div class="type">{{project.type}}</div>
          <div class="date">{{project.date}}</div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

  import DataManager from 'lib/dataManager'
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
      }
    }
  }
</script>

<style scoped lang="scss">

  #home {
    min-height: 100vh;

    #borders {
      .horizontal-border {
        height: 60px;
        width: 100vw;
        position: fixed;
      }
      .vertical-border {
        height: 100vh;
        width: 60px;
        position: fixed;
      }
      .border-left {
        left: 0;
        .logo {
          transform: rotate(-90deg);
          margin-top: 40px;
        }

        nav {

          transform: rotate(-90deg);
          position: absolute;
          left: 30px;
          bottom: calc(50vh - 200px);
          width: 100vw;
          transform-origin: 0;
          z-index: 999;
          text-align: left;
          ul {
            li {
              display: inline-block;
            }

            li + li {
              margin-left: 30px;
            }
          }
        }

      }
      .border-right {
        right: 0;
      }
      .border-top {
        top: 0;
      }
      .border-bottom {
        bottom: 0;
      }
    }

    #projects {
      padding: 100px;
      ul {
        margin: 0 auto;

        li {
          margin: 0 auto;
          display: block;
          height: 400px;
          width: 90%;
          background: #FFFFFF;
        }

        li + li {
          margin-top: 20px;
        }
      }
    }
  }

</style>
