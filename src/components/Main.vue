<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据" name="first">
            <Table></Table>
        </el-tab-pane>
        <el-tab-pane label="分析" name="second">
            <Analysis></Analysis>
        </el-tab-pane>
        <el-tab-pane label="导入" name="third">
            <Import></Import>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Table from "./Table";
    import Analysis from "./Analysis";
    import Import from "./Import";
    export default {
        name: "Tab",
        components: {
            Analysis, Table, Import
        },
        data: () => {
            return {
                activeName: 'first'
            }
        }
    }
</script>

<style scoped>

</style>