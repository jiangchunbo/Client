<template>
    <el-menu class="el-menu-demo" mode="vertical" background-color="#f0ecf9" text-color="#b3afbb"
             active-text-color="#666">
        <el-menu-item index="1">菜单1</el-menu-item>
        <el-menu-item index="2">菜单2</el-menu-item>
        <el-menu-item index="3">菜单3</el-menu-item>
    </el-menu>

</template>

<script>
    import logo from '../assets/logo.png'

    export default {
        name: "Menu",
        data: function () {
            return {
                logo,
            }
        }
    }
</script>

<style scoped>
    .el-menu-item:hover {
        background-color: #d4d0e0 !important
    }
</style>