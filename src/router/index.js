import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login";
import Home from "@/views/Home";
import BasicQuery from "@/components/basic/BasicQuery";
import AssembleSettings from "@/components/assemble/AssembleSettings";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            hidden: true
        },
        {
            path: '/home',
            name: '主页',
            component: Home,
            hidden: true,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: 'basic',
                    name: '基础',
                    component: BasicQuery
                },
                {
                    path: 'assemble',
                    name: '汇集',
                    component: AssembleSettings
                }
            ]
        }
    ]
});
