import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../axios/getData'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 头部导航
    headnav: 'head-nav1',
    // 歌曲列表和播放索引
    listInfo: {
      songList: [],
      songIndex: 0
    },
    // 音频文件
    audio: {
        songUrl:'',
        imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
        title: '',
        singer: '',
        currentLength: 0,
        songLength: 0,
        currentFlag: false
    },
    rankhead: {
        toggle: false,
        title: ''
    },
    listenCount: 0,
    // 播放控件的开关
    showPlayer: false,
    // 音频加载的开关
    audioLoadding: false,
    // 是否正在播放
    isplay: false,
    // audio详情的开关
    detailPlayerFlag: false
  },
  mutations: {
      // 设置头部导航
    setHeadnav: (state, nav) => {
      state.headnav = nav
    },
    // 设置播放列表
    setListInfo: (state,{list,index}) => {
        state.listInfo.songList = list;
        state.listInfo.songIndex = index;
    },
    // 设置播放音频
    setAudio: (state,audio) => {
        if(!state.listenCount){
            state.showPlayer = true;
        }
        state.listenCount++;
        state.audio = {...state.audio,...audio};
    },
    // 设置歌词
    setLrc: (state,lrc) => {
        state.audio = {...state.audio,lrc};
    },
    // 设置音频加载
    toggleAudioLoading: (state,flag) => {
        state.audioLoadding = flag;
    },
    // 设置播放状态
    toggleIsPlay: (state,flag)=>{
        state.isplay = flag;
    },
    // 显示audio详情
    showDetailPlayer: (state,flag) => {
        state.detailPlayerFlag = flag;
    },
    // 设置当前播放时间
    setAudioTime:(state,time) => {
        state.audio.currentLength = time;
    },
    // 设置当前是否是拖拽改变
    setCurrent: (state,flag)=>{
        state.audio.currentFlag = flag;
    },
    // 设置导航栏显示状态
    showRankNav: (state,flag)=>{
        state.rankhead.toggle = flag;
    },
    // 设置排名的标题
    setRankTitle:(state,title) => {
        state.rankhead.title = title;
    }
  },
  getters: {
    headnav: state => state.headnav,
    audio: state => state.audio,
    showPlayer: state => state.showPlayer,
    audioLoadding: state => state.audioLoadding,
    isplay: state => state.isplay,
    detailPlayerFlag: state => state.detailPlayerFlag,
    rankhead: state => state.rankhead
  },
  actions: {
    /**
     * 获取新歌页面banner图
     * @param {*} param0 
     * @param {*} params 
     */
    getBanner({
      state,
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        api.getBanner(params).then(res => {
          resolve(res.data);
        })
      })
    },
    /**
     * 获取播放歌曲
     * @param {*} param0 
     * @param {*} params 
     */
    getSong({state,commit},params){
        commit('toggleAudioLoading',true);
        if(state.isplay){
            commit('toggleIsPlay',!state.isplay);
        }
        api.getSong(params).then(res => {
            let data = res.data.data;
            let songUrl = data.play_url;
            let imgUrl = data.img;
            let title = data.audio_name;
            let singer = data.author_name;
            let songLength = data.timelength / 1000;
            let lyrics = data.lyrics;
            let currentLength = 0;
            let audio = {songUrl,imgUrl,title,singer,songLength,currentLength};
            commit('setAudio',audio);
            commit('setLrc',lyrics);
            commit('toggleAudioLoading',false);
            commit('toggleIsPlay',true);
        });
        // return new Promise((resolve,reject) => {
        //     api.getSong(params).then(res => {
        //         let data = res.data.data;
        //         let songUrl = data.play_url;
        //         let imgUrl = data.img;
        //         let title = data.audio_name;
        //         let singer = data.author_name;
        //         let songLength = data.timelength / 1000;
        //         let lyrics = data.lyrics;
        //         let currentLength = 0;
        //         let audio = {songUrl,imgUrl,title,singer,songLength,currentLength};
        //         commit('setAudio',audio);
        //         commit('setLrc',lyrics);
        //         commit('toggleAudioLoading',false);
        //         commit('toggleIsPlay',true);
        //     })
        // });
    },
    /**
     *获取排行列表
     * @param {*} param0 
     * @param {*} params 
     */
    getRank({state,commit},params){
        return new Promise((resolve,reject) => {
            api.getRank(params).then(res => {
                resolve(res.data);
            })
        })
    },
    /**
     * 获取排行内容
     * @param {*} param0 
     * @param {*} params 
     */
    getRankInfo({state,commit},params){
        return new Promise((resolve,reject) => {
            api.getRankInfo(params).then(res => {
                resolve(res.data);
            })
        })
    },
    /**
     * 切换下一首
     * @param {*} param0 
     */
    next({dispatch,state}){
        let list = state.listInfo.songList;
        if(state.listInfo.songIndex == list.length - 1){
            state.listInfo.songIndex = 0;
        }else{
            ++state.listInfo.songIndex;
        }
        let hash = list[state.listInfo.songIndex].hash;
        dispatch('getSong',{
            r: 'play/getdata',
            hash:hash
        });
    },
    /**
     * 切换到上一首
     * @param {*} param0 
     */
    prev({dispatch,state}){
        let list = state.listInfo.songList;
        if(state.listInfo.songIndex == 0){
            state.listInfo.songIndex = list.length -1;
        }else{
            state.listInfo.songIndex--
        }
        var hash = list[state.listInfo.songIndex].hash;
        dispatch('getSong',{
            r: 'play/getdata',
            hash: hash
        });
    },
    /**
     * 获取歌单列表
     * @param {*} param0 
     */
    getpList({state},params){
        return new Promise((resolve,reject) => {
            api.getpList(params).then(res => {
                resolve(res.data);
            })
        })
    },
    
    /**
     * 获取歌单内容
     * @param {*} param0 
     * @param {*} params 
     */
    getpInfo({state},params){
        return new Promise((resolve,reject) => {
            api.getpInfo(params).then(res => {
                resolve(res.data)
            })
        });
    }
  }
});

export default store
