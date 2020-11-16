<template>
    <div>
        <el-calendar v-model="value">
            <template slot="dateCell" slot-scope="{ date, data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split("-").slice(1).join("-") }} {{ data.isSelected ? "✔️" : "" }}
                </p>
            </template>
        </el-calendar>
    </div>
</template>

<script>
export default {
    name: "OverTimeInfo",
    data() {
        return {
            value: new Date(),
        };
    },
    mounted: {},
};
</script>

<style scope lang="scss">
.is-selected {
    color: #1989fa;
}
</style>
