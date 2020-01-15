<template>
    <el-table :data="data" border>
        <el-table-column label="ID" prop="id" v-if="false"></el-table-column>
        <el-table-column label="时间" prop="createTime"></el-table-column>
        <el-table-column label="设备" prop="baseDO.equipmentType"></el-table-column>
        <el-table-column label="GPS 经度" prop="gpsL"></el-table-column>
        <el-table-column label="GPS 纬度" prop="gpsB"></el-table-column>
        <el-table-column label="GPS 高程" prop="gpsB"></el-table-column>
        <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editHandler(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteHandler(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        <basic-edit-dialog ref="basic-edit-dialog"></basic-edit-dialog>
    </el-table>
</template>

<script>
    import BasicEditDialog from "@/pages/basic/basic-edit-dialog";
    export default {
        name: "basic-table",
        components: {BasicEditDialog},
        data() {
            return {
                data: []
            }
        },

        methods: {
            editHandler() {

            },


            deleteHandler(row) {
                this.$confirm('此操作将永久删除数据库中的该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteSubmit(row.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            deleteSubmit(id) {
                this.$message.warning('id = ' + id);
                this.$ajax.delete(`/admin/ins/${id}`, {

                }).then((message) => {
                    this.$message.success(message);
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>

</style>