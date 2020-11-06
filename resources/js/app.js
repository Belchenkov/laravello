import Vue from 'vue';

import './bootstrap';
import store from './vuex.config';
import router from "./router";
import apolloProvider from './apollo.config';
import Board from "./pages/Board";

window.Vue = Vue;

Vue.component('board', Board);

const app = new Vue({
    el: '#app',
    store,
    router,
    apolloProvider
});
