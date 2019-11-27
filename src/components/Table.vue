<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-header>
            <div style="margin-top: 10px;">
                <el-checkbox-group
                        v-model="checkList[tableName]"
                        style="display: inline-block"
                        :min="1">
                    <el-checkbox v-for="(value, key, index) in this.general[`${this.tableName}`]['properties']" :key="index" :label="key">
                        {{value.alias}}
                    </el-checkbox>
                </el-checkbox-group>

                <el-button style="margin-left: 20px;" :loading="loading" type="primary" icon="el-icon-refresh" circle @click="refresh(currentPage, pageSize)"></el-button>

                <el-select style="width: 150px; margin-left: 20px;" v-model="value" placeholder="请选择关键字">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <div class="search-box">

                    <input class="search-text" type="text" name="" placeholder="在此输入关键字"/>
                    <a class="search-btn" href="#">
                        <i class="el-icon-search"></i>
                    </a>
                </div>
            </div>
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
                    highlight-current-row
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(f, f, f, 0.1)">
                <!-- prop 为 js 对象中的键名 -->
                <!-- label 显示出来的列名 -->

                <el-table-column
                        v-for="(value, index) in sortedList"
                        :key="index"
                        :property="value"
                        :label="label(value)">
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="viewHandler(scope)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
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
    import ajax from "@/util/ajax";


    export default {
        components: {},
        data: () => {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                checkList: {
                    weather: [],
                    ocean: []
                },
                loading: false,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        props: {
            dataBaseName: String,
            tableName: String,
            refreshBreadcrumb: Function
        },
        watch: {

        },
        computed: {
            sortedList() {
                let result = [];
                for(let key in this.general.weather.properties) {
                    if(this.checkList[this.tableName].indexOf(key) !== -1) {
                        result.push(key);
                    }
                }
                return result;
            }
        },
        methods: {

            viewHandler(scope) {
                window.console.log(scope);
            },

            label(value) {
                return this.general[`${this.tableName}`]['properties'][value].alias;
            },

            refresh() {
                this.loading = true;
                this.total = 0;
                this.tableData = [];
                ajax.post(`/${this.dataBaseName}/${this.tableName};pageNum=${this.currentPage};pageSize=${this.pageSize}`, {
                    // 表单数据, 暂无
                }).then((data) => {
                    let jsonObj = JSON.parse(data.request.response);
                    this.tableData = jsonObj.tableData;
                    this.total = jsonObj.total;
                    this.refreshBreadcrumb();
                }).catch((error) => {
                    this.warning('获取数据失败，原因 ' + error);
                }).finally(() => {
                    this.loading = false;
                });
            },

            currentChangeHandler(currentPage) {
                this.currentPage = currentPage;
                this.refresh(currentPage);
            },

            sizeChangeHandler(pageSize) {
                this.pageSize = pageSize;
                this.refresh();
            },

            warning(message) {
                this.$message({
                    message: message,
                    type: 'warning'
                });
            }
        },

        mounted() {
            this.checkList.length = 0;
            Object.keys(this.general.weather.properties).forEach((key) => {this.checkList['weather'].push(key);});
            window.console.log(this.checkList['weather']);
            Object.keys(this.general['ocean']['properties']).forEach((key) => {this.checkList['ocean'].push(key);});
            this.refresh();
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

    .search-box {
        margin: 0 0 0 10px;
        padding: 0;
        position: absolute;
        display: inline-block;
        height: 40px;
        background-color: #409efe;
        border-radius: 40px;
    }

    .search-text {
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        outline: none;
        float: left;
        color: white;
        font-size: 16px;
        transition: 0.4s;
        line-height: 40px;
        width: 0;
    }

    .search-box:hover>.search-text {
        width: 150px;
        padding: 0 10px;
    }

    .search-btn {
        float: right;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: white;
    }
</style>