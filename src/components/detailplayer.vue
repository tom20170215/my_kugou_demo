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
                <div :class="$style.lrc_content">
                    <p v-for="(item,index) in songLrc" :key="index">
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
        ...mapGetters(['detailPlayerFlag','audio']),
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
            .lrc_content{
               transition: all .5s;
            }
        }
        .detail_player_range{
            width: 100%;
            padding:0 10px;
            color: #fff;
            font-weight: 900;
        }
    }
</style>

<style>
    /*cover defaults style*/
    .mt-range-content{
        margin-left: 17px;
        margin-right: 44px;
    }
    .mt-range-thumb{
        top: 7px;
        width: 15px;
        height: 15px;
    }
</style>

