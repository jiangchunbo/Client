<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
                <el-table>
                    <el-table-column label="时间"></el-table-column>
                    <el-table-column label="设备"></el-table-column>
                    <el-table-column label="惯导状态码"></el-table-column>
                    <el-table-column label="GPS 经度"></el-table-column>
                    <el-table-column label="GPS 纬度"></el-table-column>
                    <el-table-column label="GPS 高程"></el-table-column>
                    <el-table-column label="GPS 速度"></el-table-column>
                    <el-table-column label="GPS 东向速度"></el-table-column>
                    <el-table-column label="GPS 北向速度"></el-table-column>
                    <el-table-column label="GPS 天向速度"></el-table-column>
                    <el-table-column label="惯导经度"></el-table-column>
                    <el-table-column label="惯导纬度"></el-table-column>
                    <el-table-column label="惯导纵摇"></el-table-column>
                    <el-table-column label="惯导横摇"></el-table-column>
                    <el-table-column label="惯导航向"></el-table-column>
                    <el-table-column label="惯导东向速度"></el-table-column>
                    <el-table-column label="惯导北向速度"></el-table-column>
                    <el-table-column label="惯导天向速度"></el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "ScreenQuery"
    }
</script>

<style scoped>

</style>