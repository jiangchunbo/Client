<template>
    <el-row>
        <el-col :span="24">
            <multiple-x-axes></multiple-x-axes>
        </el-col>
    </el-row>
</template>

<script>
    import MultipleXAxes from "@/components/MultipleXAxes";

    export default {
        name: "Analysis",
        components: {
            MultipleXAxes
        }
    }
</script>

<style scoped>

</style>