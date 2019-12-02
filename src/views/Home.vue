<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="150px" style="background-color: #f7f6fb; overflow: hidden">
            <div class="block" style="margin: 20px 0;">
                <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                <div style="margin-top: 10px;" v-if="loggedIn === false">
                    <el-button type="primary" size="mini" round @click="loginFormVisible = true">登录</el-button>
                </div>
                <div v-else>
                    <span>欢迎, {{form.username}}</span>
                </div>

                <el-dialog title="登录" :visible.sync="loginFormVisible">
                    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
                        <el-form-item label="用户名" style="width: 100%;">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" style="width: 100%;">
                            <el-input :type="passwordType" v-model="form.password">
                                <i slot="suffix" class="el-icon-view" @mouseenter="passwordType = 'text'" @mouseleave="passwordType = 'password'" :style="{color: passwordType === 'password' ? '#c0c4cc' : '#409EFF', marginRight: '5px'}"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="loginFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </el-dialog>
            </div>
            <!-- 解析表达式 -->
            <el-menu
                    :default-active="this.$route.path"
                    text-color="#000"
                    unique-opened
                    router>
                <el-menu-item index="/home/user" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户管理</span>
                    </template>
                </el-menu-item>


                <el-submenu index="general" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span slot="title">数据</span>
                    </template>
                    <el-menu-item index="/home/data/weather">海洋状况</el-menu-item>
                </el-submenu>

            </el-menu>
        </el-aside>

        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    // import Import from "@/components/Import";
    // import Analysis from "@/components/Analysis";
    // import Table from "@/components/Table";
    // import TabImage from "@/components/Tab-Image";

    import ajax from "@/util/ajax";

    export default {
        components: {
            // Table, Analysis, Import, TabImage
        },
        data: function () {
            return {
                dataBaseName: 'general',
                tableName: 'weather',
                activeTabName: 'analysis',
                loginFormVisible: false,

                form: {
                    username: '',
                    password: ''
                },
                passwordType: 'password',
                loggedIn: false
            };
        },
        computed: {

        },
        methods: {
            login() {
                ajax.post('/login', {
                   username: this.form.username,
                   password: this.form.password
                }).then((message) => {
                    this.$message.success(message.request.response);
                    this.loggedIn = true;
                    this.loginFormVisible = false;
                }).catch((error) => {
                    this.$message.error(error.request.response);
                }).finally();
            }
        }

    }
</script>

<style scoped>

</style>