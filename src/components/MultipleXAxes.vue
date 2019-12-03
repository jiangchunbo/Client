<template>

    <el-container style="width: 100%; border: 1px solid #eee">

        <el-main>
            <div ref="myCharts" style="height: 400px"></div>
        </el-main>

        <el-footer>
            container-footer
        </el-footer>
    </el-container>
</template>

<script>

    export default {
        name: "MultipleXAxes",
        data: () => {
            return {
                chart: null,
                colors: ['#5793f3', '#d14a61', '#675bba']
            }
        },
        props: {
            title: {type: String, default: '多 X 轴示例'}
        },
        mounted() {
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
                            onZero: false,
                            lineStyle: {
                                color: this.colors[0]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
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
                const myChart = this.$echarts.init(this.$refs.myCharts);

                window.console.log(legend_data);
                window.console.log(xAxis);
                window.console.log(series);
                let options = {
                    color: this.colors,
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    title: [{
                        left: 'center',
                        text: 'Gradient along the y axis'
                    }],

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
                myChart.setOption(options, true);
            }
        }
    }
</script>

<style scoped>

</style>