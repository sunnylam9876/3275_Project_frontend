import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "../components/UserLogin.vue";
import UserRegister from "../components/UserRegister.vue";
import HomePage from "../components/HomePage.vue";
import WriterFunction from "../components/WriterFunction.vue";
import CreateArticle from "../components/CreateArticle.vue";

const routes = [
    {
        path: "/",
        alias: "/login",
        name: "userlogin",
        component: UserLogin
    },

    {
        path: "/register",        
        name: "register",
        component: UserRegister
    },

    {
        path: "/home",        
        name: "homepage",
        component: HomePage
    },

    {
        path: "/writer",        
        name: "writer",
        component: WriterFunction
    },

    {
        path: "/createarticle",        
        name: "createarticle",
        component: CreateArticle
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;