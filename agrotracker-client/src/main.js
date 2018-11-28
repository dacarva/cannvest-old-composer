import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false;
Vue.use(axios);
// Vue.use(VueSocketIO, "http://localhost:3000");

import Default from "@/layouts/Default.vue";
Vue.component("default-layout", Default);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
