import Vue from 'vue'
import Router from 'vue-router'
import newSongs from '../page/newSongs'
import rank from '../page/rank'
import rankInfo from '../page/rank/rankInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/newSongs',
      name: 'newSongs',
      component: newSongs,
      alias: '/'
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/rank/info/:id',
      name: 'rankInfo',
      component: rankInfo
    }
  ]
})
