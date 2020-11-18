<template>
    <div class="h-full flex flex-col items-stretch bg-green-400">
        <div class="header text-white flex justify-between items-center bg-green-600 mb-2">
            <div class="ml-2 w-1/3">x</div>
            <div class="text-lg logo opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
            <div class="mr-2 w-1/3 flex justify-end">x</div>
        </div>

        <div class="h-full flex flex-1 flex-col items-stretch">
            <div class="mx-4 mb-2 text-white font-bold text-lg">
                <span v-if="$apollo.queries.board.loading">Loading...</span>
                <span v-else>{{ board.title }}</span>
            </div>
            <div v-if="board" class="flex flex-1 items-start overflow-x-auto mx-2">
                <List
                    @card-added="updateQueryCache($event)"
                    @card-deleted="updateQueryCache($event)"
                    @card-updated="updateQueryCache($event)"
                    v-for="list in board.lists"
                    :key="list.id"
                    :list="list"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import List from "../components/List";
    import BoardQuery from "../graphql/BoardListsCards.gql";
    import {EVENT_CARD_ADDED, EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "../constants";

    export default {
        components: {
            List
        },
        apollo: {
            board: {
                query: BoardQuery,
                variables: {
                    id: 1
                }
            }
        },
        methods: {
            updateQueryCache(event) {
                const data = event.store.readQuery({
                    query: BoardQuery,
                    variables: {
                        id: +this.board.id
                    }
                });

                const listById = () => {
                    return data.board.lists.find(list => list.id === event.listId);
                };

                switch (event.type) {
                    case EVENT_CARD_ADDED:
                        listById().cards.push(event.data);
                        break;
                    case EVENT_CARD_DELETED:
                        listById().cards = listById().cards.filter(card => card.id !== event.data.id);
                        break;
                    case EVENT_CARD_UPDATED:
                        listById().cards.filter(card => card.id === event.data.id).title = event.data.title;
                        break;
                }

                event.store.writeQuery({ query: BoardQuery, data });
            }
        }
    }
</script>

<style scoped>
    .logo {
        font-size: 25px;
        font-weight: 900;
        text-shadow: 0 1px 3px rgba(0, 0, 0, .8);
    }

    .header {
        height: 40px;
        box-shadow: 0 0 5px rgba(0, 0, 0, .8);
    }
</style>
