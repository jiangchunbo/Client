<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="150px" style="background-color: #f7f6fb; overflow: hidden">
            <!-- 解析表达式 -->
            <el-menu :default-openeds="['master']" default-active="weather" text-color="#000" @select="selectHandler">
                <el-submenu  index="master" style="text-align: left;">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span slot="title">主库</span>
                    </template>
                    <el-menu-item index="weather">天气状况</el-menu-item>
                    <el-menu-item index="ocean">海洋状况</el-menu-item>
                </el-submenu>
                <el-menu-item index="slave1" style="text-align: left;">
                    <i class="el-icon-coin"></i>
                    <span slot="title">1 号分库</span>
                </el-menu-item>
                <el-menu-item index="slave2" style="text-align: left;">
                    <i class="el-icon-coin"></i>
                    <span slot="title">2 号分库</span>
                </el-menu-item>
                <el-menu-item index="3" style="text-align: left;">
                    <i class="el-icon-coin"></i>
                    <span slot="title">3 号分库</span>
                </el-menu-item>
                <el-menu-item index="4" style="text-align: left;">
                    <i class="el-icon-coin"></i>
                    <span slot="title">4 号分库</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
            <el-main>
                <el-tabs v-model="activeTabName">
                    <el-tab-pane label="数据" name="data">
                        <Table ref="table" :tableName="activeTableName"></Table>
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
                activeTableName: 'weather',
                activeTabName: 'data'
            };
        },
        methods: {
            selectHandler(index) {
                this.activeTableName = index;
                window.console.log(index);
            }
        }

    }
</script>

<style scoped>

</style>