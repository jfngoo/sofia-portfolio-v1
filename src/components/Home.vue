<template>
  <div id="home">

    <borders></borders>

    <div id="projects">
      <ul>
        <li v-for="project in projects" :style="{ backgroundImage: 'url(' + getPhoto(project.background) +')' }" @click="goTo('project', project.id)">
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

  import Borders from 'components/Borders'

  import DataManager from 'lib/dataManager'
  import AssetsManager from 'lib/assetsManager'
  export default {
    name: 'home',

    components : {
        Borders,
    },

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

      goTo(name, param) {
          if (param) {
              this.$router.push({name: name, params: {id: param}});
          } else {
              this.$router.push({name: name});
          }
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
        padding: 60px 0 0 0;
        margin: 0 auto;
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
