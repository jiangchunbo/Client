<template>
    <div id="app">
        <el-container style="height: 100%;">
            <el-main style="padding: 0">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data: function() {
            return {};
        },
        components: {
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
</style>
