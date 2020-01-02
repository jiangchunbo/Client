<template>
    <el-container>
        <el-header>

        </el-header>

        <el-main>
            <el-button @click="draw">显示</el-button>
            <div ref="chart" style="width: 100%; height: 500px;"></div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "DataPanel05",
        methods: {
            draw() {
                const option = {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        // 提供一份数据。
                        source: [
                            ['score', 'amount', 'product'],
                            [89.3, 58212, 'Matcha Latte'],
                            [57.1, 78254, 'Milk Tea'],
                            [74.4, 41032, 'Cheese Cocoa'],
                            [50.1, 12755, 'Cheese Brownie'],
                            [89.7, 20145, 'Matcha Cocoa'],
                            [68.1, 79146, 'Tea'],
                            [19.6, 91852, 'Orange Juice'],
                            [10.6, 101852, 'Lemon Juice'],
                            [32.7, 20112, 'Walnut Brownie']
                        ]
                    },
                    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
                    xAxis: {type: 'category'},
                    // 声明一个 Y 轴，数值轴。
                    yAxis: [
                        {
                            type: 'value',
                            name: '水量',
                            axisLabel: {
                                formatter: '{value} ml'
                            }
                        },
                        {
                            type: 'value',
                            name: '温度',
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
                    series: [
                        {
                            type: 'line',
                            encode: {
                                x: 'product',
                                y: 'score'
                            }
                        },
                        {
                            type: 'line', encode: {
                                x: 'product',
                                y: 'amount'
                            }
                        }
                    ]
                }
                const chart = this.$echarts.init(this.$refs.chart);
                chart.setOption(option, true);
            }
        }
    }
</script>

<style scoped>

</style>