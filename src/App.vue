<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="scss">
@import  'common/scss/index.scss';
@import  'common/scss/variable.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: $color-background;
  color: $color-text;
}
</style>
