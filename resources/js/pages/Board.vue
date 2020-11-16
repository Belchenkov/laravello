<template>
    <div
        :class="bgColor"
        class="h-full flex flex-col items-stretch"
    >
        <div class="header text-white flex justify-between items-center mb-2">
            <div class="ml-2 w-1/3">
                <button class="header-btn" @click="showBoards = !showBoards">Boards</button>
                <div
                    v-if="showBoards"
                    class="absolute bg-gray-200 rounded-sm mt-2 text-sm text-gray-600 border-gray-200 shadow w-64 overflow-y-auto z-10 p-2"
                >
                    <div class="text-gray-600 text-xs font-semibold mb-2 ml-2">BOARDS</div>
                    <div
                        v-for="n in 8"
                        :key="n"
                        class="m-2 bg-teal-100 rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex"
                    >
                        <div class="bg-teal-200 w-10 rounded-sm rounded-r-none"></div>
                        <div class="p-2">The board {{ n + 1 }}</div>
                    </div>
                </div>
            </div>
            <div class="text-lg logo opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
            <div class="mr-2 w-1/3 flex justify-end">
                <div class="flex items-center" v-if="isLoggedIn">
                    <div v-if="userInfo" class="text-sm mr-2">{{ userInfo.name }}</div>
                    <button class="header-btn" @click="logoutMe">Logout</button>
                </div>
                <div class="" v-else>
                    <button class="header-btn" @click="$router.push({name: 'login'})">Sign In</button>
                    <button class="header-btn">Register</button>
                </div>
            </div>
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
    import Logout from "../graphql/Logout.gql";
    import { EVENT_CARD_ADDED, EVENT_CARD_DELETED, EVENT_CARD_UPDATED } from "../constants";
    import { mapGetters, mapActions } from 'vuex';
    import { colorMap500 } from "../utils";

    export default {
        components: {
            List
        },
        data() {
          return {
              showBoards: false
          }
        },
        computed: {
            ...mapGetters([
                'isLoggedIn',
                'userInfo'
            ]),
            bgColor() {
                return {
                    "bg-gray-500": this.$apollo.loading,
                    [colorMap500[this.board?.color]]: true
                }
            }
        },
        apollo: {
            board: {
                query: BoardQuery,
                variables() {
                    return {
                        id: Number(this.$route.params.id)
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
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
            },
            async logoutMe() {
                const response = await this.$apollo.mutate({
                   mutation: Logout
                });

                this.logout();

                this.$router.push({ name: "login" });
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
        background: rgba(0, 0, 0, .2);
    }
</style>
