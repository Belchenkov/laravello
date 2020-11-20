<template>
    <div
        :class="[colors[color]]"
        @click="$emit('changed', color)"
        class="flex justify-center items-center text-white text-xl w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2 rounded-sm cursor-pointer">
        <span v-if="activeColor === color">&#10003;</span>
    </div>
</template>

<script>
import { colorMap500 } from "../utils";

export default {
    name: "BoardColor",
    props: {
        color: String,
        activeColor: String
    },
    computed: {
        colors: () => colorMap500
    }
}
</script>

<style scoped>

</style>
