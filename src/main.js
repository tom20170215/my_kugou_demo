// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/style/reset.scss'

import {Cell,Navbar,TabItem,Swipe,SwipeItem,Spinner,Range} from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.component(Navbar.name,Navbar);
Vue.component(TabItem.name,TabItem);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Cell.name,Cell);
Vue.component(Spinner.name,Spinner);
Vue.component(Range.name,Range);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
