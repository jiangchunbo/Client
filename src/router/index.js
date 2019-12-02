import Vue from 'vue'
import VueRouter from 'vue-router'
// import Table from "../components/Table";
import Home from "../views/Home";
import About from "../views/About";
import UserPanel from "@/components/UserPanel";
// import Table from "@/components/Table";

Vue.use(VueRouter);

/* 嵌套路由开头不能加 '/' */
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'user',
                    component: UserPanel
                }
            ]
        },
        {
            path: '/about',
            component: About
        },
    ]
});
