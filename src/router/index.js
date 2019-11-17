import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from "../components/Container";
import Master from '../components/Master'
// import Table from "../components/Table";
import Import from "../components/Import";
import Analysis from "../components/Analysis";
import MasterTagTable from "../components/MasterTagTable";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Container,
            hidden: true,
            redirect: '/master/table',
            children: [
                {
                    path: 'master',
                    component: Master,
                    children: [
                        {
                            path: 'table',
                            component: MasterTagTable
                        },
                        {
                            path: 'import',
                            component: Import
                        },
                        {
                            path: 'analysis',
                            component: Analysis
                        }
                    ]
                }]
        }
    ]
});
