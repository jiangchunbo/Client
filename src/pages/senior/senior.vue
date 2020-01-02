<template>
    <el-container>
        <el-header>
            <el-form inline>
                <el-form-item>
                    <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>

            </el-form>
        </el-header>

        <el-main>

            <el-row :gutter="10">
                <el-col :span="12">
                    <el-table :data="data" height="600px">
                        <el-table-column label="测量船号" prop="ywId"></el-table-column>
                        <el-table-column label="时间" prop="time"></el-table-column>
                        <el-table-column label="设备" prop="equipment"></el-table-column>
                        <el-table-column label="距离" prop="distance"></el-table-column>
                        <el-table-column label="俯仰角" prop="pitch"></el-table-column>
                        <el-table-column label="方位角" prop="azimuth"></el-table-column>
                        <el-table-column label="轴系误差参数" prop="parameter"></el-table-column>
                        <el-table-column label="与 GPS 比对方位误差" prop="radGpsDa"></el-table-column>
                        <el-table-column label="与 GPS 比对俯仰误差" prop="radGpsDe"></el-table-column>
                        <el-table-column label="与 GPS 比对斜距误差" prop="radGpsDr"></el-table-column>
                        <el-table-column label="设备精度" prop="jd"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12" style="overflow: auto">
                    <div style="height: 600px; overflow: auto">
                        <el-collapse>
                            <el-collapse-item title="关联性分析 —— 方位比对残差">
                                <el-form inline>
                                    <el-form-item>
                                        <el-select size="mini" v-model="yAxisUnit_ML_GPS[0]" placeholder="单位选择">
                                            <el-option label="弧度制 ( rad ) " value="rad"></el-option>
                                            <el-option label="角度制 ( '' )" value="second"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button size="mini" type="primary"
                                                   @click="drawLineChart('ML_GPS_A', 'ML-GPS A', 'ML_ED', 'GpsDa', yAxisUnit_ML_GPS[0], 'degree')">生成 ML-GPS A 图
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <div ref="ML_GPS_A" style="width: 800px; height: 300px;"></div>
                            </el-collapse-item>
                            <el-collapse-item title="关联性分析 —— 俯仰比对残差">
                                <el-form inline>
                                    <el-form-item>
                                        <el-select size="mini" v-model="yAxisUnit_ML_GPS[1]" placeholder="单位选择"
                                                   @change="selectHandler">
                                            <el-option label="弧度制 ( rad ) " value="rad"></el-option>
                                            <el-option label="角度制 ( '' )" value="second"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button size="mini" type="primary"
                                                   @click="drawLineChart('ML_GPS_E', 'ML-GPS E', 'ML_ED', 'GpsDe', yAxisUnit_ML_GPS[1], 'degree')">生成 ML-GPS E 图
                                        </el-button>
                                    </el-form-item>
                                </el-form>

                                <div ref="ML_GPS_E" style="width: 800px; height: 300px;"></div>
                            </el-collapse-item>
                            <el-collapse-item title="关联性分析 —— 斜距比对残差">
                                <el-form inline>
                                    <el-form-item>
                                        <el-select size="mini" v-model="yAxisUnit_ML_GPS[2]" placeholder="单位选择">
                                            <el-option label="弧度制 ( rad ) " value="rad"></el-option>
                                            <el-option label="角度制 ( '' )" value="second"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button size="mini" type="primary"
                                                   @click="drawLineChart('ML_GPS_R', 'ML-GPS R', 'ML_ED', 'GpsDr', yAxisUnit_ML_GPS[2], 'degree')">生成 ML-GPS A 图
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <div ref="ML_GPS_R" style="width: 800px; height: 300px;"></div>
                            </el-collapse-item>
                        </el-collapse>

                    </div>
<!---->
<!--                        <el-collapse-item title="关联性分析 —— ML-GPS R">-->
<!--                            <el-form inline>-->
<!--                                <el-form-item>-->
<!--                                    <el-select size="mini" v-model="yAxisUnit_ML_GPS[2]" placeholder="单位选择"-->
<!--                                               @change="selectHandler">-->
<!--                                        <el-option label="弧度制 ( rad ) " value="rad"></el-option>-->
<!--                                        <el-option label="角度制 ( ° ) " value="degree"></el-option>-->
<!--                                        <el-option label="角度制 ( ' )" value="minute"></el-option>-->
<!--                                        <el-option label="角度制 ( '' )" value="second"></el-option>-->
<!--                                    </el-select>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item>-->
<!--                                    <el-button size="mini" type="primary"-->
<!--                                               @click="drawLineChart('ML_GPS_R', 'GpsDr', yAxisUnit_ML_GPS[2])">绘制曲线图-->
<!--                                    </el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->

<!--                            <div ref="ML_GPS_R" style="width: 600px; height: 300px;"></div>-->
<!--                        </el-collapse-item>-->

<!--                        <el-collapse-item title="关联性分析 —— USB-GPS A">-->
<!--                            <el-form inline>-->
<!--                                <el-form-item>-->
<!--                                    <el-select size="mini" v-model="yAxisUnit_USB_GPS[0]" placeholder="单位选择"-->
<!--                                               @change="selectHandler">-->
<!--                                        <el-option label="弧度制" value="rad"></el-option>-->
<!--                                        <el-option label="角度制" value="angle"></el-option>-->
<!--                                    </el-select>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item>-->
<!--                                    <el-button size="mini" type="primary" @click="drawLineChart">绘制曲线图</el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->

<!--                            <div ref="lineChart" style="width: 500px; height: 300px;"></div>-->
<!--                        </el-collapse-item>-->
<!--                        <el-collapse-item title="关联性分析 —— USB-GPS E">-->
<!--                            <el-form inline>-->
<!--                                <el-form-item>-->
<!--                                    <el-select size="mini" v-model="yAxisUnit_USB_GPS[1]" placeholder="单位选择"-->
<!--                                               @change="selectHandler">-->
<!--                                        <el-option label="弧度制" value="rad"></el-option>-->
<!--                                        <el-option label="角度制" value="angle"></el-option>-->
<!--                                    </el-select>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item>-->
<!--                                    <el-button size="mini" type="primary" @click="drawLineChart">绘制曲线图</el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->

<!--                            <div ref="lineChart2" style="width: 500px; height: 300px;"></div>-->
<!--                        </el-collapse-item>-->
<!--                        <el-collapse-item title="关联性分析 —— USB-GPS R">-->
<!--                            <el-form inline>-->
<!--                                <el-form-item>-->
<!--                                    <el-select size="mini" v-model="yAxisUnit_USB_GPS[2]" placeholder="单位选择"-->
<!--                                               @change="selectHandler">-->
<!--                                        <el-option label="弧度制" value="rad"></el-option>-->
<!--                                        <el-option label="角度制" value="angle"></el-option>-->
<!--                                    </el-select>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item>-->
<!--                                    <el-button size="mini" type="primary" @click="drawLineChart">绘制曲线图</el-button>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->

<!--                            <div ref="lineChart2" style="width: 500px; height: 300px;"></div>-->
<!--                        </el-collapse-item>-->

                </el-col>
            </el-row>
        </el-main>

    </el-container>
</template>

<script>
    export default {
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
                var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
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

            drawLineChart(ref, yAxisName1, yAxisName2, target, unit1, unit2) {
                let chart = this.$echarts.init(this.$refs[ref]);
                let option = {
                    title: {
                        text: this.title,
                        subtext: this.subtitle,
                        x: 'center',
                        align: 'right'
                    },
                    grid: {
                        right: 180,
                        left: 180,
                        bottom: 80
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
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
                        dimensions: ['ywId', 'time', 'equipment', 'distance', 'pitch', 'azimuth', 'parameter', 'radGpsDa', 'radGpsDe', 'radGpsDr',
                            'degreeGpsDa', 'degreeGpsDe', 'degreeGpsDr', 'minuteGpsDa', 'minuteGpsDe', 'minuteGpsDr', 'secondGpsDa', 'secondGpsDe', 'secondGpsDr', 'jd'],
                        source: this.data
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: false}
                        }
                    ],
                    yAxis: [
                        {
                            name: yAxisName1 + ' ( 单位: ' + unit1 + ' ) ',
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
                            name: yAxisName2 + ' ( 单位: ' + unit2 + ' ) ',
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
                            animation: false,
                            lineStyle: {
                                width: 1,
                                color: '#080dfc'
                            },
                            encode: {
                                x: 'time',
                                y: unit1 + 'GpsDa'
                            }
                        },
                        {
                            name: yAxisName2,
                            type: 'line',
                            yAxisIndex: 1,
                            animation: false,
                            lineStyle: {
                                width: 1,
                                color: '#b74c4b'
                            },
                            encode: {
                                x: 'time',
                                y: 'pitch'
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
            for (let i = 0; i < 500; ++i) {
                let num = this.getNumberInNormalDistribution(0.0002795851449409, 0.00001);
                let num2 = this.getNumberInNormalDistribution(0.1637561173269462, 0.00001);
                let degreeGpsDa = num * 180 / Math.PI;
                let degreeGpsDe = num * 180 / Math.PI;
                let degreeGpsDr = num * 180 / Math.PI;
                let minuteGpsDa = degreeGpsDa * 60;
                let minuteGpsDe = degreeGpsDe * 60;
                let minuteGpsDr = degreeGpsDr * 60;
                let secondGpsDa = minuteGpsDa * 60;
                let secondGpsDe = minuteGpsDe * 60;
                let secondGpsDr = minuteGpsDr * 60;
                this.data.push({
                    ywId: '船号',
                    time: i,
                    equipment: 'USB',
                    distance: '距离',
                    pitch: num2 * 180 / Math.PI,
                    azimuth: '方位角',
                    parameter: '轴系误差参数',
                    radGpsDa: num,
                    radGpsDe: num,
                    radGpsDr: num,
                    degreeGpsDa: degreeGpsDa,
                    degreeGpsDe: degreeGpsDe,
                    degreeGpsDr: degreeGpsDr,
                    minuteGpsDa: minuteGpsDa,
                    minuteGpsDe: minuteGpsDe,
                    minuteGpsDr: minuteGpsDr,
                    secondGpsDa: secondGpsDa,
                    secondGpsDe: secondGpsDe,
                    secondGpsDr: secondGpsDr,
                    jd: '设备精度'
                });
            }
        }
    }
</script>

<style scoped>

</style>