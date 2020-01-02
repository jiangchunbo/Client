<template>
    <el-container>
        <el-header height="200px">
            <basic-query-form></basic-query-form>
            <el-button type="primary" @click="createHandler">添加数据</el-button>
        </el-header>
        <el-main>
            <el-container style="border: 1px solid #000">
                <el-header>
                    <h3>表名</h3>
                </el-header>
                <el-main>
                    <basic-table ref="basic-table"></basic-table>
                </el-main>
            </el-container>
        </el-main>
        <el-footer>
            <basic-create-dialog ref="basic-create-dialog"></basic-create-dialog>
        </el-footer>
    </el-container>
</template>

<script>
    import BasicQueryForm from "@/pages/basic/basic-query-form";
    import BasicTable from "@/pages/basic/basic-table";
    import BasicCreateDialog from '@/pages/basic/basic-create-dialog'

    export default {
        components: {BasicTable, BasicQueryForm, BasicCreateDialog},
        data() {
            return {}
        },

        methods: {
            createHandler() {
                this.$refs['basic-create-dialog'].dialogFormVisible = true;
            }
        }
    }
</script>

<style scoped>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>