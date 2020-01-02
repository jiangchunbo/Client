<template>
    <el-dialog title="新建" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="newSlaveForm">
            <el-form-item label="Master_Host" prop="Master_Host">
                <el-input v-model="form.Master_Host" placeholder="必填, 配置分库的 IP 地址"></el-input>
            </el-form-item>
            <el-form-item label="Master_Port" prop="Master_Port">
                <el-input v-model="form.Master_Port" placeholder="选填, 配置分库的端口号, 默认 3306 端口"></el-input>
            </el-form-item>
            <el-form-item label="Master_User" prop="Master_User">
                <el-input v-model="form.Master_User" placeholder="选填, 配置分库的连接用户, 默认 root 用户"></el-input>
            </el-form-item>
            <el-form-item label="Master_Password" prop="Master_Password">
                <el-input type="password" v-model="form.Master_Password"
                          placeholder="必填, 配置分库的数据库用户连接密码"></el-input>
            </el-form-item>
            <el-form-item label="Connect_Retry" prop="Connect_Retry">
                <el-input v-model="form.Connect_Retry"
                          placeholder="选填, 配置分库断开连接后, 尝试重连间隔, 默认 60s"></el-input>
            </el-form-item>
            <el-form-item label="Channel_Name" prop="Channel_Name">
                <el-input v-model="form.Channel_Name"
                          placeholder="必填, 配置分库的通道名称作为唯一标识, 如: yw3, 一旦确认无法修改, 除非移除"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="newSlaveFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createSlaveSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {validateHost, validatePort, validateConnectRetry} from "@/util/validation";

    export default {
        name: "create-slave-dialog",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    Master_Host: '',
                    Master_User: '',
                    Master_Port: '',
                    Master_Password: '',
                    Connect_Retry: '',
                    Channel_Name: ''
                },
                rules: {
                    Master_Host: [
                        {required: true, message: '请输入 IP 地址', trigger: 'blur'},
                        {validator: validateHost, trigger: 'blur'}
                    ],
                    Master_User: [],
                    Master_Port: [
                        {validator: validatePort, trigger: 'blur'}
                    ],
                    Master_Password: [
                        {required: true, message: '请输入用户连接密码', trigger: 'blur'},
                        {min: 4, max: 32, message: '请输入 4 - 32 位密码', trigger: 'blur'}
                    ],
                    Connect_Retry: [
                        {validator: validateConnectRetry, trigger: 'blur'}
                    ],
                    Channel_Name: [
                        {required: true, message: '请输入通道名称', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            createSlaveSubmit() {
                this.$refs.newSlaveForm.validate((valid) => {
                    if (valid) {
                        this.$ajax.post('/replication/master/change', {
                            host: this.form.Master_Host,
                            port: this.form.Master_Port === '' ? '3306' : this.form.Master_Port,
                            user: this.form.Master_User === '' ? 'root' : this.form.Master_User,
                            password: this.form.Master_Password,
                            connectRetry: this.form.Connect_Retry === '' ? '60' : this.form.Connect_Retry,
                            channelName: this.form.Channel_Name
                        }).then((message) => {
                            this.$message.success(message.data);
                            this.dialogFormVisible = false; // 配置成功则关闭对话框
                            this.getStatusOfSlaves(true);
                        }).catch(() => {
                        }).finally(() => {

                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>