// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import store from './store';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

Vue.use(YDUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
