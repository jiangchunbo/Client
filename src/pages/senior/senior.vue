<template>
    <el-container class="wic-container">
        <el-header class="wic-container-header" height="50px">
            <span class="wic-container-title">高级数据管理</span>
        </el-header>
        <el-main>
            <basic-query-form  style="padding-top: 15px;"></basic-query-form>
            <div>
                <el-button type="primary" @click="queryHandler">筛选查询</el-button>
                <el-button type="primary" @click="createHandler">添加数据</el-button>
                <el-button type="primary" @click="createHandler">删除所选范围的数据</el-button>
            </div>
            <el-row style="padding-bottom: 15px;">
                <el-col :span="10">
                    <div class="wrapper">
                        <el-table border :data="data" height="600px">
                            <el-table-column label="时间" prop="createTime"></el-table-column>
                            <el-table-column label="测量船号" prop="ywId"></el-table-column>
                            <el-table-column label="设备" prop="equipmentType"></el-table-column>
                            <el-table-column label="距离" prop="rd"></el-table-column>
                            <el-table-column label="方位角" prop="ad"></el-table-column>
                            <el-table-column label="俯仰角" prop="ed"></el-table-column>
                            <el-table-column label="测速" prop="vd"></el-table-column>
                            <el-table-column label="与 GPS 比对方位误差" prop="gpsDa"></el-table-column>
                            <el-table-column label="与 GPS 比对俯仰误差" prop="gpsDe"></el-table-column>
                            <el-table-column label="与 GPS 比对斜距误差" prop="gpsDr"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="wrapper" style="padding: 0 5px; height: 600px; overflow: auto">
                        <el-collapse>
                            <el-collapse-item title="关联性分析 —— ML_GPS_A">
                                <el-form inline>
                                    <el-form-item>
                                        <el-button size="mini" type="primary"
                                                   @click="drawLineChart('ML_GPS_A', 'ML-GPS A', 'ML_ED', 'gpsDa')">生成 ML-GPS A 图
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <div ref="ML_GPS_A" style="width: 800px; height: 300px;"></div>
                            </el-collapse-item>
                            <el-collapse-item title="关联性分析 —— ML_GPS_E">
                                <el-form inline>
                                    <el-form-item>
                                        <el-button size="mini" type="primary"
                                                   @click="drawLineChart('ML_GPS_E', 'ML-GPS E', 'ML_ED', 'gpsDe')">生成 ML-GPS E 图
                                        </el-button>
                                    </el-form-item>
                                </el-form>

                                <div ref="ML_GPS_E" style="width: 800px; height: 300px;"></div>
                            </el-collapse-item>
                            <el-collapse-item title="关联性分析 —— ML_GPS_R">
                                <el-form inline>
                                    <el-form-item>
                                        <el-button size="mini" type="primary"
                                                   @click="drawLineChart('ML_GPS_R', 'ML-GPS R', 'ML_ED', 'gpsDr')">生成 ML-GPS A 图
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <div ref="ML_GPS_R" style="width: 800px; height: 300px;"></div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import BasicQueryForm from "@/pages/basic/basic-query-form";

    export default {
        components: {
            BasicQueryForm
        },
        data() {
            return {
                data: [],
                date: new Date(),
                lineChart: '',
                lineChart2: '',
                title: '模拟数据',
                subtitle: '根据公式生成',
                yAxisName: '比对误差',
                yAxisUnit_ML_GPS: ['rad', 'rad', 'rad'],
                yAxisUnit_USB_GPS: ['rad', 'rad', 'rad'],
                yAxisUnit_UCB_GPS: ['rad', 'rad', 'rad'],
                yAxisUnit_UXB_GPS: ['rad', 'rad', 'rad']
            }
        },

        methods: {



            selectHandler() {
                this.drawLineChart();
            },

            randomNormalDistribution() {
                let u = 0.0, v = 0.0, w = 0.0, c = 0.0;
                do {
                    //获得两个（-1,1）的独立随机变量
                    u = Math.random() * 2 - 1.0;
                    v = Math.random() * 2 - 1.0;
                    w = u * u + v * v;
                } while (w === 0.0 || w >= 1.0);
                //这里就是 Box-Muller转换
                c = Math.sqrt((-2 * Math.log(w)) / w);
                //返回2个标准正态分布的随机数，封装进一个数组返回
                //当然，因为这个函数运行较快，也可以扔掉一个
                //return [u*c,v*c];
                return u * c;
            },


            getNumberInNormalDistribution(mean, std) {
                return mean + (this.randomNormalDistribution() * std);
            },

            drawLineChart(ref, yAxisName1, yAxisName2, yAxisField1) {
                let chart = this.$echarts.init(this.$refs[ref]);
                let option = {
                    title: {
                        text: this.title, subtext: this.subtitle, x: 'center', align: 'right'
                    },
                    grid: {
                        right: 180, left: 180, bottom: 80
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {},
                            dataView: {show: true, readOnly: false}
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            animation: false
                        }
                    },
                    legend: {
                        data: [yAxisName1, yAxisName2],
                        x: 'left'
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true
                        },
                        {
                            type: 'inside',
                            realtime: true
                        }
                    ],
                    dataset: {
                        dimensions: [
                            'createTime', 'ywId', 'equipmentType', 'rd', 'ad', 'ed', 'vd', 'gpsDa', 'gpsDe', 'gpsDr'
                        ],
                        source: this.data
                    },
                    xAxis: [
                        {
                            type: 'category'
                        }
                    ],
                    yAxis: [
                        {
                            name: yAxisName1 + ' ( 单位: ° ) ',
                            nameLocation: 'end',
                            type: 'value',
                            splitNumber: 4,
                            max: function(value) {
                                return value.max + (value.max - value.min) / 2;
                            },
                            min: function(value) {
                                return value.min - (value.max - value.min) / 2;
                            },
                            axisLabel: {
                                formatter: function(value) {
                                    return value.toPrecision(2);
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#080dfc'
                                }
                            }
                        },
                        {
                            name: yAxisName2 + ' ( 单位: \'\' ) ',
                            nameLocation: 'end',
                            type: 'value',
                            splitNumber: 4,
                            max: function(value) {
                                return value.max + (value.max - value.min) / 2;
                            },
                            min: function(value) {
                                return value.min - (value.max - value.min) / 2;
                            },
                            axisLabel: {
                                formatter: function(value) {
                                    return value.toPrecision(2);
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#b74c4b'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: yAxisName1,
                            type: 'line',
                            lineStyle: {
                                width: 1,
                                color: '#080dfc'
                            },
                            encode: {
                                x: 'createTime',
                                y: yAxisField1
                            },

                        },
                        {
                            name: yAxisName2,
                            type: 'line',
                            yAxisIndex: 1,
                            lineStyle: {
                                width: 1,
                                color: '#b74c4b'
                            },
                            encode: {
                                x: 'createTime',
                                y: 'ed'
                            },
                            axisLabel: {
                                show: true
                            }
                        }
                    ]
                };

                if (option && typeof option === "object") {
                    chart.setOption(option, true);
                }
            }
        },
        mounted() {
            for (let i = 0; i < 10; ++i) {
                let num = this.getNumberInNormalDistribution(0.0002795851449409, 0.00001);
                let num2 = this.getNumberInNormalDistribution(0.16, 0.00001);
                let num3 = this.getNumberInNormalDistribution(0.17, 0.00001);
                let num4 = this.getNumberInNormalDistribution(0.18, 0.00001);
                this.data.push({
                    'createTime': '时间' + i,
                    'ywId': '远望' + i + '号',
                    'equipmentType': '设备' + i,
                    'rd': '斜距' + i,
                    'ad': '方位角' + i,
                    'ed': num,
                    'vd': '测速' + i,
                    'gpsDa': num2,
                    'gpsDe': num3,
                    'gpsDr': num4
                });
            }
            window.console.log(this.data);
        }
    }
</script>

<style scoped>

    .wrapper {
        background-color: white;
        margin: 15px 0 0 10px;
        border-radius: 3px;
        box-shadow: 0 0 1px rgba(0,0,0,.125),0 1px 3px rgba(0,0,0,.2);
    }
</style>