<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: #f7f6fb">
            <el-menu default-active="0" text-color="#ccc">
                <el-menu-item index="0">
                    <i class="el-icon-coin"></i>
                    <span slot="title">主库</span>
                </el-menu-item>
                <el-menu-item index="1">
                    <i class="el-icon-coin"></i>
                    <span slot="title">1 号分库</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-coin"></i>
                    <span slot="title">2 号分库</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-coin"></i>
                    <span slot="title">3 号分库</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-coin"></i>
                    <span slot="title">4 号分库</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Main from "../components/Main";

    export default {
        components: {
            Main
        },
        data: function () {
            return {};
        }

    }
</script>

<style scoped>

</style>