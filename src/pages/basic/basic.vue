<template>
    <el-container class="wic-container">
        <el-header class="wic-container-header" height="50px">
            <span class="wic-container-title">基础数据管理</span>
            <basic-create-dialog ref="basic-create-dialog"></basic-create-dialog>
        </el-header>
        <el-main>
            <basic-query-form ref="query-form" class="query-form"></basic-query-form>
            <div class="button-wrapper">
                <el-button size="small" type="primary" @click="queryHandler">筛选查询</el-button>
                <el-button size="small" type="primary" @click="createHandler">添加数据</el-button>
                <el-button size="small" type="primary" @click="createHandler">删除所选范围的数据</el-button>
            </div>
            <div style="width: 98%; margin: 1%;">
                <basic-table ref="basic-table"></basic-table>
            </div>
        </el-main>
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

            queryHandler() {
                this.$ajax.get('/ins', {
                    'equipment-type': this.$refs['query-form'].equipmentType,
                    'start-date': this.$refs['query-form'].dateInterval[0],
                    'end-date': this.$refs['query-form'].dateInterval[1],
                    'start-gps-l': this.$refs['query-form'].gpsLInterval[0],
                    'end-gps-l': this.$refs['query-form'].gpsLInterval[1],
                    'start-gps-b': this.$refs['query-form'].gpsBInterval[0],
                    'end-gps-b': this.$refs['query-form'].gpsBInterval[1]
                }).then((message) => {
                    this.$refs['basic-table'].data = message.data;
                });
            },

            createHandler() {
                this.$refs['basic-create-dialog'].dialogFormVisible = true;
            }
        }
    }
</script>

<style scoped>
    .query-form {
        padding-top: 15px;
        margin-left: 30px;
        text-align: left;
    }
</style>