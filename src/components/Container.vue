<template>
    <el-container id="container">
        <el-header height="80px">
            <NavigationBar></NavigationBar>
        </el-header>

        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import NavigationBar from "./NavigationBar";

    export default {
        components: {
            NavigationBar
        },
        data: function() {
            return {};
        }

    }
</script>

<style scoped>
    .el-header, .el-main {
        padding: 0;
    }

    .el-header {
        box-shadow: 0 0 10px 3px;
        z-index: 1;
    }
</style>