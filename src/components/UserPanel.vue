<template>
    <el-container>
        <el-header style="text-align: left; font-size: 12px">

            <el-button type="primary" round @click="dialogFormVisible = true">添加新用户</el-button>
            <el-button type="primary" round @click="refresh">刷新权限</el-button>


            <el-dialog title="创建用户" :visible.sync="dialogFormVisible" width="30%">
                <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="用户名" style="width: 100%;">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="选择权限">
                        <el-select v-model="form.authority" placeholder="请选择角色" style="width: 100%;">
                            <el-option label="读写权限" value="读写权限"></el-option>
                            <el-option label="仅读权限" value="仅读权限"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" style="width: 100%;">
                        <el-input :type="passwordType" v-model="form.password">
                            <i slot="suffix" class="el-icon-view" @mouseenter="passwordType = 'text'"
                               @mouseleave="passwordType = 'password'"
                               :style="{color: passwordType === 'password' ? '#c0c4cc' : '#409EFF', marginRight: '5px'}"></i>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createUser">添加</el-button>
                </div>
            </el-dialog>
        </el-header>

        <el-main>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%"
                    highlight-current-row
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(f, f, f, 0.1)"
                    @row-click="clickHandler">

                <el-table-column
                        v-for="(value, index) in columnList"
                        :key="index"
                        :property="value.property"
                        :label="value.label">
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200px">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="editHandler(scope.$index, scope.row)">编辑
                        </el-button>

                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteHandler(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import ajax from "@/util/ajax";

    export default {
        name: "UserPanel",
        data() {
            let validateUsername = (rule, value, callback) => {
                ajax.post('/dba/user', {
                    username: value,
                    password: this.form.password,
                    authority: this.form.authority
                }).then((message) => {
                    callback(message.request.response)
                }).catch((error) => {
                    window.console.log(error);
                    callback(error);
                }).finally();
            };
            return {
                dialogFormVisible: false,
                passwordType: 'password',
                form: {
                    username: '',
                    password: '',
                    authority: ''
                },
                tableData: [
                    {'username': '张三', 'authority': '读写权限'},
                    {'username': '李四', 'authority': '仅写权限'},
                ],
                columnList: [
                    {'property': 'username', 'label': '用户名'},
                    {'property': 'authority', 'label': '权限'}
                ],
                loading: false,
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            editHandler(index, row) {
                window.console.log(index);
                window.console.log(row);
            },
            deleteHandler() {

            },
            clickHandler(row, column, event) {
                window.console.log('被电击');
                window.console.log(row);
                window.console.log(column);
                window.console.log(event);
            },

            createUser() {
                ajax.post('/sys/user', {
                    username: this.form.username,
                    password: this.form.password,
                    authority: this.form.authority
                }).then((message) => {
                    this.$message.success(message.request.response);
                }).catch((error) => {
                    this.$message.error('创建失败, ' + error.request.response);
                }).finally(() => {

                });
            },


            refresh() {
                ajax.get('/sys/user', {
                    page: 1,
                    limit: 10
                }).then((message) => {
                    this.$message.success(message.request.response);
                }).catch((error) => {
                    this.$message.error(error.request.response);
                }).finally(() => {

                });
            }
        }
    }
</script>

<style scoped>

</style>