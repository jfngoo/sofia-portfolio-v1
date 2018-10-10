<template>
  <div ref="home" id="home" v-if="isLoaded">
    <borders></borders>

    <div ref="mask" id="mask"></div>

    <div ref="projects" id="projects">
      <ul>
        <li v-for="project in projects" :id="project.id"
            :style="{ backgroundImage: 'url(' + getCover(project.background) +')' }"
            @click="goToProject(project.id, $event)"
            @mouseover="overProject($event)"
            @mouseout="outProject($event)">
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
  import StateManager from 'lib/stateManager'
  import EventBus from 'lib/eventBus'

  import {TweenMax} from 'gsap'
  import ScrollToPlugin from 'gsap/ScrollToPlugin';

  export default {
    name: 'HomeComponent',

    components: {
      Borders,
    },

    data () {
      return {
        isLoaded: false,
        projects: null
      }
    },

    watch: {
      isLoaded (dataLoaded) {
        if (dataLoaded === true) {
          this.onLoad();
        }
      }
    },

    created() {
      this.loadData();
    },

    methods: {
      loadData() {
        if (!DataManager.isDataLoaded()) {
          setTimeout(() => {
            this.loadData();
          }, 300);
        } else {
          this.projects = DataManager.getProjects();
          this.isLoaded = true;
        }
      },

      onLoad() {
        this.resetScroll();
        this.$nextTick(this.setTweens);
      },

      resetScroll() {
        window.scrollTo(0, 0);
      },

      getCover(fileName) {
        return AssetsManager.getCover(fileName);
      },

      goToProject(id, event) {

        const target = event.target.offsetTop - 48;

        const height = this.$refs.projects.offsetHeight * 1.5;
        TweenMax.set(this.$refs.projects, {height: height});

        const offset = target - window.scrollY;
        let speed = .5;

        if (offset < 100) {
          speed = .25;
        } else if (offset === 0) {
          speed = .00001;
        }

        TweenMax.to(window, speed, {
          scrollTo: {
            y: target,
            onAutoKill: () => {
              TweenMax.set(this.$refs.projects, {height: "auto"});
            }
          }, onComplete: () => {
            this.$router.push({name: "project", params: {id: id}});
          }
        });

      },

      overProject(e) {
        const wrapper = e.currentTarget.firstChild;
        TweenMax.to(wrapper, .5, {x: 15});
      },

      outProject(e) {
        const wrapper = e.currentTarget.firstChild;
        TweenMax.to(wrapper, .3, {x: 0});
      },

      setTweens() {


        const tl = new TimelineMax();

        if (StateManager.getPlayHomeAnimation()) {


          tl.set(this.$refs.mask, {width: 1});
          tl.to(this.$refs.mask, .5, {width: "180vw", ease: Power3.easeIn});

          tl.set(this.$refs.home, {background: "#F0F2FA"});
          tl.set(this.$refs.mask, {display: "none"});
          tl.set(this.$refs.projects, {visibility: "visible"});
          tl.staggerFrom("#projects ul li", 1, {opacity: 0, x: 40, force3D: true}, .25, "tag");
          tl.staggerFrom("#projects ul li .wrapper", 1, {opacity: 0, x: 80, force3D: true}, .25, "tag -= 1.5");

          StateManager.setPlayHomeAnimation(false);
        } else if (StateManager.getIsInProject()) {

          tl.set(this.$refs.home, {background: "#F0F2FA"});
          tl.set(this.$refs.mask, {display: "none"});
          tl.set(this.$refs.projects, {visibility: "visible"});
          const active = document.getElementById(StateManager.getIsInProject())
          const scrollTarget = active.offsetTop - 48;
          window.scrollTo(0, scrollTarget);
          tl.set("#projects ul li", {opacity: 0});
          tl.set(active, {opacity: 1});
          tl.to("#projects ul li", 1, {opacity: 1, force3D: true});
          tl.staggerFrom("#projects ul li .wrapper", 1, {opacity: 0, x: 80, force3D: true}, .25, "tag -= 1.5");

          StateManager.setIsInProject(null);
        }
        else {
          tl.set(this.$refs.home, {background: "#F0F2FA"});
          tl.set(this.$refs.mask, {display: "none"});
          tl.set(this.$refs.projects, {visibility: "visible"});
          tl.staggerFrom("#projects ul li .wrapper", 1, {opacity: 0, x: 80, force3D: true}, .25, "tag -= 1.5");
        }


      }
    }
  }
</script>

<style lang="scss">

  @import '../utils/global';

  #home {
    min-height: 100vh;
    background: $background_color;
    overflow-x: hidden;
    padding: 0;

    #mask {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100vh;
      width: 0;
      background: $clear_purple;
      z-index: 10;
    }

    #projects {
      visibility: hidden;

      ul {
        padding: 0 0 0 $border-width;
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
            text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);

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

  @media all and (max-width: 570px) {
    #home {
      #projects {
        ul li .wrapper {
          bottom: 20px;
          left: 20px;

          .title {
            font-size: 8vw;
          }
        }
      }
    }
  }

</style>
