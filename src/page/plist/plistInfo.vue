<template>
    <div :class="$style.plistinfo">
        <div :style="`background-image: url(${imgurl})`.replace('{size}',400)" :class="$style.rank_banner"></div>
    </div>
</template>
<script>
import {mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return {
            specialid: this.$route.params.id,
            imgurl: ''
        }
    },
    methods:{
        ...mapMutations(['showRankNav']),
        ...mapActions(['getpInfo'])
    },
    beforeRouteEnter(to,from,next){
        next(vm => {
            vm.showRankNav(true);
            vm.getpInfo({
                id: vm.specialid,
                data: {
                    json: true
                }
            }).then(res => {
                vm.imgurl = res.info.list.imgurl;
                
            });
        });
    }
}
</script>
<style lang="scss" module>
    .plistinfo{
        margin-top: 51px;
        .rank_banner{
            height: 250px;
            background-size: 100%;
            background-position: center;
        }
    }
</style>
