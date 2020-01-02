<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

</script>

<style>
    #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin: 0;
        height: 100%;
    }


    .el-container, .el-header, .el-aside, .el-footer, .el-main {
        padding: 0 !important;
    }

    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 200px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>
