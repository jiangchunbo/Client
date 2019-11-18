<template>
    <div class="container">
        <el-image class="logo" :src="logo" fit="fit"></el-image>
        <el-menu default-active="/home" class="el-menu-demo menu" mode="horizontal" @select="handleSelect" router>

            <el-menu-item index="/home" tabindex="1">
                <a>主页</a>
            </el-menu-item>

            <el-menu-item index="/about" tabindex="2">
                <a>关于</a>
            </el-menu-item>
        </el-menu>
    </div>
<!--    <div class="container">-->
<!--        <el-image :src="logo" fit="fit"></el-image>-->
<!--        <ul>-->
<!--            <li @click="clickHandler">-->
<!--                <router-link to="/master/weather">总库</router-link>-->
<!--            </li>-->
<!--            <li @click="clickHandler">-->
<!--                <router-link to="/slave1/weather">分库1</router-link>-->
<!--            </li>-->
<!--            <li @click="clickHandler">-->
<!--                <router-link to="/slave2/weather">分库2</router-link>-->
<!--            </li>-->
<!--            <li @click="clickHandler">-->
<!--                <router-link to="/slave3/weather">分库3</router-link>-->
<!--            </li>-->
<!--            <li @click="clickHandler">-->
<!--                <router-link to="/slave4/weather">分库4</router-link>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </div>-->
</template>

<script>
    import logo from '../assets/logo.png'

    export default {
        data: function () {
            return {
                logo,
                activeIndex: '/home'
            }
        },
        methods: {
            clickHandler(e) {
                window.console.log(document.getElementsByClassName('active'));
                e.currentTarget.classList.add('active');
            }
        }
    }
</script>

<style scoped>

    .container {
        display: flex;
        justify-content: right;
        align-items: center;
    }

    .logo {
        width: 50px;
        height: 50px;
    }

    .menu {
        margin-left: 50px;
    }
    /*ul {*/
    /*    color: #000 !important;*/
    /*    border: none !important;*/
    /*}*/

    /*ul li a {*/
    /*    font-weight: bold !important;*/
    /*    transition: .5s !important;*/
    /*}*/

    /*ul>li:hover,*/
    /*ul>li.is-active {*/
    /*    color: #fff !important;*/
    /*}*/

    /*ul li:before {*/
    /*    content: '';*/
    /*    position: absolute;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    border-top: 1px solid #000;*/
    /*    border-bottom: 1px solid #000;*/
    /*    transform: scaleY(1);*/
    /*    opacity: 0;*/
    /*    transition: .5s;*/
    /*}*/

    /*ul li:hover::before{*/
    /*    transform: scaleY(0.5);*/
    /*    opacity: 1;*/
    /*    transition: .5s;*/
    /*}*/

    /*ul li:after {*/
    /*    content: '';*/
    /*    position: absolute;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    background-color: #000000;*/
    /*    transform: scaleY(0);*/
    /*    transition: .5s;*/
    /*}*/

    /*ul li:hover::after{*/
    /*    transform: scaleY(0.5);*/
    /*}*/
</style>