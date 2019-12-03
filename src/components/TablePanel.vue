<template>
    <el-tabs v-model="index">
        <el-tab-pane v-for="(value, index) in this.master.weatherProps" :key="index" :label="value" :name="value">
            <Table :tableName="value"></Table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>

    import Table from "./WeatherPanel";


    export default {
        name: "MasterTagTable",
        components: {
            Table
        },
        data: function () {
            return {
                index: ''
            }
        },
        methods : {

        },
        mounted: function() {
            this.index = this.master.tables[0];
        }
    }
</script>

<style scoped>

</style>