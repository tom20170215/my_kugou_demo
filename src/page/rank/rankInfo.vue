<template>
    <div :class="$style.rank_container">
        <div :class="$style.rank_banner" :style="{backgroundImage:'url('+imgUrl+')'}">
            <div :class="$style.rank_time">
                <p>上次更新时间:{{getToday()}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      page: 1,
      imgUrl: ""
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
    ...mapMutations(["showRankNav","setRankTitle"]),

    getToday(){
        let time = new Date();
        let year = time.getFullYear().toString();
        let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1).toString();
        let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate().toString();
        return year + '-' + month + '-' + day;
    }
  }
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
      .rank_time{
          position: absolute;
          bottom: 0;
          color: #fff;
          font-weight: 800;
      }
  }
}
</style>
