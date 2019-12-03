<template>
    <el-container style="border: 1px solid #eee">
        <el-header>
            <!--            <div style="display: flex; justify-content: left; align-items: center; margin-top: 20px;">-->
            <!--                <span style="margin-right: 20px;">筛选</span>-->
            <!--                <el-select-->
            <!--                        v-model="year" placeholder="年"-->
            <!--                        size="medium" style="margin-right: 20px; width: 150px;">-->
            <!--                    <el-option-->
            <!--                            v-for="item in years"-->
            <!--                            :key="item.value"-->
            <!--                            :label="item.label"-->
            <!--                            :value="item.value">-->
            <!--                    </el-option>-->
            <!--                </el-select>-->
            <!--                <el-select-->
            <!--                        v-model="month" placeholder="月"-->
            <!--                        size="medium" style="margin-right: 20px; width: 150px;">-->
            <!--                    <el-option-->
            <!--                            v-for="item in months"-->
            <!--                            :key="item.value"-->
            <!--                            :label="item.label"-->
            <!--                            :value="item.value">-->
            <!--                    </el-option>-->
            <!--                </el-select>-->

            <!--                <el-select-->
            <!--                        v-model="type" placeholder="类型"-->
            <!--                        size="medium" style="margin-right: 20px; width: 150px;">-->
            <!--                    <el-option-->
            <!--                            v-for="item in options"-->
            <!--                            :key="item.value"-->
            <!--                            :label="item.label"-->
            <!--                            :value="item.value">-->
            <!--                    </el-option>-->
            <!--                </el-select>-->

            <!--                <div class="search-box">-->
            <!--                    <input class="search-text" type="text" name="" placeholder="在此输入关键字"/>-->
            <!--                    <a class="search-btn" href="#">-->
            <!--                        <i class="el-icon-search"></i>-->
            <!--                    </a>-->
            <!--                </div>-->

            <!--            </div>-->

            <!--            <div style="display: flex; justify-content: left; align-items: center; margin: 20px 0;">-->
            <!--                <el-checkbox-group v-model="checkList[tableName]" style="display: inline-block" :min="1">-->
            <!--                    <el-checkbox label="id">标识符</el-checkbox>-->
            <!--                    <el-checkbox label="gmt_create">创建时间</el-checkbox>-->
            <!--                    <el-checkbox label="gmt_modified">修改日期</el-checkbox>-->
            <!--                    <el-checkbox label="temperature">温度</el-checkbox>-->
            <!--                    <el-checkbox label="humidity">密度</el-checkbox>-->
            <!--                    <el-checkbox label="pressure">大气压</el-checkbox>-->
            <!--                </el-checkbox-group>-->
            <!--                &lt;!&ndash;                <el-button style="margin-left: 20px;" :loading="loading" type="primary" icon="el-icon-refresh" circle&ndash;&gt;-->
            <!--                &lt;!&ndash;                           @click="refresh(currentPage, pageSize)"></el-button>&ndash;&gt;-->
            <!--            </div>-->
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
                    v-loading="false"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(f, f, f, 0.1)">
                <el-table-column property="date" label="日期"></el-table-column>
                <el-table-column property="rainfall" label="降雨量"></el-table-column>


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
        <el-footer style="padding-top: 15px">
            <el-pagination
                    layout="total, sizes, prev, pager, next, ->, jumper"
                    :pager-count="11"
                    background
                    :page-sizes="[10, 20]"
                    :total="24"
                    :current-page="1"
                    :page-size="1">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>

    export default {
        components: {},
        data: () => {
            return {
                tableData: [
                    {
                        date: '2015-1', rainfall: '2.6'
                    },
                    {
                        date: '2015-2', rainfall: '5.9'
                    },
                    {
                        date: '2015-3',
                        rainfall: '9.0'
                    },
                    {
                        date: '2015-4',
                        rainfall: '26.4'
                    },
                    {
                        date: '2015-5',
                        rainfall: '28.7'
                    },
                    {
                        date: '2015-6',
                        rainfall: '70.7'
                    },
                    {
                        date: '2015-7',
                        rainfall: '175.6'
                    },
                    {
                        date: '2015-8',
                        rainfall: '182.2'
                    },
                    {
                        date: '2015-9',
                        rainfall: '48.7'
                    },
                    {
                        date: '2015-10',
                        rainfall: '18.8'
                    },
                    {
                        date: '2015-11',
                        rainfall: '6.0'
                    },
                    {
                        date: '2015-12',
                        rainfall: '2.3'
                    },
                    {
                        date: '2016-1', rainfall: '3.9'
                    },
                    {
                        date: '2016-2', rainfall: '5.9'
                    },
                    {
                        date: '2016-3',
                        rainfall: '11.1'
                    },
                    {
                        date: '2016-4',
                        rainfall: '18.7'
                    },
                    {
                        date: '2016-5',
                        rainfall: '48.3'
                    },
                    {
                        date: '2016-6',
                        rainfall: '69.2'
                    },
                    {
                        date: '2016-7',
                        rainfall: '231.6'
                    },
                    {
                        date: '2016-8',
                        rainfall: '46.6'
                    },
                    {
                        date: '2016-9',
                        rainfall: '55.4'
                    },
                    {
                        date: '2016-10',
                        rainfall: '18.4'
                    },
                    {
                        date: '2016-11',
                        rainfall: '10.3'
                    },
                    {
                        date: '2016-12',
                        rainfall: '0.7'
                    }
                ],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                loading: false,
            }
        },
        watch: {},
        computed: {
        },
        methods: {


        },

        mounted() {

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
        margin: 0;
        padding: 0;
        display: inline-block;
        position: relative;
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
        transition: 0.4s;
        line-height: 40px;
        width: 0;
    }

    .search-box:hover > .search-text {
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