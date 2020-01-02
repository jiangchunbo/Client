<template>
    <el-container>
        <el-header style="background-color: #3a8ee6">
            header
        </el-header>

        <el-container>
            <el-aside width="180px">
                <el-menu unique-opened router style="background-color: #8cc5ff; overflow: hidden; height: 100%;">
                    <el-menu-item index="/home/basic">
                        <span slot="title">基础数据管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/senior">
                        <span slot="title">高级数据管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/assemble">
                        <span slot="title">数据汇集管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main style="background-color: #99a9bf">
                    <router-view></router-view>
                </el-main>
                <el-footer style="background-color: #c2e7b0">
                    footer
                </el-footer>
            </el-container>
        </el-container>


    </el-container>
</template>

<script>

    import ajax from "@/util/ajax";

    export default {
        data: function () {
            return {
                form: {}
            };
        },
        computed: {},
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

        // beforeRouteEnter: (to, from, next) => {
        //     if(this.$store.state.token !== 'login') {
        //         this.$message.warning('权限不足, 请先登录');
        //     }
        // }
    }
</script>

<style scoped>

</style>