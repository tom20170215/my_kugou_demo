<template>
    <div :class="$style.plist_container" class="pcontainer">
        <mt-cell v-for="(item,index) in list" :key="index" :title="item.specialname" is-link :to="`/plist/info/${item.specialid}`" :label="item.playcount.toString()">
            <img :src="item.imgurl.replace(`{size}`,400)" alt="" slot="icon" width="60" height="60">
        </mt-cell>
    </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import {Indicator} from 'mint-ui'
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapActions(["getpList"]),
    ...mapMutations(["setHeadnav"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setHeadnav("head-nav3");
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      vm.getpList({ json: true }).then(res => {
        vm.list = res.plist.list.info;
        Indicator.close();
      });
    });
  }
};
</script>

<style module>
.plist_container {
  margin-top: 96px;
}
</style>
<style>
.pcontainer .mint-cell {
  padding-left: 10px;
}
.pcontainer .mint-cell-wrapper {
  padding: 10px 5px;
  background-image: none;
  border-bottom: 1px solid #e8e8e8;
  font-size:14px;
}
.pcontainer .mint-cell-text{
    position: absolute;
    overflow: hidden;
    padding-right:15px;
    top:32px;
    left:90px;
    text-overflow:ellipsis;
    white-space: nowrap;
    width:252px;
}
.pcontainer .mint-cell-label{
    position: absolute;
    top:50px;
    left:90px;
}
.pcontainer .mint-cell-label::before{
    content: '';
    display: inline-block;
    background: url(../../assets/images/icon_music.png) no-repeat center/100%;
    width:12px;
    height:12px;
}
</style>

