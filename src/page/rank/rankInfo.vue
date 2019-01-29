<template>
    <div :class="$style.rank_container">
        <div :class="$style.rank_banner" :style="{backgroundImage:'url('+imgUrl+')'}">
            <div :class="$style.rank_time">
                <p>上次更新时间:{{getToday()}}</p>
            </div>
        </div>
        <mt-cell
            v-for="(item,index) in list"
            :key="index"
            :title="item.filename"
            @click.native="playAudio(index)"
        >
            <span :class="$style.rank_index">{{index + 1}}</span>
            <img src="../../assets/images/download_icon.png" alt="" :class="$style.download">
        </mt-cell>
    </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { PLAY_AUDIO } from "../../mixins";
export default {
  data() {
    return {
      page: 1,
      imgUrl: "",
      list: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.showRankNav(true);
      let params = {
        json: true,
        rankid: vm.$route.params.id,
        page: vm.page
      };
      vm.getRankInfo(params).then(res => {
        let { info, songs } = res;
        let { banner7url, rankname } = info;
        let { list } = songs;
        vm.list = list;
        vm.imgUrl = banner7url.replace("{size}", 400);
        vm.setRankTitle(rankname);
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    this.showRankNav(false);
    next();
  },
  methods: {
    ...mapActions(["getRankInfo"]),
    ...mapMutations(["showRankNav", "setRankTitle"]),

    getToday() {
      let time = new Date();
      let year = time.getFullYear().toString();
      let month =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : (time.getMonth() + 1).toString();
      let day =
        time.getDate() < 10 ? "0" + time.getDate() : time.getDate().toString();
      return year + "-" + month + "-" + day;
    }
  },
  mounted() {
    window.onscroll = function() {
      var nav = document.getElementById("transparent-header");
      if (nav) {
        nav.style.setProperty(
          "background",
          `rgba(43,162,251,${window.pageYOffset / 200})`
        );
      }
    };
  },
  mixins: [PLAY_AUDIO]
};
</script>
<style lang="scss" module>
.rank_container {
  margin-top: 51px;
  .rank_banner {
    width: 100%;
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    .rank_time {
      position: absolute;
      bottom: 0;
      color: #fff;
      font-weight: 800;
      width: 100%;
      height: 43px;
      line-height: 43px;
      box-sizing: border-box;
      padding: 0 10px;
      background: linear-gradient(bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    }
  }
  .download {
    width: 20px;
    height: 20px;
  }
  .rank_index {
    position: absolute;
    left: 20px;
  }
}
</style>
<style>
.mint-cell-wrapper {
  font-size: 14px;
}
.mint-cell-title {
  padding-left: 35px;
  padding-right: 10px;
}
</style>

