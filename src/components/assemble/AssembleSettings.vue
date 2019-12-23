<template>
    <div>
        <el-button size="mini" @click="getStatusOfSlaves(false)" :loading="loading">加载</el-button>
        <el-button size="mini" @click="newSlaveHandler">配置新从库</el-button>
        <el-table :data="tableData" border>
            <el-table-column width="50" type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand" label-width="400px">
                        <el-form-item label="分库 IP (Master_Host)">
                            <span>{{ props.row.Master_Host }}</span>
                        </el-form-item>
                        <el-form-item label="数据库连接用户 (Master_User)">
                            <span>{{ props.row.Master_User }}</span>
                        </el-form-item>
                        <el-form-item label="断开重连间隔, 单位: 秒 (Connect_Retry)">
                            <span>{{ props.row.Connect_Retry }}</span>
                        </el-form-item>
                        <el-form-item label="二进制日志文件 (Master_Log_File)">
                            <span>{{ props.row.Master_Log_File }}</span>
                        </el-form-item>
                        <el-form-item label="二进制日志文件位置 (Master_Log_File)">
                            <span>{{ props.row.Read_Master_Log_Pos }}</span>
                        </el-form-item>
                        <el-form-item label="上一次 IO 线程错误码 (Last_IO_Errno)">
                            <span>{{ props.row.Last_IO_Errno }}</span>
                        </el-form-item>
                        <el-form-item label="上一次 IO 线程错误原因 (Last_IO_Error)">
                            <span>{{ props.row.Last_IO_Error }}</span>
                        </el-form-item>
                        <el-form-item label="上一次 SQL 线程错误码 (Last_SQL_Errno)">
                            <span>{{ props.row.Last_SQL_Errno }}</span>
                        </el-form-item>
                        <el-form-item label="上一次 SQL 线程错误原因 (Last_SQL_Error)">
                            <span>{{ props.row.Last_SQL_Error }}</span>
                        </el-form-item>
                        <el-form-item label="服务器 id (Master_Server_Id)">
                            <span>{{ props.row.Master_Server_Id }}</span>
                        </el-form-item>
                        <el-form-item label="当前 SQL 线程运行状态 (Slave_SQL_Running_State)">
                            <span>{{ props.row.Slave_SQL_Running_State }}</span>
                        </el-form-item>
                        <el-form-item label="上一次 IO 错误时间戳 (Last_IO_Error_Timestamp)">
                            <span>{{ props.row.Last_IO_Error_Timestamp }}</span>
                        </el-form-item>
                        <el-form-item label="通道名 (Channel_Name)">
                            <span>{{ props.row.Channel_Name }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column width="150" label="Master_Host" property ="Master_Host"></el-table-column>
            <el-table-column width="150" label="Connect_Retry" property="Connect_Retry"></el-table-column>
            <el-table-column width="180" label="Slave_IO_Running" property="Slave_IO_Running"></el-table-column>
            <el-table-column width="180" label="Slave_SQL_Running" property="Slave_SQL_Running"></el-table-column>
            <el-table-column width="150" label="Channel_Name" property="Channel_Name"></el-table-column>
            <el-table-column fixed="right" label="操作">

                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="startHandler(scope.row)" :disabled="disabled">启动</el-button>
                    <el-button size="mini" type="danger" @click="stopHandler(scope.row)" :disabled="disabled">停止</el-button>
                    <el-button size="mini" type="danger" @click="removeHandler(scope.row)" :disabled="disabled">移除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新建" :visible.sync="newSlaveFormVisible">
            <el-form :model="newSlaveForm" :rules="newSlaveFormRules" ref="newSlaveForm">
                <el-form-item label="Master_Host" prop="Master_Host">
                    <el-input v-model="newSlaveForm.Master_Host" placeholder="必填, 配置分库的 IP 地址"></el-input>
                </el-form-item>
                <el-form-item label="Master_Port" prop="Master_Port">
                    <el-input v-model="newSlaveForm.Master_Port" placeholder="选填, 配置分库的端口号, 默认 3306 端口"></el-input>
                </el-form-item>
                <el-form-item label="Master_User" prop="Master_User">
                    <el-input v-model="newSlaveForm.Master_User" placeholder="选填, 配置分库的连接用户, 默认 root 用户"></el-input>
                </el-form-item>
                <el-form-item label="Master_Password" prop="Master_Password">
                    <el-input type="password" v-model="newSlaveForm.Master_Password" placeholder="必填, 配置分库的数据库用户连接密码"></el-input>
                </el-form-item>
                <el-form-item label="Connect_Retry" prop="Connect_Retry">
                    <el-input v-model="newSlaveForm.Connect_Retry" placeholder="选填, 配置分库断开连接后, 尝试重连间隔, 默认 60s"></el-input>
                </el-form-item>
                <el-form-item label="Channel_Name" prop="Channel_Name">
                    <el-input v-model="newSlaveForm.Channel_Name" placeholder="必填, 配置分库的通道名称作为唯一标识, 如: yw3, 一旦确认无法修改, 除非移除"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newSlaveFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="newSlaveSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AssembleSettings",
        data() {
            let validateHost = (rule, value, callback) => {
                if(!/^(((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9])\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9]))$/.test(value)) {
                    return callback(new Error('请输入合法的 IP 地址'));
                }
                return callback();
            };
            let validatePort = (rule, value, callback) => {
                if(isNaN(value) || value > 65535 || value < 0) {
                    return callback(new Error('请输入合法的端口号'));
                }
                return callback();
            };
            let validateConnectRetry = (rule, value, callback) => {
                if(isNaN(value)) {
                    return callback(new Error('请输入数字'));
                }
                return callback();
            };
            return {
                loading: false,
                tableData: [],
                disabled: true,
                newSlaveForm: {
                    Master_Host: '',
                    Master_User: '',
                    Master_Port: '',
                    Master_Password: '',
                    Connect_Retry: '',
                    Channel_Name: ''
                },
                newSlaveFormRules: {
                    Master_Host: [
                        { required: true, message: '请输入 IP 地址', trigger: 'blur' },
                        { validator: validateHost, trigger: 'blur' }
                    ],
                    Master_User: [],
                    Master_Port: [
                        { validator: validatePort, trigger: 'blur' }
                    ],
                    Master_Password: [
                        { required: true, message: '请输入用户连接密码', trigger: 'blur' },
                        { min: 4, max: 32, message: '请输入 4 - 32 位密码', trigger: 'blur' }
                    ],
                    Connect_Retry: [
                        { validator: validateConnectRetry, trigger: 'blur' }
        ],
                    Channel_Name: [
                        { required: true, message: '请输入通道名称', trigger: 'blur' }
                    ]
                },
                newSlaveFormVisible: false
            }
        },

        methods: {
            getStatusOfSlaves: function(isCallBack) {
                this.loading = true;
                this.disabled = true;
                this.$ajax.get('/slave/status', {
                }).then((message) => {
                    this.tableData = message.data;
                    if(!isCallBack) {
                        if(this.tableData.length === 0) {
                            this.$message.info('当前汇集系统没有配置任何通道');
                        } else {
                            this.$message.success('获取了 ' + this.tableData.length + ' 条信息');
                        }
                    }
                }).catch(() => {

                }).finally(() => {
                    this.loading = false;
                    this.disabled = false;
                });
            },

            editHandler: function(row) {
                window.console.log(row);
                this.nowSlaveForm.Master_Host = row.Master_Host;
                this.nowSlaveForm.Master_User = row.Master_User;
                this.nowSlaveForm.Master_Port = row.Master_Port;
                this.nowSlaveForm.Connect_Retry = row.Connect_Retry;
                this.nowSlaveForm.Master_Log_File = row.Master_Log_File;
                this.nowSlaveForm.Read_Master_Log_Pos = row.Read_Master_Log_Pos;
                this.nowSlaveForm.Slave_IO_Running = row.Slave_IO_Running;
                this.nowSlaveForm.Slave_SQL_Running = row.Slave_SQL_Running;
                this.nowSlaveForm.Channel_Name = row.Channel_Name;
                this.editFormVisible = true;
            },

            startHandler: function(row) {
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

            stopHandler: function(row) {
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

            removeHandler: function(row) {
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

            newSlaveHandler: function() {
                this.newSlaveFormVisible = true;
            },

            newSlaveSubmit: function() {
                this.disabled = true;
                this.$refs.newSlaveForm.validate((valid) => {
                    if(valid) {
                        this.$ajax.post('/replication/master/change', {
                            master_host: this.newSlaveForm.Master_Host,
                            master_port: this.newSlaveForm.Master_Port === '' ? '3306' : this.newSlaveForm.Master_Port,
                            master_user: this.newSlaveForm.Master_User === '' ? 'root' : this.newSlaveForm.Master_User,
                            master_password: this.newSlaveForm.Master_Password,
                            master_connect_retry: this.newSlaveForm.Connect_Retry === '' ? '60' : this.newSlaveForm.Connect_Retry,
                            channel: this.newSlaveForm.Channel_Name
                        }).then((message) => {
                            this.$message.success(message.data);
                            this.newSlaveFormVisible = false; // 配置成功则关闭对话框
                            this.getStatusOfSlaves(true);
                        }).catch(() => {
                        }).finally(() => {
                            this.disabled = false;
                        });
                    }
                });

            }
        }
    }
</script>

<style>
    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>