<template>
    <el-form :model="loginForm" :rules="rules">
        <h3>系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="在此输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="在此输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginHandler">登录</el-button>
            <el-button type="primary">匿名</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
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
                checked: true,
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                loading: false
            }
        },

        methods: {
            loginHandler: function() {
                this.loading = true;

                // 模拟登录过程

                this.loading = false;
                // this.$store.commit();
                this.$router.replace({path: '/home'});
            }
        }
    }
</script>

<style scoped>

</style>