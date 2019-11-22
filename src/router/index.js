import Vue from 'vue'
import VueRouter from 'vue-router'
// import Table from "../components/Table";
import Home from "../views/Home";
import About from "../views/About";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            component: About
        },
    ]
});
