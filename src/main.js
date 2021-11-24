import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import '../public/css/iconfont.css' //字体图标
import 'ant-design-vue/dist/antd.min.css';
import './assets/css/style.css'
import func from './assets/js/func'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)
Vue.use(antd);
Vue.use(VueCookies);
Vue.use(func)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
