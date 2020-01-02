import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'; /* 引入模块 */
import echarts from 'echarts'
/* 引入样式文件 */
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'

/* 自定义的 ajax 工具 */
import ajax from "@/util/ajax";


Vue.use(ElementUI); /* 使用模块 */
Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.$ajax = ajax;



export default new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
