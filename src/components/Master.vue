<template>
    <el-container id="container">
        <el-aside width="150px" id="aside">
            <Menu></Menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import Menu from "./Menu";

    export default {
        name: "Master",
        components: {
            Menu
        }
    }
</script>

<style scoped>
    .el-aside {
        border-right: 1px solid #DDDDDD;
    }

    ul {
        border-right: 0;
    }
</style>