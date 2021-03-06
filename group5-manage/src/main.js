// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs';
Vue.prototype.qs = qs;
Vue.use(ElementUI);
Vue.config.productionTip = false
// Vue.prototype.apiServer = 'http://47.101.51.245:8888'
Vue.prototype.apiServer = 'http://localhost:8888'
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
