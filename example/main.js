import Vue from 'vue';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import VueRouter from 'vue-router';
import routersConfig from './routers';
import App from './App';
import Vuego from '../src/index';

Vue.use(VueRouter);
Vue.use(Vuego);

const router = new VueRouter(routersConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
