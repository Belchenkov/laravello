<template>
    <div
        class="bg-white card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2"
    >Task {{ cardId }}</div>
</template>

<script>
export default {
    name: "Card",
    props: [
        'cardId'
    ]
}
</script>

<style scoped>
    .card {
        box-shadow: 0 1px 3px rgba(9, 30, 66, .25);
    }
</style>
