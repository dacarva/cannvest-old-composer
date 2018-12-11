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

import countryCodes from '@/countryCodes.js';

// Layouts
import Default from '@/layouts/Default.vue';

ShardsVue.install(Vue);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
// Vue.prototype.$hyperledgerApiUrl = 'http://localhost:3000/api/';
Vue.prototype.$hyperledgerApiUrl = 'http://35.226.96.132/api/';

Vue.prototype.$hyperledgerApiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
  }
};
Vue.prototype.$ipfs = window.IpfsHttpClient('localhost', '5001');
Vue.prototype.$ipfsGateway = 'http://localhost:8080/ipfs/';
Vue.prototype.$countryCodes = countryCodes;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
