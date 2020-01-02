<template>
    <el-table :data="data" border>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="table-expand">
                    <el-form-item label="时间"><span>{{ props.row.time }}</span></el-form-item>
                    <el-form-item label="设备类型"><span>{{ props.row.equipment }}</span></el-form-item>
                    <el-form-item label="状态码"><span>{{ props.row.status }}</span></el-form-item>
                    <el-form-item label="GPS 经度"><span>{{ props.row.gps_l }}</span></el-form-item>
                    <el-form-item label="GPS 纬度"><span>{{ props.row.gps_b }}</span></el-form-item>
                    <el-form-item label="GPS 高程"><span>{{ props.row.gps_h }}</span></el-form-item>
                    <el-form-item label="GPS 速度"><span>{{ props.row.gps_v }}</span></el-form-item>
                    <el-form-item label="GPS 东向速度"><span>{{ props.row.gps_v }}</span></el-form-item>
                    <el-form-item label="GPS 北向速度"><span>{{ props.row.gps_v }}</span></el-form-item>
                    <el-form-item label="GPS 天向速度"><span>{{ props.row.gps_v }}</span></el-form-item>
                    <el-form-item label="惯导经度"><span>{{ props.row.gps_v }}</span></el-form-item>
                    <el-form-item label="惯导纬度"><span>{{ props.row.gps_v }}</span></el-form-item>
                    <el-form-item label="惯导纵摇"></el-form-item>
                    <el-form-item label="惯导横摇"></el-form-item>
                    <el-form-item label="惯导航向"></el-form-item>
                    <el-form-item label="惯导东向速度"></el-form-item>
                    <el-form-item label="惯导北向速度"></el-form-item>
                    <el-form-item label="惯导天向速度"></el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="时间" prop="time"></el-table-column>
        <el-table-column label="设备" prop="equipment"></el-table-column>
        <el-table-column label="GPS 经度" prop="gps_l"></el-table-column>
        <el-table-column label="GPS 纬度" prop="gps_b"></el-table-column>
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
                data: [
                    {
                        time: '2019/12/24 13:07:54:846',
                        equipment: 'USB',
                        status: '15.000000000',
                        gps_l: '16.56454315',
                        gps_b: '54.55615665',
                        gps_h: '54546.54654654',
                        gps_v: '',
                        gps_veast: ''
                    }
                ]
            }
        },

        methods: {
            editHandler() {

            },


            deleteHandler() {
                this.$confirm('此操作将永久删除数据库中的该条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>