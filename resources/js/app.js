import Vue from 'vue';

import './bootstrap';
import router from "./router";
import apolloProvider from './apollo.config';
import Board from "./pages/Board";

window.Vue = Vue;

Vue.component('board', Board);

const app = new Vue({
    el: '#app',
    router,
    apolloProvider
});
