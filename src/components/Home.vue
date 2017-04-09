<template>
  <div id="home">
    <borders></borders>

    <!--<id id="mask"></id>-->

    <div id="projects">
      <ul>
        <li v-for="project in projects" :style="{ backgroundImage: 'url(' + getCover(project.background) +')' }" @click="goTo('project', project.id)">
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

  import {TweenMax} from 'gsap'

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
      this.resetScroll();
      this.projects = DataManager.getProjects();
      this.setTweens();
    },

    methods: {
      resetScroll() {
        window.scrollTo(0, 0);
      },

      getCover(fileName) {
          return AssetsManager.getCover(fileName);
      },

      goTo(name, param) {
          if (param) {
              this.$router.push({name: name, params: {id: param}});
          } else {
              this.$router.push({name: name});
          }
      },

      setTweens() {

          const tl = new TimelineMax();

      }
    }
  }
</script>

<style lang="scss">

  #home {
    min-height: 100vh;

    #mask {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
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
