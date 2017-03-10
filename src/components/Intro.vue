<template>
  <div id="intro">
    <div class="center">
      <h1>sofia boggio</h1>
      <img src="../assets/svg/logo-sofia.svg">
    </div>
    <div id="scrollto">scroll to discover</div>
  </div>
</template>

<script>
  export default {
    name: 'intro',
  }
</script>

<style lang="scss">

  body, html {
    height: 100%;
    overflow: hidden;
  }

  #intro {
    background: #F0F2FA;
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    .center {
      transform: rotate(-90deg);
    }

    h1 {
      display: inline-block;
    }

    img {
      display: inline-block;
      height: 20px;
      margin-left: 20px;
    }

    #scrollto {
      font-size: .8rem;
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      &:after {
        content: '';
        height: 200px;
        width: 4px;
        background: #3C3D4C;
        position: absolute;
        display: block;
        top: 20px;
        left: calc(50% - 2px);
       }
    }

  }

</style>
