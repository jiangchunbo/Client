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

    .wic-container {
        background-color: white;
        margin: 20px;
        border-radius: 3px;
        box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
    }

    .wic-container-header {
        border-bottom: 1px solid rgba(0,0,0,.125);
    }

    .wic-container-title {
        display: block;
        height: 50px;
        float: left;
        margin-left: 20px;
        line-height: 50px;
        color: #3c2529;
        font-size: 1.1rem;
    }



    .button-wrapper {
        padding-bottom: 15px;
        margin-left: 20px;
        float: left;
    }
</style>
