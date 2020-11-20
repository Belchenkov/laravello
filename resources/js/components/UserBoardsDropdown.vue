<template>
    <div>
        <button class="header-btn" @click="showBoards = !showBoards">Boards</button>
        <dropdown-menu :show="showBoards" @closed="showBoards = false">
            <div class="text-gray-600 text-xs font-semibold mb-2 ml-1">BOARDS</div>
            <router-link
                :to="{ name: 'board', params: { id: board.id } }"
                v-for="board in userBoards"
                :key="board.id"
                :class="[`bg-${board.color}-100`]"
                class="mb-1 rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex"
                @click.native="showBoards = false"
            >
                <div
                    :class="[`bg-${board.color}-200`]"
                    class="w-10 rounded-sm rounded-r-none"
                ></div>
                <div class="p-2">{{ board.title }}</div>
            </router-link>

            <div
                @click="showModal = true"
                class="rounded-sm hover:bg-gray-200 p-2 underline cursor-pointer mt-2"
            >Create a new board...</div>
            <modal
                :width="300"
                :height="250"
                :show="showModal"
                @closed="showModal = false"
            >
                Modal
            </modal>
        </dropdown-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";

import DropdownMenu from "../components/DropdownMenu";
import UserBoards from "./../graphql/UserBoards.gql"
import { colorMap100, colorMap200 } from "../utils";
import Modal from "./Modal";

export default {
    name: "UserBoardsDropdown",
    components: {
        DropdownMenu,
        Modal
    },
    data() {
        return {
            showBoards: false,
            showModal: false
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user.id
        }),
        colorMap100: () => colorMap100,
        colorMap200: () => colorMap200
    },
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
