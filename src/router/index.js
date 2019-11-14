import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from "@/components/Container";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Container,
            hidden: true
        }
    ]
});
