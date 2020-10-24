<template>
    <div class="group shadow-card bg-white card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between">
        <div>{{ card.title }}</div>
        <div class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500">
            <div class="cursor-pointer text-orange-400 hover:text-orange-500 pr-3">
                <i class="fas fa-edit"></i>
            </div>
            <div class="cursor-pointer text-red-500 hover:text-red-600">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
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
