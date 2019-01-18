<template>
    <div v-show="detailPlayerFlag">
        <div :class="$style.detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
        <div :class="$style.detail_player_content">
            <div :class="$style.detail_title">
                <span @click="hideDetailPlayer" :class="$style.arrowBack"></span>
                <span>{{audio.title}}</span>
            </div>
            <div :class="$style.detail_play_img">
                <img :src=audio.imgUrl alt="">
            </div>
            <div :class="$style.detail_player_lrc">
                <div :class="$style.lrc_content" :style="{marginTop: lrcOffset + 'px'}">
                    <p v-for="(item,index) in songLrc" :key="index" :class="{isCurrentLrc: item.second > audio.currentLength}">
                        {{item.lrcContent}}
                    </p>
                </div>
            </div>
            <div :class="$style.detail_player_range">
                <mt-range :min='0' :max=audio.songLength v-model=audio.currentLength :bar-height='3' @touchmove.native='rangeChange' @click.native='clickRangeChange'>
                    <div slot="start">{{audio.currentLength | time}}</div>
                    <div slot="end">{{audio.songLength | time}}</div>
                </mt-range>
            </div>
            <div :class="$style.detail_player_control">
                <i :class="[$style.play_prev,$style.player_btn_sm,$style.player_btn]" @click="prev"></i>
                <i :class="[$style.play_play,$style.player_btn_lg,$style.player_btn,{[$style.play_pause]: isplay}]" @click="toggleStatus"></i>
                <i :class="[$style.play_next,$style.player_btn_sm,$style.player_btn]" @click="next"></i>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    filters: {
        time(value){
            var length = Math.floor(parseInt(value));
            var minite = Math.floor(value / 60);
            if(minite < 10){
                minite = '0' + minite;
            }
            var second = length % 60;
            if(second < 10){
                second = '0' + second;
            }
            return minite + ':' + second;
        }
    },
    mounted(){
    },
    computed: {
        ...mapGetters(['detailPlayerFlag','audio','isplay']),
        songLrc(){           
            if(this.audio.lrc){
                var temp = this.audio.lrc.split('\r\n');
                temp = temp.map(item => {
                    let time = item.substr(1,5);
                    let second = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
                    let lrcContent = item.substr(10);
                    return {
                        second,
                        lrcContent
                    }
                })
                return temp;
            }
        },
        lrcOffset(){
            if(this.songLrc){
                return (this.songLrc.length - document.getElementsByClassName('isCurrentLrc').length) * (-20) + this.audio.currentLength - this.audio.currentLength;
            }
        }
    },
    methods:{
        hideDetailPlayer(){
            this.$store.commit('showDetailPlayer',false);
            document.getElementsByTagName('html')[0].style.setProperty('overflow','visible');
        },
        rangeChange(e){
            this.$store.commit('setCurrent',true);
            this.$store.commit("setAudioTime",this.audio.currentLength);
        },
        clickRangeChange(e){
            if(e.target.className === 'mt-range-content' || e.target.className === 'mt-range-runway' || e.target.className === 'mt-range-progress'){
                var offset = e.offsetX;
                var rangeWidth = document.getElementsByClassName('mt-range-content')[0].offsetWidth;
                var clickLength = Math.floor(offset * this.audio.songLength / rangeWidth);
                if(offset < rangeWidth){
                    this.$store.commit('setAudioTime',clickLength);
                    this.$store.commit('setCurrent',true);
                }
            }else{
                return false;
            }
        },
        next(){
            this.$store.dispatch('next');
        },
        prev(){
            this.$store.dispatch('prev');
        },
        /**
         * 切换播放状态
         */
        toggleStatus(){
            this.$store.commit('toggleIsPlay',!this.isplay);
            if(this.isplay){
                document.getElementById('music_audio').play();
            }else{
                document.getElementById('music_audio').pause();
            }
        }
    }
}
</script>
<style lang="scss" module>
    .detail_player{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1020;
        width: 100%;
        height: 100%;
        filter: blur(5px);
        -webkit-filter: blur(5px);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .detail_player_content{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 1020;
        .detail_title{
            margin-top: 51px;
            color: #fff;
            font-size: 18px;
            font-weight: 800;
            text-align: center;
            width: 100%;
            height: 43px;
            line-height: 43px;
            position: relative;
            .arrowBack{
                background:url(../assets/images/goback_icon.png) no-repeat center/54%;
                display: inline-block;
                width: 24px;
                height: 100%;
                position: absolute;
                left: 13px;
            }
            span:nth-of-type(2){
                width: 80%;
                position: absolute;
                display: block;
                top: 30px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                left:41px;
            }
        }
        .detail_play_img{
            width: 50%;
            margin: 30px auto;
        }
        .detail_player_lrc{
            width: 100%;
            overflow: hidden;
            height: 60px;
            text-align: center;
            color: #fff;
            margin-bottom: 20px;
            line-height: 20px;
            .lrc_content{
               transition: all .5s;
               .isCurrentLrc{
                   color: orange;
               }
            }
        }
        .detail_player_range{
            width: 100%;
            padding:0 10px;
            color: #fff;
            font-weight: 900;
        }
        .detail_player_control{
            margin-top: 10px;
            display: flex;
            padding: 0 20%;
            .player_btn_sm{

            }
            .player_btn_lg{

            }
            .player_btn{
                width: 33.3%;
                height: 100px;
                display: block;
            }
            .play_prev{
                background: url(../assets/images/play_prev.png) no-repeat center/60%;
            }
            .play_play{
                background: url(../assets/images/play_play.png) no-repeat center/90%;
            }
            .play_next{
                background: url(../assets/images/play_next.png) no-repeat center/60%;
            }
            .play_pause{
                background: url(../assets/images/play_pause.png) no-repeat center/90%;
            }
        }
    }
</style>

<style>
    /*cover defaults style*/
    .mt-range-content{
        margin-left: 5px;
        margin-right: 5px;
    }
    .mt-range-runway{
        right: -1px;
    }
    .mt-range-thumb{
        top: 7px;
        width: 15px;
        height: 15px;
    }
</style>

