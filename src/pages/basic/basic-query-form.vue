<template>
    <el-form inline>
        <el-form-item label="时间范围">
            <el-date-picker v-model="dateInterval" type="datetimerange" start-placeholder="开始时间"
                            end-placeholder="结束时间" style="width: 400px;"/>
        </el-form-item>
        <el-form-item label="设备类型">
            <el-select v-model="equipmentType" placeholder="请选择" style="width: 200px;">
                <el-option v-for="item in equipmentTypes" :key="item.value" :label="item.label"
                           :value="item.value"/>
            </el-select>
        </el-form-item>
        <el-form-item label="经度范围">
            <el-input-number style="width: 150px" v-model="gpsLInterval[0]" :min="-180" :max="180"
                             :step="1"/>
            <span> ~ </span>
            <el-input-number style="width: 150px" v-model="gpsLInterval[1]" :min="gpsLInterval[0]" :max="180"
                             :step="1"/>
        </el-form-item>
        <el-form-item label="纬度范围">
            <el-input-number style="width: 150px" v-model="gpsBInterval[0]" :min="-90" :max="90"
                             :step="1"/>
            <span> ~ </span>
            <el-input-number style="width: 150px" v-model="gpsBInterval[1]" :min="gpsBInterval[0]" :max="90"
                             :step="1"/>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "basic-query-form",
        data() {
            return {
                dateInterval: [],
                gpsLInterval: [-180, 180],
                gpsBInterval: [-90, 90],
                equipmentType: '',
                equipmentTypes: [
                    {value: 'GD1', label: 'GD1'},
                    {value: 'GD2', label: 'GD2'},
                    {value: 'USB', label: 'USB'},
                    {value: 'UCB', label: 'UCB'},
                    {value: 'UKA', label: 'UKA'},
                    {value: 'JWY', label: 'JWY'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>