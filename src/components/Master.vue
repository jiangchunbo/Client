<template>
    <el-container>
        <el-aside width="150px">
            <Menu></Menu>
        </el-aside>
        <el-main style="background-color: pink;">
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
    .el-container {
        height: 100%;
    }
</style>