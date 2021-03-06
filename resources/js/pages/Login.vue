<template>
    <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
        <div class="container mt-2 sm:mt-10 flex flex-col items-center">
            <div class="text-3xl text-blue-700 font-bold mb-10">
                <span>
                    <i class="fab fa-trello mr-1"></i>
                </span>
                <span>Laravello</span>
            </div>

            <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12">
                <errors :errors="errors" />

                <div class="w-full text-center text-blue-600 font-bold mb-8">Log in to Laravello</div>

                <form @submit.prevent="authenticate">
                    <div class="w-full mb-4">
                        <div class="flex items-center">
                            <i class="far fa-envelope mr-2 input-icon"></i>
                            <input
                                type="email"
                                v-model="email"
                                class="rounded-sm w-full text-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2"
                                placeholder="Enter email"
                            />
                        </div>

                    </div>
                    <div class="w-full mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-key mr-2 input-icon"></i>
                            <input
                                type="password"
                                v-model="password"
                                class="rounded-sm w-full text-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <div class="w-full mb-6 flex justify-center">
                        <button
                            type="submit"
                            class="rounded-2xl w-2/3 disabled:opacity-25 text-white px-4 py-2 text-sm bg-green-400 font-bold outline-none focus:outline-none hover:bg-opacity-75"
                        >
                            <i class="fas fa-sign-in-alt mr-1"></i>
                            Login
                        </button>
                    </div>

                    <div class="bg-gray-400 h-px w-full mb-6"></div>

                    <div class="text-center text-sm">
                        <router-link
                            :to="{name: 'register'}"
                            class="text-blue-600 hover:underline"
                        >Sign up for an account</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import Login from "../graphql/Login.gql";
import Errors from "../components/Errors";
import { gqlErrors } from "../utils";

export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null,
            errors: []
        }
    },
    components: {
        Errors
    },
    methods: {
        ...mapActions([
            'setLoggedIn',
            'setUser'
        ]),
        async authenticate() {
            this.errros = [];

            try {
                const result = await this.$apollo.mutate({
                    mutation: Login,
                    variables: {
                        email: this.email,
                        password: this.password
                    }
                });
                const user = result?.data?.login;

                if (user) {
                    this.setUser(user);
                    this.setLoggedIn(true);

                    this.$router.push({
                        name: "board",
                        params: {
                            id: 1
                        }
                    });
                }
            } catch (err) {
                this.errors = gqlErrors(err);
            }
        }
    }
}
</script>

<style scoped>
    .container {
        width: 300px;
        max-width: 300px;
    }

    form i.input-icon {
        font-weight: bold;
        font-size: 25px;
        color: #50509b;
    }

    @media (min-width: 640px) {
        .container {
            width: 400px;
            max-width: 400px;
        }
    }

    input {
        border-radius: 7px;
    }
</style>
