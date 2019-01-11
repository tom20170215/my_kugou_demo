<template>
    <div :class="$style.header_logo">
        <div :class="$style.logo">
            <router-link to='/newSongs'>
                <img src="http://m.kugou.com/v3/static/images/index/logo.png" alt="">
            </router-link>
        </div>
        <div :class="$style.search">
            <router-link to='/'>
                <img src="http://m.kugou.com/v3/static/images/index/search.png" alt="">
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.header_logo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2ca2f9;
  padding: 10px;
  z-index: 1050;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .logo img {
    width: 135px;
    height: 31px;
  }
  .search  img {
    width: 25px;
    height: 25px;
  }
}
</style>
