<template>
    <CardEditor
        v-model="title"
        @closed="closed"
        @saved="addCard"
    />
</template>

<script>
    import CardAdd from "../graphql/CardAdd.gql";
    import CardEditor from "./CardEditor";
    import { EVENT_CARD_ADDED } from "../constants";

    export default {
        props: [
            'list'
        ],
        name: "CardAddEditor",
        components: {
            CardEditor
        },
        data() {
            return {
                title: null
            }
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
                            data: cardAdd,
                            type: EVENT_CARD_ADDED
                        });
                        self.closed();
                    }
                });
            },
            closed() {
                this.$emit("closed");
            }
        }
}
</script>

<style scoped>

</style>
