<template>
    <el-container>
        <el-header>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form :model="dynamicForm" ref="dynamicForm" label-width="100px" class="demo-dynamic">
                        <el-form-item v-for="(year, index) in dynamicForm.years" :key="index">
                            <div class="block">
                                <el-date-picker
                                        v-model="year.value"
                                        type="year"
                                        placeholder="选择年"
                                        @change="changeHandler">
                                </el-date-picker>
                            </div>
                        </el-form-item>

                    </el-form>

                    <el-button @click="addYear">新增</el-button>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-row>
                <el-col :span="12">
                    <WeatherPanel></WeatherPanel>
                </el-col>
                <el-col :span="12">
                    <MultipleXAxes ref="multipleXAxes"></MultipleXAxes>
                </el-col>
            </el-row>


        </el-main>
    </el-container>
</template>

<script>

    import WeatherPanel from "@/components/WeatherPanel";
    import MultipleXAxes from "@/components/MultipleXAxes";
    export default {
        name: "DataPanel",
        components: {MultipleXAxes, WeatherPanel},
        data: () => {
            return {
                dynamicForm: {
                    years: [
                        {
                            value: ''
                        }
                    ]
                },
                year: '2019',
                year2016: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"],
                year2015: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"],
                data2015: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                data2016: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
                data: []
            }
        },
        watch: {
            date(now) {
                window.console.log(now.getFullYear());
                window.console.log(now.getMonth() + 1);
                window.console.log(now.getDate());
            }
        },
        methods: {
            changeHandler() {
                this.data.length = 0;
                window.console.log('看看有哪些人在里面' + JSON.stringify(this.dynamicForm.years) );
                for(let i = 0; i < this.dynamicForm.years.length; ++i) {
                    let year = this.dynamicForm.years[i].value.getFullYear();
                    if(year === 2016) {
                        this.data.push({
                            legend: '2016 降水量',
                            xAxis_data: this.year2016,
                            content: this.data2016
                        });
                    } else if(year === 2015) {
                        this.data.push({
                            legend: '2015 降水量',
                            xAxis_data: this.year2015,
                            content: this.data2015
                        });
                    }
                }
                this.$refs.multipleXAxes.draw(this.data);
            },
            addYear() {
                this.dynamicForm.years.push({
                    key: Date.now(),
                    value: ''
                });
            }
        }

    }
</script>

<style scoped>

</style>