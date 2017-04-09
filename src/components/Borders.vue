<template>

  <div id="borders">
    <div class="border-top horizontal-border"></div>
    <div class="border-right vertical-border"></div>
    <div class="border-bottom horizontal-border"></div>
    <div class="border-left vertical-border">
      <img class="logo" src="../assets/svg/logo-sofia-clear.svg" alt="" @click="goTo('intro')">
      <nav>
        <ul>
          <li>about & contact</li>
          <li>archive</li>
          <li @click="goTo('home')">work</li>
        </ul>
      </nav>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'borders',
    data () {
      return {
        projects: null
      }
    },

    mounted() {
    },

    methods: {

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

<style lang="scss">

  @import '../utils/global.scss';

  #borders {

    color: $clear-purple;

    .horizontal-border {
      height: $border_width;
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

</style>
