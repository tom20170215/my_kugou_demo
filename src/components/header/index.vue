<template>
    <div :class="$style.header_box">
        <header-logo></header-logo>
        <head-nav></head-nav>
    </div>
</template>

<script>
import headerLogo from './headerLogo'
import headNav from './headNav'
export default {
    components: {
        headerLogo,
        headNav
    }
}
</script>

<style lang="scss" module>
    // .header_box{
    //     position: fixed;
    //     width: 100%;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     z-index: 999;
    // }
</style>


