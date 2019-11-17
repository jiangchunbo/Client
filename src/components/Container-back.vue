<template>
    <el-container id="container">
        <el-aside width="200px">
            <Menu></Menu>
        </el-aside>
        <el-main>
            <Table ref="table"></Table>
        </el-main>
    </el-container>
</template>

<script>

    import Menu from "@/components/Menu";
    import Table from '@/components/Table';
    import logo from '../assets/logo.png'
    export default {
        data: function() {
            return {
                logo
            }
        },
        components: {
            Menu, Table
        },
        mounted() {
            window.console.log(document.documentElement.clientHeight);
            document.getElementById('container').style.height = document.documentElement.clientHeight + 'px';

            this.$refs.table.refresh();
        }

    }
</script>

<style scoped>

    .el-container>.el-aside {
        background-color: #f0ecf9;
        color: #333;
        text-align: center;
        line-height: 500px;
    }

    .el-container>.el-main {
        color: #333;
        text-align: center;
    }
</style>