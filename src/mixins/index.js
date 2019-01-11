module.exports = {
  PLAY_AUDIO: {
    methods: {
      playAudio(index) {
        var hash = this.list[index].hash;
        var info = {
          list: this.list,
          index: index
        };
        this.$store.commit('setListInfo', info);
        this.$store.dispatch('getSong', {
          r: 'play/getdata',
          hash: hash
        });
      }
    }
  }
}
