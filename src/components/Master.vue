<template>
    <el-container id="container">
        <el-aside width="150px" id="aside">
            <Menu></Menu>
        </el-aside>
        <el-main>
            <Tab></Tab>
        </el-main>
    </el-container>
</template>

<script>
    import Menu from "./Menu";
    import Tab from "./Main";

    export default {
        name: "Master",
        components: {
            Menu, Tab
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