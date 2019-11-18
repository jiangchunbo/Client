<template>
    <div class="container">
        <el-image :src="logo" fit="fit"></el-image>
        <ul>
            <li @click="clickHandler">
                <router-link to="/master/weather">总库</router-link>
            </li>
            <li @click="clickHandler">
                <router-link to="/slave1/weather">分库1</router-link>
            </li>
            <li @click="clickHandler">
                <router-link to="/slave2/weather">分库2</router-link>
            </li>
            <li @click="clickHandler">
                <router-link to="/slave3/weather">分库3</router-link>
            </li>
            <li @click="clickHandler">
                <router-link to="/slave4/weather">分库4</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import logo from '../assets/logo.png'

    export default {
        data: function () {
            return {
                logo
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
        height: 100%;
        display: flex;
    }
    .el-image {
        width: 50px;
        height: 50px;
        margin: auto 20px;
    }
    ul {
        margin: auto 50px;
        display: flex;
    }

    ul li {
        list-style: none;
    }

    ul li a {
        position: relative;
        display: block;
        padding: 5px 30px;
        margin: 5px 0;
        text-decoration: none;
        color: #262626;
        font-weight: bold;
        transition: .5s;
    }

    ul li a:hover,
    .active a{
        color: #fff;
    }

    ul li a:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        transform: scaleY(2);
        opacity: 0;
        transition: .5s;
    }

    ul li a:hover:before,
    .active a:before{
        transform: scaleY(1);
        opacity: 1;
    }

    ul li a:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        transform: scaleY(0);
        opacity: 0;
        transition: .5s;
        z-index: -1;
    }

    ul li a:hover:after,
    .active a:after{
        transform: scaleY(1);
        opacity: 1;
    }
</style>