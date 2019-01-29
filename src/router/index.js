import Vue from 'vue'
import Router from 'vue-router'
import newSongs from '../page/newSongs'
import rank from '../page/rank'
import rankInfo from '../page/rank/rankInfo'
import pList from '../page/plist/index'
import plistInfo from '../page/plist/plistInfo'

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
    },
    {
      path: '/plist',
      name: 'plist',
      component: pList
    },
    {
      path: '/plist/info/:id',
      name: 'plistInfo',
      component: plistInfo
    }
  ]
})
