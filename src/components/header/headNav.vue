<template>
    <mt-navbar v-model="headnav">
        <mt-tab-item id="head-nav1">新歌</mt-tab-item>
        <mt-tab-item id="head-nav2">排行</mt-tab-item>
        <mt-tab-item id="head-nav3">歌单</mt-tab-item>
        <mt-tab-item id="head-nav4">歌手</mt-tab-item>
    </mt-navbar>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    computed:{
        headnav:{
            get:function(){
                return this.$store.getters.headnav
            },
            set:function(nav){
                this.$store.commit('setHeadnav',nav);
                this.goRouter(Number(nav.substr(-1)));
            }
        }
    },
    methods:{
        goRouter(index){
            console.log(index);
            switch(index){
                case 1:
                    this.$router.push('/newSongs');
                    break;
                case 2:
                    this.$router.push('/rank');
                    break;
                case 3:
                    this.$router.push('/plist');
                    break;
                case 4:
                    this.$router.push('/singer');
                    break;
            }
        }
    }
}
</script>

<style lang="scss" module>

</style>
<style>
.mint-navbar .mint-tab-item{
    padding: 13px 0;
}
.mint-tab-item-label{
    font-size: 16px;
}
.mint-navbar{
    z-index: 1000;
    position: fixed;
    left: 0;
    right: 0;
    top: 51px;
}
</style>

