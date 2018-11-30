/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';
import 'vue2-dropzone/dist/vue2Dropzone.css'


// Core
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Layouts
import Default from '@/layouts/Default.vue';

ShardsVue.install(Vue);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
Vue.prototype.$hyperledgerApiUrl = 'http://localhost:3000/api/';
Vue.prototype.$hyperledgerApiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
  }
};

// Vue.use(axios);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
