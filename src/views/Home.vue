<template>
    <div>
        <el-container>
            <el-header class="home-header"></el-header>
            <el-container>
                <el-aside width="180px">
                    <div>
                        <el-menu unique-opened router>
                            <el-menu-item index="/home/basic">
                                <span slot="title">基础数据查询</span>
                            </el-menu-item>
                            <el-menu-item index="">
                                <span slot="title">基础数据管理</span>
                            </el-menu-item>
                            <el-menu-item index="">
                                <span slot="title">高级数据查询</span>
                            </el-menu-item>
                            <el-menu-item index="">
                                <span slot="title">高级数据分析</span>
                            </el-menu-item>
                            <el-menu-item index="/home/assemble">
                                <span slot="title">数据汇集管理</span>
                            </el-menu-item>
                        </el-menu>
                    </div>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
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
                    username: '匿名',
                    password: ''
                },
                passwordType: 'password',
                loggedIn: true,
                menus: ['user', 'data']
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
                    this.$message.success("登录成功");
                    this.loggedIn = true;
                    this.loginFormVisible = false;

                    this.menus = JSON.parse(message.request.response);
                }).catch((error) => {
                    this.$message.error(error.request.response);
                }).finally();
            },

            logoutHandler() {
                ajax.post('/logout', {}).then(() => {
                    this.$message.success("注销成功");
                    this.loggedIn = false;
                }).catch((error) => {
                    this.$message.error(error.request.response);
                }).finally();
            }
        }

    }
</script>

<style scoped>

</style>