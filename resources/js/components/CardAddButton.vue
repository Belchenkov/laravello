<template>
    <div
        @click="addCard"
        class="hover:text-gray-800 text-sm rounded-sm p-2 text-gray-600 cursor-pointer hover:bg-gray-400"
    >
        <i class="fas fa-plus mr-2"></i>
        Add New Card
    </div>
</template>

<script>
import CardAdd from "../graphql/CardAdd.gql";

export default {
    name: "CardAddButton",
    methods: {
        addCard() {
            this.$apollo.mutate({
                mutation: CardAdd,
                variables: {
                    title: 'Added through mutation',
                    listId: 1,
                    order: 1
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
