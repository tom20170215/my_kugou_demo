<template>
  <div id="app">
    <Header></Header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
    <Detail-player></Detail-player>
  </div>
</template>

<script>
import Header from './components/header'
import Player from './components/player'
import DetailPlayer from './components/detailplayer'
export default {
  name: 'App',
  components:{
    Header,
    Player,
    DetailPlayer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
</style>
