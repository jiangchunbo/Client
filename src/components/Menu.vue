<template>
    <el-menu
            class="el-menu-demo"
            mode="vertical"
            router
            default-active="/master/weather">

        <el-menu-item index="/master/weather">
            <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>数据操作</span>
            </template>
        </el-menu-item>

        <el-menu-item index="/master/analysis">
            <template slot="title">
                <i class="el-icon-coin"></i>
                <span>数据分析</span>
            </template>
        </el-menu-item>

        <el-menu-item index="/master/import">
            <template slot="title">
                <i class="el-icon-document-add"></i>
                <span>数据导入</span>
            </template>
        </el-menu-item>
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

    li {
        padding: 0 !important;
    }


</style>