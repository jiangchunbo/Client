<template>
    <el-form :model="form" :rules="rules">
        <h3>系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="form.username" autocomplete="off" placeholder="在此输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="在此输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginHandler">登录</el-button>
            <el-button type="primary" @click="anonymousHandler">匿名</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: { username: 'admin', password: '123' },
                rules: {
                    username: [
                        {
                            required: true, message: '请输入用户名', trigger: 'blur'
                        },
                    ],
                    password: [
                        {
                            required: true, message: '请输入密码', trigger: 'blur'
                        }
                    ]
                },
                loading: false
            }
        },

        methods: {
            loginHandler: function() {
                this.loading = true;
                this.loginSubmit();
            },

            loginSubmit: function() {
                this.$ajax.post('/login', {
                    'username': this.form.username,
                    'password': this.form.password
                }).then((message) => {
                    this.$message.success(message.data.message);
                    this.loading = false;
                    this.$store.commit('refreshUser', {
                        role: message.data.roleZh,
                        menus: message.data.menus
                    });
                    this.$router.replace({path: '/home'});
                })
            },

            anonymousHandler: function() {

                this.$store.commit('refreshUser', {
                    role: 'anonymous',
                    menus: ['basic']
                });
                this.$router.replace({path: '/home'});
            }
        }
    }
</script>

<style scoped>

</style>