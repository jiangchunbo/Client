<template>
    <el-form inline>
        <el-form-item label="时间范围">
            <el-date-picker v-model="timeInterval" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="设备类型">
            <el-select v-model="equipmentType" placeholder="请选择">
                <el-option v-for="item in equipmentTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="经度范围">
            <el-input-number style="width: 300px" v-model="gpsLInterval[0]" :min="-180" :max="180"
                             :step="1"></el-input-number>
            <span> ~ </span>
            <el-input-number style="width: 300px" v-model="gpsLInterval[1]" :min="gpsLInterval[0]" :max="180"
                             :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="纬度范围">
            <el-input-number style="width: 300px" v-model="gpsBInterval[0]" :min="-90" :max="90"
                             :step="1"></el-input-number>
            <span> ~ </span>
            <el-input-number style="width: 300px" v-model="gpsBInterval[1]" :min="gpsBInterval[0]" :max="90"
                             :step="1"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="queryHandler">筛选查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "basic-query-form",
        data() {
            return {
                timeInterval: [],
                gpsLInterval: [],
                gpsBInterval: [],
                equipmentType: '',
                equipmentTypes: [
                    {value: 'PINS1', label: '平台惯导1'},
                    {value: 'PINS2', label: '平台惯导2'},
                    {value: 'USB', label: 'S 波段统一测控系统'},
                    {value: 'UCB', label: 'C 波段统一测控系统'},
                    {value: 'UKA', label: 'UKA'},
                    {value: 'JWY', label: '经纬仪'},
                ]
            }
        },

        methods: {
            queryHandler() {
                // 执行查询 ajax
            }
        }
    }
</script>

<style scoped>

</style>