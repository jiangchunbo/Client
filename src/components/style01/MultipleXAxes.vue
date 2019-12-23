<template>

    <el-container style="width: 100%; border: 1px solid #eee">

        <el-header>
            图像区域
        </el-header>

        <el-main>
            <div ref="myCharts" style="height: 400px"></div>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        name: "MultipleXAxes",
        data: () => {
            return {
                chart: Object
            }
        },
        props: {
            title: {type: String, default: '多 X 轴示例'}
        },
        mounted() {

            this.chart = this.$echarts.init(this.$refs.myCharts);
        },
        methods: {
            draw(data) {
                let legend_data = [];
                let xAxis = [];
                let series = [];
                window.console.log(data.length + ": " + data);
                for(let i = 0; i < data.length; ++i) {
                    let dataItem = data[i];

                    let legend = dataItem.legend;
                    legend_data.push(legend);

                    let xAxisItem = {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    window.console.log(params);
                                    window.console.log('sss' + params.seriesData);
                                    return '降水量  ' + params.value
                                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        },
                        data: dataItem.xAxis_data
                    };
                    xAxis.push(xAxisItem);

                    let seriesItem = {
                        name: legend,
                        type: 'line',
                        smooth: true,
                        data: data[i].content
                    };
                    series.push(seriesItem);
                }

                window.console.log(legend_data);
                window.console.log(xAxis);
                window.console.log(series);
                let options = {
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },

                    legend: {
                        data: legend_data
                    },

                    grid: {
                        top: 80,
                        bottom: 50
                    },

                    xAxis: xAxis,

                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],

                    series: series
                };
                this.chart.setOption(options, true);
            }
        }
    }
</script>

<style scoped>

</style>