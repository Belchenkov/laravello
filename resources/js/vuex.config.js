import Vue from 'vue';
import Vuex from 'vuex';

import apollo from './apollo.config';
import Me from './graphql/Me.gql';

Vue.use(Vuex);

const store = {
    state: {
        isLoggedIn: false,
        user: {
            id: null,
            name: null,
            email: null
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        userInfo(state) {
            return state.user;
        }
    },
    mutations: {
        setLoggedIn(state, payload) {
            state.isLoggedIn = Boolean(payload);
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async setLoggedIn({ commit }, payload) {
            const isLoggedIn = Boolean(payload);

            localStorage.setItem('isLoggedIn', isLoggedIn);

            commit('setLoggedIn', isLoggedIn);
        },
        async setUser({ commit }, payload) {
            localStorage.setItem('user', JSON.stringify(payload));

            commit('setUser', payload);
        },
        async logout({ commit }) {
            localStorage.removeItem('user');

            commit("setUser", {
                id: null,
                name: null,
                email: null
            });

            dispatch("setLoggedIn", false);
        },
        async fetchCurrentUser({ commit, dispatch }, user) {
            if (user) {
                commit("setUser", user);
                dispatch("setLoggedIn", true);
            } else {
                dispatch("logout");
            }
        }
    }
};

export default new Vuex.Store(store);
