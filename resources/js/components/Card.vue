<template>
    <div class="shadow-card bg-white card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2">
        {{ card.title }}
    </div>
</template>

<script>
export default {
    name: "Card",
    props: [
        'card'
    ]
}
</script>

<style scoped>

</style>
