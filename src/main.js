import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import toast from "components/content/toast"
import Fastclick from "fastclick"
import Lazyload from "vue-lazyload"

Vue.config.productionTip = false

//全局实列化 事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

//解决点击延迟300ms问题
Fastclick.attach(document.body)

//安装vue-lazyload
Vue.use(Lazyload,{
  loading: require("./assets/img/common/placeholder.png")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
