<template>
    <el-tabs v-model="tabPane">
        <el-tab-pane label="用户管理" name="first">
            <Table></Table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>

<script>

    import Table from "./Table";

    export default {
        name: "MasterTagTable",
        components: {
            Table
        },
        data: function () {
            return {
                tabPane: 'first'
            }
        }
    }
</script>

<style scoped>

</style>