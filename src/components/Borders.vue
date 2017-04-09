<template>

  <div id="borders">
    <div class="border-top horizontal-border"></div>
    <div class="border-right vertical-border"></div>
    <div class="border-bottom horizontal-border">
      © Sofia Boggio - 2017

    </div>
    <div class="border-left vertical-border">
      <img class="logo" src="../assets/svg/logo-sofia-clear.svg" alt="" @click="goToHome()">
      <nav>
        <ul>
          <li>about & contact</li>
          <li>archive</li>
          <li @click="goToHome()">work</li>
        </ul>
      </nav>
    </div>
  </div>

</template>

<script>

  import StateManager from 'lib/stateManager'

  export default {
    name: 'borders',
    data () {
      return {
        projects: null
      }
    },

    methods: {
      goToHome() {
        this.$router.push({name: "home"});
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
      width: 60px;
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

      line-height: $border_width;
    }
  }

</style>
