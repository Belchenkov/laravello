<template>
    <div>
        <button class="header-btn" @click="showBoards = !showBoards">Boards</button>
        <dropdown-menu :show="showBoards">
            <div class="text-gray-600 text-xs font-semibold mb-2 ml-2">BOARDS</div>
            <div
                v-for="n in 8"
                :key="n"
                class="m-2 bg-teal-100 rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex"
            >
                <div class="bg-teal-200 w-10 rounded-sm rounded-r-none"></div>
                <div class="p-2">The board {{ n + 1 }}</div>
            </div>
        </dropdown-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DropdownMenu from "../components/DropdownMenu";
import UserBoards from "./../graphql/UserBoards.gql"

export default {
    name: "UserBoardsDropdown",
    components: {
        DropdownMenu
    },
    data() {
        return {
            showBoards: false
        }
    },
    computed: mapState({
        userId: state => state.user.id
    }),
    apollo: {
        userBoards: {
            query: UserBoards,
            variables() {
                return {
                    userId: this.userId
                };
            },
            skip() {
                return !this.userId;
            }
        }
    }
}
</script>

<style scoped>

</style>
