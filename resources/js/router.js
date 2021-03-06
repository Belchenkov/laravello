import Vue from 'vue';
import VueRouter from 'vue-router';

import Board from "./pages/Board";
import Login from "./pages/Login";
import Register from "./pages/Register";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "root",
        redirect: '/board/1'
    },
    {
        path: "/board/:id",
        name: "board",
        component: Board
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    }
];

export default new VueRouter({
   routes,
   mode: 'history'
});
