<template>
  <div ref="home" id="home">
    <borders></borders>

    <div ref="mask" id="mask"></div>

    <div ref="projects" id="projects">
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
      this.$nextTick(this.setTweens);
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

          tl.set(this.$refs.mask, {width: 1});
          tl.to(this.$refs.mask, 1, {scale: 5000, ease: Power3.easeIn});
          tl.set(this.$refs.home, {background: "#F0F2FA"});
          tl.set(this.$refs.mask, {display: "none"});

          tl.set(this.$refs.projects, {visibility: "visible"});
          tl.staggerFrom("#projects ul li", 1, {opacity: 0, x: 40 }, .25);
      }
    }
  }
</script>

<style lang="scss">

  @import '../utils/global';

  #home {
    min-height: 100vh;
    background: $dark_purple;
    overflow-x: hidden;
    padding: 0 60px;

    #mask {
      position: fixed;
      top: 0;
      left: 50%;
      height: 100vh;
      width: 0;
      background: $clear_purple;
      z-index: 10;
    }

    #projects {
      visibility: hidden;

      ul {
        padding: 60px 0 0 0;
        margin: 0 auto;
        width: 100%;

        li {
          position: relative;
          margin: 0 auto;
          display: block;
          width: 100%;
          height: 500px;
          background: #FFFFFF center center no-repeat;
          background-size: cover;
          transition: .25s filter ease;
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
          /*margin-top: 20px;*/
        }
      }
    }
  }

</style>
