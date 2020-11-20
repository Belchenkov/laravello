<template>
    <transition name="appear">
        <div
            @click="$emit('closed')"
            v-if="show"
            class="overlay fixed z-30 top-0 bottom-0 left-0 w-full h-full bg-black"
        >
            <div class="w-full h-full bg-transparent flex justify-center items-center">
                <div
                    @click.self="$emit('closed')"
                    class="text-white shadow-xl" :style="style"
                >
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        width: Number,
        height: Number,
        show: Boolean
    },
    name: "Modal",
    computed: {
        style() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`
            }
        }
    }
}
</script>

<style scoped>
    .overlay {
        background-color: rgba(0, 0, 0, .7);
    }
</style>
