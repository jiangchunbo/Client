<template>
<el-container class="wic-container">
    <el-header height="50px" class="wic-container-header">
        <span class="wic-container-title">数据汇集管理</span>
    </el-header>
    <el-main>
        <div class="button-wrapper" style="padding-top: 15px;">
            <el-button size="small" type="primary" @click="getStatusOfSlaves(false)" :loading="loading">获取最新信息</el-button>
            <el-button size="small" type="primary" @click="createSlaveHandler()">配置新从库</el-button>
            <create-slave-dialog ref="create-slave-dialog"></create-slave-dialog>
        </div>
        <div style="width: 98%; margin: 1%;">
            <el-table border :data="tableData">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form inline class="table-expand">
                            <el-form-item label="分库 IP (Master_Host)"><span>{{ props.row.Master_Host }}</span></el-form-item>
                            <el-form-item label="数据库连接用户 (Master_User)"><span>{{ props.row.Master_User }}</span></el-form-item>
                            <el-form-item label="断开重连间隔, 单位: 秒 (Connect_Retry)"><span>{{ props.row.Connect_Retry }}</span></el-form-item>
                            <el-form-item label="二进制日志文件 (Master_Log_File)"><span>{{ props.row.Master_Log_File }}</span></el-form-item>
                            <el-form-item label="二进制日志文件位置 (Master_Log_File)"><span>{{ props.row.Read_Master_Log_Pos }}</span></el-form-item>
                            <el-form-item label="上一次 IO 线程错误码 (Last_IO_Errno)"><span>{{ props.row.Last_IO_Errno }}</span></el-form-item>
                            <el-form-item label="上一次 IO 线程错误原因 (Last_IO_Error)"><span>{{ props.row.Last_IO_Error }}</span></el-form-item>
                            <el-form-item label="上一次 SQL 线程错误码 (Last_SQL_Errno)"><span>{{ props.row.Last_SQL_Errno }}</span></el-form-item>
                            <el-form-item label="上一次 SQL 线程错误原因 (Last_SQL_Error)"><span>{{ props.row.Last_SQL_Error }}</span></el-form-item>
                            <el-form-item label="服务器 id (Master_Server_Id)"><span>{{ props.row.Master_Server_Id }}</span></el-form-item>
                            <el-form-item label="当前 SQL 线程运行状态 (Slave_SQL_Running_State)"><span>{{ props.row.Slave_SQL_Running_State }}</span></el-form-item>
                            <el-form-item label="上一次 IO 错误时间戳 (Last_IO_Error_Timestamp)"><span>{{ props.row.Last_IO_Error_Timestamp }}</span></el-form-item>
                            <el-form-item label="通道名 (Channel_Name)"><span>{{ props.row.Channel_Name }}</span></el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="Master_Host" property="Master_Host"></el-table-column>
                <el-table-column label="Connect_Retry" property="Connect_Retry"></el-table-column>
                <el-table-column label="Slave_IO_Running" property="Slave_IO_Running"></el-table-column>
                <el-table-column label="Slave_SQL_Running" property="Slave_SQL_Running"></el-table-column>
                <el-table-column label="Channel_Name" property="Channel_Name"></el-table-column>
                <el-table-column fixed="right" label="操作">

                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="startHandler(scope.row)" :disabled="disabled">启动</el-button>
                        <el-button size="mini" type="danger" @click="stopHandler(scope.row)" :disabled="disabled">停止</el-button>
                        <el-button size="mini" type="danger" @click="removeHandler(scope.row)" :disabled="disabled">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-main>
</el-container>
</template>

<script>
    import CreateSlaveDialog from "@/components/create-slave-dialog";

    export default {
        name: "AssembleSettings",
        components: {CreateSlaveDialog},
        data() {
            return {
                loading: false,
                tableData: [],
                disabled: true
            }
        },

        methods: {
            getStatusOfSlaves: function (isCallBack) {
                this.loading = true;
                this.disabled = true;
                this.$ajax.get('/slave/status', {}).then((message) => {
                    this.tableData = message.data;
                    if (!isCallBack) {
                        if (this.tableData.length === 0) {
                            this.$message.info('当前汇集系统没有配置任何通道');
                        } else {
                            this.$message.success('获取了 ' + this.tableData.length + ' 条信息');
                        }
                    }
                }).catch(() => {
                    this.$message.error('出错了哦');
                }).finally(() => {
                    this.loading = false;
                    this.disabled = false;
                });
            },

            startHandler: function (row) {
                this.disabled = true;
                this.$ajax.get('/replication/slave/start', {
                    channel: row.Channel_Name
                }).then((message) => {
                    this.$message.success(message.data);
                    this.getStatusOfSlaves(true);
                }).catch(() => {
                }).finally(() => {
                    this.disabled = false;
                });
            },

            stopHandler: function (row) {
                this.disabled = true;
                this.$ajax.get('/replication/slave/stop', {
                    channel: row.Channel_Name
                }).then((message) => {
                    this.$message.success(message.data);
                    this.getStatusOfSlaves(true);
                }).catch(() => {

                }).finally(() => {
                    this.disabled = false;
                });
            },

            removeHandler: function (row) {
                this.disabled = true;
                this.$confirm('您确定要移除吗? 这有可能导致汇集过程中数据的丢失! 请先确保所有数据汇集完毕!', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.disabled = true;
                    this.$ajax.post('/replication/slave/reset', {
                        channel: row.Channel_Name
                    }).then((message) => {
                        this.$message.success(message.data);
                        this.getStatusOfSlaves(true);
                    }).catch(() => {
                    }).finally(() => {

                    });
                }).catch(() => {
                    this.$message.info('已取消移除');
                }).finally(() => {
                    this.disabled = false;
                });
            },

            createSlaveHandler() {
                this.$refs['create-slave-dialog'].dialogFormVisible = true;
            }
        }
    }
</script>

<style scoped>
</style>