<template>
  <div :class="$style.newSongs_container">
    <song-slider :banners="banner"></song-slider>
    <s-list :list="songList"></s-list>
  </div>
</template>

<script>
import songSlider from "./songSlider";
import { Indicator } from "mint-ui";
import sList from "./list";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      banner: [],
      songList: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setHeadnav("head-nav1");
      Indicator.open({
        text: "加载中",
        spinnerType: "fading-circle"
      });
      vm.getBanner({ json: true })
        .then(res => {
          vm.banner = res.banner;
          vm.songList = res.data;
        })
        .then(() => {
          Indicator.close();
        });
    });
  },
  mounted() {
    //   Indicator.open({
    //       text:'加载中',
    //       spinnerType: 'fading-circle'
    //   });
    // this.getBanner({ json: true }).then(res => {
    //     this.banner = res.banner;
    //     this.songList = res.data;
    // }).then(() => {
    //     Indicator.close();
    // });
  },
  methods: {
    ...mapActions(["getBanner"]),
    ...mapMutations(["setHeadnav"])
  },
  components: {
    songSlider,
    sList
  }
};
</script>

<style lang="scss" module>
.newSongs_container {
  margin-top: 96px;
}
</style>
