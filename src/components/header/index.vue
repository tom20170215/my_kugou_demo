<template>
    <div :class="$style.header_box">
        <header-logo></header-logo>
        <rank-head-nav v-if='rankhead.toggle' :title='rankhead.title'></rank-head-nav>
        <head-nav v-else></head-nav>
    </div>
</template>

<script>
import headerLogo from './headerLogo'
import headNav from './headNav'
import rankHeadNav from './rankHeadNav'
import {mapGetters} from 'vuex'
export default {
    components: {
        headerLogo,
        headNav,
        rankHeadNav
    },
    computed: {
        ...mapGetters(['rankhead'])
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


