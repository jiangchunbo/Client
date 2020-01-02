<template>
    <el-dialog title="编辑数据" :visible.sync="dialogFormVisible">
        <el-form :model="form">

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "edit-basic-dialog",
        data() {
            return {
                dialogFormVisible: false,
                form: {

                }
            }
        },

        methods: {

        }
    }
</script>

<style scoped>

</style>