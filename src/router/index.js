import Vue from 'vue'
import VueRouter from 'vue-router'
import UserPanel from "../components/user/UserPanel";
import Home from "../views/Home";
import DataPanel01 from "../components/style01/DataPanel";
import DataPanel02 from "../components/style02/DataPanel";
import DataPanel03 from "../components/style03/DataPanel";
import DataPanel04 from "../components/style04/DataPanel";
import DataPanel05 from "@/components/style05/DataPanel05";

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
                    path: 'data/style01',
                    component: DataPanel01
                },
                {
                    path: 'data/style02',
                    component: DataPanel02
                },
                {
                    path: 'data/style03',
                    component: DataPanel03
                },
                {
                    path: 'data/style04',
                    component: DataPanel04
                },
                {
                    path: 'data/style05',
                    component: DataPanel05
                }
            ]
        }
    ]
});
