<template>
    <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold">List {{ listId }}</div>
        </div>
        <Card
            v-for="i in 5"
            :key="i"
            :cardId="i"
        />
        <CardAddButton />
    </div>
</template>

<script>
import Card from "./Card";
import CardAddButton from "./CardAddButton";


export default {
    name: "List",
    props: [
        'listId'
    ],
    components: {
        Card,
        CardAddButton
    }
}
</script>

<style scoped>
    .list {
        width: 250px;
        min-width: 250px;
    }
</style>
