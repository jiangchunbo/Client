import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'; /* 引入模块 */
import 'element-ui/lib/theme-chalk/index.css'; /* 引入样式文件 */
import router from './router'

Vue.use(ElementUI); /* 使用模块 */
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
