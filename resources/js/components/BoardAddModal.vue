<template>
    <modal
        :width="400"
        :height="250"
        :show="show"
        @closed="$emit('closed')"
    >
        <div class="flex">
            <div class="rounded-sm p-4 text-black w-full mr-2" :class="[colors[color]]">
                <input
                    v-model.trim="title"
                    type="text"
                    placeholder="Add board title"
                    class="title rounded-sm text-white outline-none py-1 px-2 font-bold w-full hover:opacity-50 placeholder-gray-100"
                />
            </div>
            <div>
                <div
                    class="flex justify-between mb-2"
                    v-for="(row, i) in colorGrid"
                    :key="i"
                >
                    <board-color
                        v-for="(c, i) in row"
                        :key="i"
                        :color="c"
                        :active-color="color"
                        @changed="color = $event"
                    />
                </div>
            </div>
        </div>

        <div class="mt-4">
            <button
                @click="addBoard"
                :disabled="cannotCrete"
                :class="[colors[color]]"
                class="disabled:opacity-25 rounded-sm py-2 px-4 text-white cursor-pointer hover:opacity-75"
            >
                <i class="fas fa-plus mr-2"></i>
                Create
            </button>
        </div>
    </modal>
</template>

<script>
import { mapState } from "vuex";

import Modal from "./Modal";
import BoardColor from "./BoardColor";
import { colorGrid, colorMap500 } from "../utils";
import BoardAdd from '../graphql/BoardAdd.gql';
import UserBoards from '../graphql/UserBoards.gql';

export default {
    props: {
        show: Boolean
    },
    name: "BoardAddModal",
    components: {
        Modal,
        BoardColor
    },
    data() {
        return {
            color: "orange",
            title: null
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user.id
        }),
        colors: () => colorMap500,
        colorGrid: () => colorGrid,
        cannotCrete() {
            return this.title === null || this.title.length === 0;
        }
    },
    methods: {
        addBoard() {
            const self = this;

            this.$apollo.mutate({
               mutation: BoardAdd,
               variables: {
                   title: this.title,
                   color: this.color
               },
               update(store, { data: { boardAdd } }) {
                    const data = store.readQuery({
                        query: UserBoards,
                        variables: { userId: self.userId }
                    });

                    data.userBoards.push(boardAdd);

                    store.writeQuery({
                        query: UserBoards,
                        data,
                        variables: { userId: self.userId }
                    });

                    self.$emit("closed");
               }
            });
        }
    }
}
</script>

<style scoped>
    .title {
        background-color: hsla(0, 0%, 100%, 0);
    }

    .title:hover,
    .title:focus {
        background-color: hsla(0, 0%, 100%, .2);
    }
</style>
