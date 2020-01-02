import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import login from "@/pages/login/login";
import home from "@/pages/home/home";
import basic from "@/pages/basic/basic";
import senior from "@/pages/senior/senior";
import assemble from "@/pages/assemble/assemble";


Vue.use(VueRouter);

const instance = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: login,
            hidden: true
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            hidden: true,
            children: [
                {
                    path: 'basic',
                    name: 'basic',
                    component: basic,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: 'senior',
                    name: 'senior',
                    component: senior,
                    meta: {
                        title: '高级数据管理',
                        requireAuth: true
                    },
                },
                {
                    path: 'assemble',
                    name: 'assemble',
                    component: assemble,
                    meta: {
                        title: '汇集系统管理',
                        requireAuth: true
                    }
                }
            ]
        }
    ]
});

instance.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && store.state.role === 'anonymous') {
        next('/login');
        ElementUI.Message.warning('匿名用户禁止访问, 请先登录');
    } else {
        window.document.title = to.meta.title;
        next();
    }

});

export default instance;
