<template>

  <div id="borders">
    <!--<div class="border-top horizontal-border"></div>-->
    <!--<div class="border-right vertical-border"></div>-->
    <!--<div class="border-bottom horizontal-border">-->
    <!--© Sofia Boggio - 2017-->
    <!--</div>-->
    <div class="border-left vertical-border">
      <img class="logo" src="../assets/svg/logo-sofia-clear.svg" alt="" @click="goToHome()">
      <nav>
        <ul>
          <li @click="setLang('fr')">FR</li>
          <li @click="setLang('en')">EN</li>
          <li ref="about" id="nav-about" @click="goToAbout()">{{ $t('nav.about') }}</li>
          <li ref="work" id="nav-work" @click="goToHome()">{{ $t('nav.work') }}</li>
        </ul>
      </nav>
    </div>
  </div>

</template>

<script>
import EventBus from 'lib/eventBus'

import { mapState, mapMutations } from 'vuex'
import { CURRENT_PROJECT_ID } from '../store/config.state'
import { SET_LANG } from '../store/config.mutations'

export default {
  name: 'BordersComponent',
  data () {
    return {
      projects: null
    }
  },

  computed: {
    ...mapState({
      currentProjectId: CURRENT_PROJECT_ID
    })
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
    ...mapMutations({
      setLang: SET_LANG
    }),

    goToHome () {
      if (this.currentProjectId) {
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

  @import '../assets/style/global';

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
            color: #FFFFFF;
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
