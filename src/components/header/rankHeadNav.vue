<template>
    <div :class="$style.rank_head_nav">
        <a href="" :class="$style.back_arrow"></a>
        <p>{{title}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" module>
    .back_arrow{
        background: url(../../assets/images/goback_icon.png) no-repeat center/100%;
        display: block;
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
    }
</style>
