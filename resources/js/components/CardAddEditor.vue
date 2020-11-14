<template>
    <CardEditor
        v-model="title"
        @closed="closed"
        @saved="addCard"
        label="Add Card"
        icon="fas fa-plus"
    />
</template>

<script>
    import CardAdd from "../graphql/CardAdd.gql";
    import CardEditor from "./CardEditor";
    import { EVENT_CARD_ADDED } from "../constants";
    import { mapGetters } from "vuex";

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
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods: {
            addCard() {
                const self = this;
                this.$apollo.mutate({
                    mutation: CardAdd,
                    variables: {
                        title: this.title,
                        listId: this.list.id,
                        order: this.list.cards.length + 1,
                        ownerId: this.userInfo.id
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
