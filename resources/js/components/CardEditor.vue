<template>
    <div>
        <textarea
            class="shadow-card rounded-md py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
            placeholder="Enter a title for this card..."
            :value="value"
            ref="card"
            @keyup.esc="closed"
            @keyup.enter="saved"
            @input="$emit('input', $event.target.value)"
        ></textarea>
        <div class="flex my-1 justify-between">
            <button
                @click="saved"
                class="rounded-sm py-1 px-3 bg-blue-600 text-white cursor-pointer hover:bg-blue-400 outline-none"
            >
                <i :class="[icon, 'mr-1']"></i>
                {{ label }}
            </button>
            <button
                @click="closed"
                class="py-1 px-3 rounded-md hover:bg-gray-400 cursor-pointer text-gray-500">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>

export default {
    props: [
        'value',
        'icon',
        'label'
    ],
    name: "CardEditor",
    mounted() {
        this.$refs.card.focus();
    },
    methods: {
        closed() {
            this.$emit('closed');
        },
        saved() {
            this.$emit('saved');
        }
    }
}
</script>

<style scoped>

</style>
