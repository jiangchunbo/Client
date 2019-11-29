<template>
    <div id="app">
        <el-container style="height: 100%;">
            <el-header class="header" height="80px">
                <NavigationBar></NavigationBar>
            </el-header>

            <el-main style="padding: 20px 0">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import NavigationBar from "./components/NavigationBar";

    export default {
        name: 'app',
        data: function() {
            return {};
        },
        components: {
            NavigationBar
        }
    }
</script>

<style>
    #app {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin: 0;
        height: 100%;
    }


    .header {
        display: flex;
        justify-content: center;
        box-shadow: 0 0 10px 5px;
    }
</style>
