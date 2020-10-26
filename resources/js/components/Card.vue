<template>
    <div>
        <div
            v-if="!editing"
            class="group shadow-card bg-white card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between"
        >
            <div>{{ card.title }}</div>
            <div class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500">
                <div
                    @click="editing = true"
                    class="cursor-pointer text-orange-400 hover:text-orange-500 pr-3"
                >
                    <i class="fas fa-edit"></i>
                </div>
                <div
                    @click="cardDelete"
                    class="cursor-pointer text-red-500 hover:text-red-600"
                >
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>
        <CardEditor
            v-else
            class="mb-2"
            label="Save Card"
            icon="fas fa-save"
            @closed="editing = false"
            @saved="cardUpdate"
            v-model="title"
        />
    </div>
</template>
<script>
import CardDelete from "../graphql/CardDelete.gql";
import CardUpdate from "../graphql/CardUpdate.gql";
import CardEditor from "./CardEditor";
import { EVENT_CARD_DELETED, EVENT_CARD_UPDATED } from "../constants";

export default {
    name: "Card",
    props: [
        'card'
    ],
    components: {
        CardEditor
    },
    data() {
        return {
            editing: false,
            title: this.card.title
        }
    },
    methods: {
        cardDelete() {
            const self = this;

            this.$apollo.mutate({
                mutation: CardDelete,
                variables: {
                    id: this.card.id
                },
                update(store, { data: { cardDelete } }) {
                    self.$emit("deleted", {
                        store,
                        data: cardDelete,
                        type: EVENT_CARD_DELETED
                    });
                    self.$emit('closed');
                }
            });
        },
        cardUpdate() {
            const self = this;

            this.$apollo.mutate({
                mutation: CardUpdate,
                variables: {
                    id: self.card.id,
                    title: self.title
                },
                update(store, { data: cardUpdate }) {
                    self.$emit('updated', {
                        store,
                        data: cardUpdate,
                        type: EVENT_CARD_UPDATED
                    });
                    self.editing = false;
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
