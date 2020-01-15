<template>
    <el-container style="height: 100%;">
        <el-header height="50px">
            <router-link to="/home" class="logo">数据管理和汇集系统</router-link>
            <nav class="navigation-bar">
<!--                <a href="#" class="sidebar-toggle"><i class="el-icon-menu"></i></a>-->
            </nav>
        </el-header>

        <el-container>
            <el-aside width="230px" class="main-sidebar">
                <div class="user-panel">
                    <h3 class="welcome">{{this.$store.state.role}}, 欢迎</h3>
                    <h5><a class="logout" @click="logoutHandler">点击注销</a></h5>
                </div>
                <el-menu unique-opened router text-color="#b8c7ce"
                         active-text-color="#ffffff" class="sidebar-menu">
                    <el-menu-item v-for="(item, index) in this.$store.state.menus"
                                  :index="item.index" :key="index">
                        <span slot="title">{{item.label}}</span>
                    </el-menu-item>
<!--                    <el-menu-item index="/home/senior">-->
<!--                        <span slot="title">高级数据管理</span>-->
<!--                    </el-menu-item>-->
<!--                    <el-menu-item index="/home/assemble">-->
<!--                        <span slot="title">数据汇集管理</span>-->
<!--                    </el-menu-item>-->
                </el-menu>
            </el-aside>
            <el-container>
                <el-main class="content-wrapper">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
                <el-footer class="main-footer">

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
                    this.$router.replace('/login');
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
    .main-sidebar {
        background-color: #1e282c;
        height: 100%;
    }

    .user-panel {
        background-color: #1e282c;
        padding: 10px;
        margin: 10px;
        border-bottom: 1px solid #4f5962;
        border-top: 1px solid #4f5962
    }

    .welcome {
        color: white;
    }

    .logo {
        width: 200px;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        color: #ffffff;
        background-color: #367fa9;
        text-decoration: none;
        float: left;
        font-weight: bold;
    }

    .navigation-bar {
        margin-left: 230px;
        height: 50px;
        background-color: #3c8dbc;
    }

    .content-wrapper {
        background-color: #f4f6f9;
    }

    .main-footer {
        background-color: white;
    }

    .sidebar-toggle {
        display: inline-block;
        width: 30px;
        height: 50px;
        line-height: 50px;
        float: left;
        color: #ffffff;
        background-color: #3c8dbc;
        transition: 0.6s;
    }

    .sidebar-toggle:hover {
        background-color: #367fa9;
        transition: 0.6s;
    }

    .sidebar-menu {
        background-color: #222d32;
        border: none;
    }

    .el-menu-item:focus, .el-menu-item:hover {
        background-color: #1e282c;
        border-left: solid 3px #3c8dbc;
    }

    .logout {
        color: white;
        cursor: pointer;
    }

    .logout:hover {
        color: #3a8ee6;
    }

    .logo:hover {
        color: #99a9bf;
        transition: 0.3s;
    }
</style>