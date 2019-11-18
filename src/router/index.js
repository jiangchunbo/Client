import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from "../components/Container";
import Master from '../components/Master'
// import Table from "../components/Table";
import Import from "../components/Import";
import Analysis from "../components/Analysis";
import MasterTagTable from "../components/TablePanel";
import TablePanel from "@/components/TablePanel";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Container,
            hidden: true,
            redirect: '/master/weather',
            children: [
                {
                    path: 'master',
                    component: Master,
                    children: [
                        {
                            path: 'weather',
                            component: TablePanel
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
                },
                {
                    path: 'slave1',
                    component: Master,
                    children: [
                        {
                            path: 'weather',
                            component: TablePanel
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
                },
                {
                    path: 'slave2',
                    component: Master,
                    children: [
                        {
                            path: 'weather',
                            component: TablePanel
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
                },
                {
                    path: 'slave3',
                    component: Master,
                    children: [
                        {
                            path: 'weather',
                            component: TablePanel
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
                },
                {
                    path: 'slave4',
                    component: Master,
                    children: [
                        {
                            path: 'weather',
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
