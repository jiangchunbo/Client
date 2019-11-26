<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="150px" style="background-color: #f7f6fb; overflow: hidden">
            <!-- 解析表达式 -->
            <el-menu
                    default-active="general-weather"
                    text-color="#000"
                    @select="selectHandler"
                    unique-opened>
                <el-submenu index="general" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span slot="title">主库</span>
                    </template>
                    <el-menu-item index="general-weather">天气状况</el-menu-item>
                    <el-menu-item index="general-ocean">海洋状况</el-menu-item>
                </el-submenu>

                <el-submenu index="sub1" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span slot="title">1 号分库</span>
                    </template>
                    <el-menu-item index="sub1-weather">天气状况</el-menu-item>
                    <el-menu-item index="sub1-ocean">海洋状况</el-menu-item>
                </el-submenu>

                <el-submenu index="sub2" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span slot="title">2 号分库</span>
                    </template>
                    <el-menu-item index="sub2-weather">天气状况</el-menu-item>
                    <el-menu-item index="sub2-ocean">海洋状况</el-menu-item>
                </el-submenu>
                <el-submenu index="sub3" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span slot="title">3 号分库</span>
                    </template>
                    <el-menu-item index="sub3-weather">天气状况</el-menu-item>
                    <el-menu-item index="sub3-ocean">海洋状况</el-menu-item>
                </el-submenu>
                <el-submenu index="sub4" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span slot="title">4 号分库</span>
                    </template>
                    <el-menu-item index="sub4-weather">天气状况</el-menu-item>
                    <el-menu-item index="sub4-ocean">海洋状况</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-main>
                <el-tabs v-model="activeTabName">
                    <el-tab-pane label="数据" name="data">
                        <Table ref="table" :dataBaseName="dataBaseName" :tableName="tableName"></Table>
                    </el-tab-pane>
                    <el-tab-pane label="分析" name="analysis">
                        <Analysis></Analysis>
                    </el-tab-pane>
                    <el-tab-pane label="导入" name="import">
                        <Import></Import>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Import from "@/components/Import";
    import Analysis from "@/components/Analysis";
    import Table from "@/components/Table";

    export default {
        components: {
            Table, Analysis, Import
        },
        data: function () {
            return {
                dataBaseName: 'general',
                tableName: 'weather',
                activeTabName: 'data'
            };
        },
        methods: {
            selectHandler(index, indexPath) {
                window.console.log('-----');
                window.console.log(index);
                window.console.log(indexPath);
                index.replace(indexPath[0], '');
                window.console.log(index.replace(indexPath[0] + '-', ''));

                this.dataBaseName = indexPath[0];
                this.tableName = index.replace(indexPath[0] + '-', '');
            }
        }

    }
</script>

<style scoped>

</style>