import { createApp } from 'vue'

import * as VueRouter from 'vue-router';
import Vue3Toastify from 'vue3-toastify';
import VueCryptojs from 'vue-cryptojs';

import App from './App.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Recipe from './views/Recipe.vue'
import AddNew from './views/AddNew.vue'
import ModifyView from './views/Modify.vue';
import RegisterView from './views/Register'

import './global/style.css'
import './registerServiceWorker'


const routes = [{
    path: "/",
    name: "login",
    component: Login,
},
{
    path: "/home",
    name: "home",
    component: Home,
}, {
    path: "/recipe",
    name : "recipe",
    component: Recipe,
}, {
    path: "/add",
    name: "add",
    component: AddNew
}, {
    path: "/modify",
    name: "modify",
    component: ModifyView,
} , {
    path: "/register",
    name: "register",
    component: RegisterView,
}];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: routes,
});


let app = createApp(App)

const toast_options = {autoClose: 3000,};

app.use(router).use(VueCryptojs).use(Vue3Toastify, toast_options).mount('#app');
