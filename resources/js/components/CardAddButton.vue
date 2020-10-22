<template>
    <div
        @click="$emit('click')"
        class="hover:text-gray-800 text-sm rounded-sm p-2 text-gray-600 cursor-pointer hover:bg-gray-400"
    >
        <i class="fas fa-plus mr-2"></i>
        Add New Card
    </div>
</template>

<script>
import CardAdd from "../graphql/CardAdd.gql";
import BoardQuery from "../graphql/BoardListsCards.gql";

export default {
    name: "CardAddButton",
}
</script>

<style scoped>

</style>
