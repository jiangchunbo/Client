<template>
    <el-container id="container">
        <el-header>
            <NavigationBar></NavigationBar>
        </el-header>

        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import NavigationBar from "./NavigationBar";
    import logo from '../assets/logo.png'

    export default {
        components: {
            NavigationBar
        },
        data: function() {
            return {
                logo,
                activeName: 'first'
            }
        },
        mounted() {
            window.console.log(document.documentElement.clientHeight);
            document.getElementById('container').style.height = document.documentElement.clientHeight + 'px';
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