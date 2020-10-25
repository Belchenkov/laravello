<template>
    <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold">{{ list.title }}</div>
        </div>
        <Card
            v-for="card in list.cards"
            :key="card.id"
            :card="card"
            @deleted="$emit('card-deleted', { ...$event, listId: list.id })"
        />
        <CardEditor
            :list="list"
            @closed="editing = false"
            @added="$emit('card-added', { ...$event, listId: list.id })"
            v-if="editing"
        />
        <CardAddButton
            @click="editing = true"
            v-else
        />
    </div>
</template>

<script>
import Card from "./Card";
import CardAddButton from "./CardAddButton";
import CardEditor from "./CardEditor";

export default {
    name: "List",
    props: [
        'list'
    ],
    data() {
        return {
            editing: false
        }
    },
    components: {
        Card,
        CardAddButton,
        CardEditor
    }
}
</script>

<style scoped>
    .list {
        width: 250px;
        min-width: 250px;
    }
</style>
