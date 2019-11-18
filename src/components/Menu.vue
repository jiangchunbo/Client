<template>
    <el-tabs tab-position="left" style="height: 100%">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
<!--    <el-menu class="el-menu-demo" mode="vertical" default-active="master">-->
<!--        <el-menu-item index="master">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-coin"></i>-->
<!--                <span>主库</span>-->
<!--            </template>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="slave1">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-coin"></i>-->
<!--                <span>1 号分库</span>-->
<!--            </template>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="slave2">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-coin"></i>-->
<!--                <span>2 号分库</span>-->
<!--            </template>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="slave3">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-coin"></i>-->
<!--                <span>3 号分库</span>-->
<!--            </template>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="slave4">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-coin"></i>-->
<!--                <span>4 号分库</span>-->
<!--            </template>-->
<!--        </el-menu-item>-->
<!--    </el-menu>-->

</template>

<script>
    import logo from '../assets/logo.png'

    export default {
        name: "Menu",
        data: function () {
            return {
                logo,
            }
        }
    }
</script>

<style scoped>

    li {
        padding: 0 !important;
    }


</style>