<template>
    <el-container>
        <el-main>
            <el-button @click="draw">显示</el-button>
            <div ref="chart" style="height: 400px; width: 100%;"></div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "DataPanel",


        methods: {
            draw() {
                const chart = this.$echarts.init(this.$refs.chart);
                let seriesLabel = {
                    normal: {
                        show: true,
                        textBorderColor: '#333',
                        textBorderWidth: 2
                    }
                };
                let options = {
                    title: {
                        text: '标题',
                        subtext: '副标题',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['City Alpha', 'City Beta', 'City Gamma']
                    },
                    grid: {
                        left: 100
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'value',
                        name: 'Days',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    yAxis: {
                        type: 'category',
                        name: '天气',
                        nameLocation: 'end',
                        data: ['Sunny', 'Cloudy', 'Showers'],
                        axisLabel: {
                            formatter: function (value) {
                                return value;
                            },
                            margin: 20,
                        }
                    },
                    series: [
                        {
                            name: 'City Alpha',
                            type: 'bar',
                            data: [165, 170, 30],
                            label: seriesLabel,
                            markPoint: {
                                symbolSize: 1,
                                symbolOffset: [0, '50%'],
                                label: {
                                    normal: {
                                        formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                                        backgroundColor: 'rgb(242,242,242)',
                                        borderColor: '#aaa',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        padding: [4, 10],
                                        lineHeight: 26,
                                        // shadowBlur: 5,
                                        // shadowColor: '#000',
                                        // shadowOffsetX: 0,
                                        // shadowOffsetY: 1,
                                        position: 'right',
                                        distance: 20,
                                        rich: {
                                            a: {
                                                align: 'center',
                                                color: '#fff',
                                                fontSize: 18,
                                                textShadowBlur: 2,
                                                textShadowColor: '#000',
                                                textShadowOffsetX: 0,
                                                textShadowOffsetY: 1,
                                                textBorderColor: '#333',
                                                textBorderWidth: 2
                                            },
                                            b: {
                                                color: '#333'
                                            },
                                            c: {
                                                color: '#ff8811',
                                                textBorderColor: '#000',
                                                textBorderWidth: 1,
                                                fontSize: 22
                                            }
                                        }
                                    }
                                },
                                data: [
                                    {type: 'max', name: 'max days: '},
                                    {type: 'min', name: 'min days: '}
                                ]
                            }
                        },
                        {
                            name: 'City Beta',
                            type: 'bar',
                            label: seriesLabel,
                            data: [150, 105, 110]
                        },
                        {
                            name: 'City Gamma',
                            type: 'bar',
                            label: seriesLabel,
                            data: [220, 82, 63]
                        }
                    ]
                };
                chart.setOption(options, true);
            }
        },


        mounted() {

        }
    }
</script>

<style scoped>

</style>