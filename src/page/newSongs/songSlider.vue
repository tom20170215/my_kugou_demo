<template>
    <div :class="$style.slider_box">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in banners" :key="index">
                <a :href="item.extra.tourl">
                    <img :src="item.imgurl" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" module>
.slider_box{
    height: 39vw !important;
}
</style>
