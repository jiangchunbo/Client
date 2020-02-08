<template>
    <el-form :model="form" :rules="rules" class="wic-form">
        <h3>数据汇集和管理系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="form.username" autocomplete="off" placeholder="在此输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="在此输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginHandler">登录</el-button>
            <el-button type="primary" @click="anonymousHandler">直接进入</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: { username: '', password: '' },
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

        directives: {

        },

        methods: {
            /**
             * 点击了登录按钮之后的回调函数
             */
            loginHandler: function() {
                let loading = this.$loading();
                this.loginSubmit(loading);
            },

            loginSubmit: function(loading) {
                this.$ajax.post('/login', {
                    'username': this.form.username,
                    'password': this.form.password
                }).then((message) => {
                    this.$message.success(message.data.message);
                    window.console.log(this.$store.state);
                    this.$store.commit('refreshUser', {
                        role: message.data['roleLabel'],
                        menus: message.data.menus
                    });
                    this.$router.replace({path: '/home'});
                    window.console.log(this.$store.state);
                }).finally(() => {
                    loading.close();
                });
            },

            anonymousHandler: function() {
                this.$router.replace({path: '/home'});
            }
        }
    }
</script>

<style scoped>
.wic-form {
    width: 500px;
    height: 300px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0 0 1px rgba(0,0,0,.125),0 1px 3px rgba(0,0,0,.2);
    padding: 30px 30px 0 30px;
}
</style>