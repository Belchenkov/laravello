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
            @updated="$emit('card-updated', { ...$event, listId: list.id })"
        />
        <CardAddEditor
            :list="list"
            @closed="editing = false"
            @added="$emit('card-added', { ...$event, listId: list.id })"
            v-if="editing"
        />
        <CardAddButton
            @click="editing = true"
            v-if="!editing && canAddCard"
        />
    </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "./Card";
import CardAddButton from "./CardAddButton";
import CardAddEditor from "./CardAddEditor";

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
    computed: mapState({
        canAddCard(state) {
            return this.list.board.owner.id === state.user.id;
        }
    }),
    components: {
        Card,
        CardAddButton,
        CardAddEditor
    }
}
</script>

<style scoped>
    .list {
        width: 250px;
        min-width: 250px;
    }
</style>
