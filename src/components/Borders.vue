<template>

  <div id="borders">
    <!--<div class="border-top horizontal-border"></div>-->
    <!--<div class="border-right vertical-border"></div>-->
    <!--<div class="border-bottom horizontal-border">-->
      <!--© Sofia Boggio - 2017-->
    <!--</div>-->
    <div class="border-left vertical-border">
      <img class="logo" src="../../static//svg/logo-sofia-clear.svg" alt="" @click="goToHome()">
      <nav>
        <ul>
          <li ref="about" id="nav-about" @click="goToAbout()">about & contact</li>
          <!--<li>archive</li>-->
          <li ref="work" id="nav-work" @click="goToHome()">work</li>
        </ul>
      </nav>
    </div>
  </div>

</template>

<script>

  import StateManager from 'lib/stateManager'
  import EventBus from 'lib/eventBus'

  export default {
    name: 'BordersComponent',
    data () {
      return {
        projects: null
      }
    },

    mounted () {
      if (this.$route.name === 'home' || this.$route.name === 'project') {
        this.$refs.work.classList.add('active')
      }
      if (this.$route.name === 'about') {
        this.$refs.about.classList.add('active')
      }
    },

    methods: {
      goToHome () {
        if (StateManager.getIsInProject()) {
          EventBus.$emit('BACK_TO_HOME')
        } else {
          this.$router.push({ name: 'home' })
        }
      },

      goToAbout () {
        this.$router.push({ name: 'about' })
      }


    }
  }
</script>

<style lang="scss">

  @import '../utils/global.scss';

  #borders {

    color: $clear-purple;
    font-size: .9rem;

    .horizontal-border {
      height: $border_width;
      width: 100vw;
      position: fixed;
      left: 0;
      z-index: 99;
      background: $background_color;
    }
    .vertical-border {
      height: 100vh;
      width: $border_width;
      position: fixed;
      top: 0;
      z-index: 99;
      background: $background_color;
    }
    .border-left {
      left: 0;
      .logo {
        position: relative;
        z-index: 99999;
        transform: rotate(-90deg);
        margin-top: 67px;
        &:hover {
          cursor: pointer;
        }
      }

      nav {

        transform: rotate(-90deg);
        position: absolute;
        left: $border_width / 2;
        bottom: 0;
        width: 100vw;
        transform-origin: 0;
        z-index: 999;
        text-align: left;
        ul {
          margin: 0;
          li {
            position: relative;
            display: inline-block;

            &:after {
              content: '';
              width: 0;
              height: 2px;
              background: #FFFFFF;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: -4px;
              transition: width ease .4s;
            }

            &:hover {
              cursor: pointer;
            }

            &:hover:after {
              width: 80%;
            }
          }

          li.active {
            &:after {
              width: 100%;
            }

            &:hover:after {
              width: 80%;
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

      line-height: $border_width;
    }
  }

</style>
