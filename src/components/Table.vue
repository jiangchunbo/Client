<template>
    <el-container style="height: 800px; border: 1px solid #eee">
        <el-header>
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(value, key, index) in propertyMapper" :key="index" :label="key">{{value}}</el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" :loading="false" @click="refresh">刷新</el-button>
        </el-header>
        <el-main>
            <!-- stripe 有条纹 -->
            <!-- border 有边框 -->
            <!-- highlight-current-row 高亮选中 -->
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%"
                    highlight-current-row>
                <!-- prop 为 js 对象中的键名 -->
                <!-- label 显示出来的列名 -->

                <el-table-column
                        v-for="(value, key,index) in propertyMapper"
                        :key="index"
                        :property="key"
                        :label="value">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                        <el-button type="text" size="small">查看</el-button>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer
                style="padding-top: 15px">
            <!-- https://element.eleme.cn/#/zh-CN/component/pagination -->
            <!-- layout: 布局顺序 -->
            <!-- total: 数据数量, 一般后台传递, 便于前台分析 -->
            <!-- pager-count: 最大页码按钮数量, 前台决定, 用于美化(大于等于 5 且小于等于 21 的奇数) -->
            <!-- page-sizes: 可选每页条数 -->
            <!-- background: 带蓝背景高亮 -->

            <!-- current-page: 当前页码应该是计算出来的 -->
            <el-pagination
                    layout="total, sizes, prev, pager, next, ->, jumper"
                    :pager-count="11"
                    background
                    :page-sizes="[10, 20, 30, 40]"

                    :total="total"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    @current-change="currentChangeHandler"
                    @size-change="sizeChangeHandler">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
    import Ajax from "@/util/ajax";


    export default {

        name: "Table",
        components: {

        },
        data: () => {
            return {
                propertyMapper: {
                    'id': '标识符',
                    'name': '姓名',
                    'sex': '性别'
                },
                tableData: [
                    {
                        'id': '161303101',
                        'name': '蔡某',
                        'sex': '男'
                    },
                    {
                        'id': '161303103',
                        'name': '范某',
                        'sex': '女'
                    }
                ],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                checkList: [
                    'A', 'B', 'C'
                ]
            }
        },
        methods: {

            getPropertyMapper() {

            },

            refresh (currentPage = 1, pageSize = this.pageSize) {
                window.console.log(this.checkList);
                let this0 = this;
                Ajax.post('/users', {
                    pageNum: currentPage,
                    pageSize: pageSize
                }).then(function(response) {
                    window.console.log('response', response);
                    let jsonString = response.request.response;
                    window.console.log('jsonString', jsonString);
                    let jsonObj = JSON.parse(jsonString);
                    this0.tableData = jsonObj.tableData;
                    this0.propertyMapper = jsonObj.propertyMapper;
                    window.console.log(this0.propertyMapper);
                }).catch(function (error) {
                    window.console.log('error', error);
                });
            },

            currentChangeHandler(currentPage) {
                this.refresh(currentPage);
            },

            sizeChangeHandler(pageSize) {
                this.refresh(1, pageSize);
            },
        },
        mounted: function()  {
            this.total = this.tableData.length;
        }

    }
</script>

<style scoped>
    .el-footer {
        background-color: #f7f6fb;
        color: #333;
        line-height: 60px;
        padding: auto;
    }
</style>