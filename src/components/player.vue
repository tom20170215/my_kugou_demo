<template>
    <div :class="[{[$style.audio_panel_hide]:toggleHide},$style.audio_container]">
        <audio :src=audio.songUrl autoplay id="music_audio" @ended="next" @timeupdate="change"></audio>
        <div :class="[$style.audio_panel_control,{[$style.toggleContral]: toggleHide}]" @click="togglePanel">
            <mt-spinner type='snake' v-show="audioLoadding" :size='35'></mt-spinner>
        </div>
        <div :class="$style.audio_panel">
            <img :src=audio.imgUrl alt="" :class="$style.player_img" @click='showDetailPlayer'>
            <div :class="$style.player_status">
                <p :class="$style.player_title">{{audio.title}}</p>
                <p :class="$style.player_singer">{{audio.singer}}</p>
            </div>
            <div :class="$style.player_control">
                <span :class="[$style.player_play,{[$style.player_pause]:isplay}]" @click="toggleStatus"></span>
                <span :class="$style.player_next" @click="next"></span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      toggleHide: false
    };
  },
  computed:{
      ...mapGetters(['audio','audioLoadding','isplay','showPlayer'])
  },
  methods: {
      /**
       * 切换player显示隐藏
       */
    togglePanel() {
      this.toggleHide = !this.toggleHide;
    },
    /**
     * 切换audio状态
     */
    toggleStatus(){
        if(this.isplay){
            document.getElementById('music_audio').pause();
        }else{
            document.getElementById('music_audio').play();
        }
        this.$store.commit('toggleIsPlay',!this.isplay);
    },
    /**
     * 下一首audio
     */
    next(){
        this.$store.dispatch('next');
    },
    /**
     * 改变audio播放位置触发
     */
    change(){
        let time = document.getElementById("music_audio").currentTime;

    },
    /**
     * 显示audio详情界面
     */
    showDetailPlayer(){
        if(this.showPlayer){
            this.$store.commit('showDetailPlayer',true);
            document.getElementsByTagName('html')[0].style.setProperty('overflow','hidden');
        }
        
    }
  }
};
</script>
<style lang="scss" module>
.audio_container {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  transition: all .5s;
  -webkit-transition: all .5s;
  .audio_panel_control {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.8);
    background-image: url(../assets/images/close_icon.png);
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .audio_panel {
    z-index: 999;
    width: 100%;
    padding: 7px;
    height: 64px;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    .player_img{
        height: 100%;
        border-radius: 2px;
    }
    .player_status{
       margin-left: 18px; 
       padding: 6px 0;
       width: 50%;
       .player_title{
           color: #fff;
           font-size: 16px;
           overflow: hidden;
           white-space: nowrap;
           text-overflow: ellipsis;
       }
       .player_singer{
           color: #c4c4c4;
       }
    }
    .player_control{
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 16px;
        justify-content: space-around;
        .player_play{
            display: block;
            width: 35px;
            height: 35px;
            background: url(../assets/images/play_play.png) no-repeat center/80%;
        }
        .player_next{
            display: block;
            width: 35px;
            height: 35px;
            background: url(../assets/images/play_next.png) no-repeat center/80%;
        }
        .player_pause{
            background-image: url(../assets/images/play_pause.png);
        }
    }
  }
}
.audio_panel_hide{
    bottom: -64px;
}
.toggleContral{
    background-image: url(../assets/images/open_icon.png) !important;
}
</style>
