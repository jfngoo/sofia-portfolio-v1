<template>
  <div id="home">

    <div id="borders">
      <div class="border-top horizontal-border"></div>
      <div class="border-right vertical-border"></div>
      <div class="border-bottom horizontal-border"></div>
      <div class="border-left vertical-border">
          <img class="logo" src="../assets/svg/logo-sofia.svg" alt="" @click="goTo('intro')">
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
        <li v-for="project in projects" :style="{ backgroundImage: 'url(' + getPhoto(project.background) +')' }">
          <div class="wrapper">
            <div class="title">{{project.title}}</div>
            <div class="type">{{project.type}}</div>
            <div class="date">{{project.date}}</div>
          </div>
        </li>
      </ul>
    </div>

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

  #home {
    min-height: 100vh;

    #borders {
      .horizontal-border {
        height: 60px;
        width: 100vw;
        position: fixed;
        z-index: 99;
        background: $background_color;
      }
      .vertical-border {
        height: 100vh;
        width: 60px;
        position: fixed;
        z-index: 99;
        background: $background_color;
      }
      .border-left {
        left: 0;
        .logo {
          position: relative;
          z-index: 99999;
          transform: rotate(-90deg);
          margin-top: 83px;
          &:hover {
            cursor: pointer;
           }
        }

        nav {

          transform: rotate(-90deg);
          position: absolute;
          left: 30px;
          bottom: 10px;
          width: 100vw;
          transform-origin: 0;
          z-index: 999;
          text-align: left;
          ul {
            margin: 0;
            li {
              display: inline-block;
              &:hover {
                 cursor: pointer;
               }
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
      ul {
        padding-top: 60px;
        margin: 0;
        width: calc(100vw - 120px);

        li {
          position: relative;
          margin: 0 auto;
          display: block;
          height: 500px;
          background: #FFFFFF center center no-repeat;
          background-size: cover;
          transition: .25s all ease;
          filter: grayscale(100%);

            &:hover {
               filter: grayscale(0%);
                cursor: pointer;
             }

            .wrapper {
              position: absolute;
              bottom: 100px;
              left: 100px;
              color: #FFFFFF;
              text-align: left;

              .title {
                font-size: 2.4rem;
                text-transform: uppercase;
              }

              .type {
                margin: -4px 0 2px 0;
              }

              .date {
                font-size: 1.1rem;
              }
            }

        }

        li + li {
          margin-top: 20px;
        }
      }
    }
  }

</style>
