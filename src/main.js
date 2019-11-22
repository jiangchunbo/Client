import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'; /* 引入模块 */
import 'element-ui/lib/theme-chalk/index.css'; /* 引入样式文件 */
import router from './router'

Vue.use(ElementUI); /* 使用模块 */
Vue.config.productionTip = false;


Vue.prototype.master = {
    weather: {
        properties: {
            id: {alias: '标识符'},
            temperature: {alias: '温度'},
            humidity: {alias: '湿度'},
            pressure: {alias: '气压'},
            gmt_create: {alias: '创建日期'},
            gmt_modified: {alias: '修改日期'}
        },
        checkList: [
            'id', 'temperature', 'humidity', 'pressure', 'gmt_create', 'gmt_modified'
        ]
    },
    ocean: {
        properties: {
            id: {alias: '标识符'},
            temperature: {alias: '温度'},
            salinity: {alias: '盐度'},
            density: {alias: '密度'},
            gmt_create: {alias: '创建日期'},
            gmt_modified: {alias: '修改日期'}
        },
        checkList: [
            'id', 'temperature', 'salinity', 'density', 'gmt_create', 'gmt_modified'
        ]
    }
};

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
