<template>
    <el-container style="height: 800px; border: 1px solid #eee">
        <el-header>
            <el-checkbox-group v-model="checkList" style="display: inline-block">
                <el-checkbox v-for="(property, index) in properties" :key="index" :label="property['id']">
                    {{property['name']}}
                </el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" :loading="false" @click="refresh(currentPage, pageSize)">刷新</el-button>
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
                        v-for="(property, index) in checkedProperties"
                        :key="index"
                        :property="property['id']"
                        :label="property['name']">
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
        components: {

        },
        data: () => {
            return {
                properties: [],
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                checkList: []
            }
        },
        computed: {
            checkedProperties: function() {
                return this.properties.filter(function(property) {
                    return property['checked'];
                });
            }
        },
        methods: {

            refresh: function (currentPage = 1, pageSize = this.pageSize) {
                let this0 = this;
                Ajax.post('/users', {
                    pageNum: currentPage,
                    pageSize: pageSize,
                    checkList: this.checkList
                }).then(function(response) {
                    let jsonString = response.request.response;

                    window.console.log(jsonString);
                    let jsonObj = JSON.parse(jsonString);


                    this0.tableData = jsonObj.tableData;
                    this0.total = jsonObj.total;
                    this0.properties = jsonObj.properties;

                    window.console.log(jsonObj.properties);
                    /* 将 checkableProperty 中 checked 的属性置入 checkList */
                    this0.checkList.length = 0;
                    for(let i = 0; i < jsonObj.properties.length; i++) {
                        if(jsonObj.properties[i].checked === true) {
                            this0.checkList.push(jsonObj.properties[i]['id']);
                        }
                    }
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

            getTotal() {

            }
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