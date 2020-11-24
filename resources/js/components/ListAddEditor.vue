<template>
    <div>
        <div
            @click="startEditing"
            v-if="!editing"
            class="list text-black cursor-pointer bg-white hover:bg-gray-500 rounded-sm p-2 mr-2 opacity-75"
        >
            <i class="fas fa-plus mr-2"></i>
            Add another list
        </div>
        <div
            v-else
            class="bg-gray-300 rounded-sm p-2 list"
            v-on-clickaway="hideEditor"
        >
            <input
                type="text"
                ref="title"
                class="rounded-sm border-blue-600 border-2 py-1 px-2 outline-none w-full text-gray-800 text-sm"
                placeholder="Enter list title..."
                @keyup.esc="hideEditor"
                v-model="title"
            />
            <div class="flex">
                <button
                    class="mt-2 rounded-sm py-1 px-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 outline-none"
                >
                    <i class="fas fa-plus mr-2"></i>
                    Add list
                </button>
                <div
                    @click="hideEditor"
                    class="mt-2 ml-1 px-3 rounded-md hover:bg-gray-400 cursor-pointer justify-center text-gray-500 flex items-center"
                >
                    <i class="fas fa-times"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";

export default {
    name: "ListAddEditor",
    data() {
        return {
            editing: false,
            title: null
        }
    },
    directives: {
        onClickaway
    },
    methods: {
        hideEditor() {
            this.editing = false;
        },
        startEditing() {
            this.editing = true;
            this.$nextTick(() => this.$refs.title.focus());
        }
    }
}
</script>

<style scoped>

</style>
