<template>
    <div>
        <mt-cell
            v-for="(item,index) in list"
            :key="index"
            :title="item.filename"
            @click.native="playAudio(index)"
        >
            <img src="../../assets/images/download_icon.png" alt="" :class="$style.downicon">
        </mt-cell>
    </div>
</template>

<script>
import { PLAY_AUDIO } from "../../mixins";
export default {
  mixins: [PLAY_AUDIO],
  props: {
    list: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" module>
.downicon {
  width: 20px;
  height: 20px;
}
</style>
<style>
.mint-cell-wrapper {
  font-size: 14px;
}
</style>

