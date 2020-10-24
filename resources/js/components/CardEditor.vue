<template>
    <div>
        <textarea
            class="shadow-card rounded-md py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
            placeholder="Enter a title for this card..."
            v-model="title"
            ref="card"
            @keyup.esc="closed"
            @keyup.enter="addCard"
        ></textarea>
        <div class="flex my-1 justify-between">
            <button
                @click="addCard"
                class="rounded-sm py-1 px-3 bg-blue-600 text-white cursor-pointer hover:bg-blue-400 outline-none"
            >
                <i class="fas fa-plus"></i>
                Add Card
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
import CardAdd from "../graphql/CardAdd.gql";
import BoardQuery from "../graphql/BoardListsCards.gql";

export default {
    props: [
        'list'
    ],
    name: "CardEditor",
    data() {
        return {
            title: null
        }
    },
    mounted() {
        this.$refs.card.focus();
    },
    methods: {
        addCard() {
            const self = this;
            this.$apollo.mutate({
                mutation: CardAdd,
                variables: {
                    title: this.title,
                    listId: this.list.id,
                    order: this.list.cards.length + 1
                },
                update(store, { data: { cardAdd } }) {
                    self.$emit("added", {
                        store,
                        data: cardAdd
                    });
                    self.closed();
                }
            });
        },
        closed() {
            this.$emit('closed');
        }
    }
}
</script>

<style scoped>

</style>
