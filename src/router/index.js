import Vue from 'vue'
import VueRouter from 'vue-router'
import UserPanel from "../components/UserPanel";
import Home from "../views/Home";
import DataPanel from "../components/DataPanel";


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {
                    path: 'user',
                    component: UserPanel
                },
                {
                    path: 'data/weather',
                    component: DataPanel
                }
            ]
        }
    ]
});
