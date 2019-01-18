<template>
    <div :class="$style.rank_container">
        <mt-cell
            v-for="(item,index) in ranklist"
            :key="index"
            :title="item.rankname"
            is-link
            :to="`/rank/info/${item.rankid}`"
        >
            <img :src="item.imgurl.replace('{size}',400)" alt="" slot="icon" width="60" height="60">
        </mt-cell>
    </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      ranklist: []
    };
  },
  mounted() {
    //   Indicator.open({
    //       text:'加载中...',
    //       spinnerType: 'fading-circle'
    //   });
    // this.getRank({ json: true }).then(res => {
    //     this.ranklist = res.rank.list;
    //     Indicator.close();
    // });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setHeadnav("head-nav2");
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      vm.getRank({ json: true }).then(res => {
        vm.ranklist = res.rank.list;
        Indicator.close();
      });
    });
  },
  methods: {
    ...mapActions(["getRank"]),
    ...mapMutations(["setHeadnav"])
  }
};
</script>
<style lang="scss" module>
.rank_container {
  margin-top: 96px;
}
</style>

<style>
.mint-cell {
  padding-left: 10px;
}
.mint-cell-wrapper {
  padding: 10px 5px;
  background-image: none;
  border-bottom: 1px solid #e8e8e8;
}
</style>

