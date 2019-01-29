<template>
    <div :class="$style.rank_head_nav" id="transparent-header">
        <a :class="$style.back_arrow" @click="goBack"></a>
        <p :class="$style.rank_title">{{title}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" module>
    .back_arrow{
        background: url(../../assets/images/goback_icon.png) no-repeat center/60%;
        display: block;
        width: 24px;
        height: 100%;
    }
    .rank_head_nav{
        position: fixed;
        top: 51px;
        width:100%;
        height: 43px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        z-index: 999;
        font-weight: 900;
        display: flex;
        align-items: center;
        background: rgba( 43,162,251,0);
        .back_arrow{
            margin-left: 10px;
            margin-right: 105px;
        }
        .rank_title{

        }
    }
</style>
