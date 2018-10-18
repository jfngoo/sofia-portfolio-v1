<template>
  <div
    class="next-project"
    :style="{ backgroundImage: 'url(' + getCover(nextProject.background) +')' }"
    @click="goToNextProject">
    <div class="wrapper">
      <div class="arrow">
        ->
      </div>
      <div class="text">
        <div class="info">{{ $t('project.next') }}</div>
        <div class="title">{{ nextProject.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetsManager from '../lib/assetsManager'

import { mapGetters } from 'vuex'
import { GET_PROJECTS, GET_PROJECT_BY_ID } from '../store/config.getters'

export default {
  name: 'NextProject',

  computed: {
    ...mapGetters({
      projects: GET_PROJECTS,
      getProjectById: GET_PROJECT_BY_ID
    }),

    nextProject () {
      const currentIndex = this.projects.indexOf(this.project)

      if (currentIndex === -1) {
        console.error(`Couldn't find project`)
        return
      }

      if (currentIndex === this.projects.length - 1) {
        return this.projects[0]
      } else {
        return this.projects[currentIndex + 1]
      }
    },

    project () {
      return this.getProjectById(this.$route.params.id)
    }
  },

  methods: {
    getCover (filename) {
      return AssetsManager.getCover(filename)
    },

    goToNextProject () {
      this.$router.push({ name: 'project', params: { id: this.nextProject.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style/global';

  .next-project {
    margin-top: 20px;
    height: 140px;
    display: flex;
    color: #FFFFFF;

    background: center center no-repeat;
    background-size: cover;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      opacity: 0.5;
      overflow: hidden;
    }

    &:hover {
      cursor: pointer;
    }

    .wrapper {
      position: relative;
      z-index: 1;
      display: flex;
      text-shadow: 0 0 20px #6c6c6c;

      .arrow {
        align-self: center;
        width: 80px;
        font-size: 2rem;
      }

      .text {
        position: relative;
        z-index: 2;
        align-self: center;
        text-align: left;

        .info {
          color: #363636;
          text-shadow: none;
        }

        .title {
          font-size: 2.4rem;
          font-weight: bold;
          margin-top: 2px;
        }
      }
    }
  }
</style>
