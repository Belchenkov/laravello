<template>
    <transition name="appear">
        <div
            v-on-clickAway="close"
            v-if="show"
            class="dropdown-menu absolute bg-gray-100 rounded-sm mt-2 text-sm text-gray-600 border-gray-200 shadow w-64 overflow-y-auto z-10 p-2"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { directive as onClickAway } from "vue-clickaway";
export default {
    name: "DropdownMenu",
    props: {
        show: Boolean
    },
    directives: {
        onClickAway
    },
    methods: {
        close() {
            this.$emit('closed');
        }
    }
}
</script>

<style scoped>
.dropdown-menu {
    max-height: 80%;
}
</style>
