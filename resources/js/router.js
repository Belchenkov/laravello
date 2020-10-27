import Vue from 'vue';
import VueRouter from 'vue-router';

import Board from "./pages/Board";
import Login from "./pages/Login";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "board",
        component: Board
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
];

export default new VueRouter({
   routes,
   mode: 'history'
});
