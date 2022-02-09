import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from 'common/toast/index.js'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus = new Vue()
//安装toast
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//使用vue懒加载插件
Vue.use(VueLazyload)
new Vue({
  render: h => h(App),
  router, store
}).$mount('#app')
