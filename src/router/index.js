import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "../components/UserLogin.vue";
import UserLogout from "../components/UserLogout.vue";
import UserRegister from "../components/UserRegister.vue";
import HomePage from "../components/HomePage.vue";
import WriterPage from "../components/WriterPage.vue";
import ReaderPage from "../components/ReaderPage.vue";
import AdminPage from "../components/AdminPage.vue";
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
        path: "/logout",        
        name: "logout",
        component: UserLogout
    },

    {
        path: "/home",        
        name: "homepage",
        component: HomePage
    },

    {
        path: "/writer",        
        name: "writer",
        component: WriterPage
    },

    {
        path: "/createarticle",        
        name: "createarticle",
        component: CreateArticle
    },

    {
        path: "/reader",        
        name: "reader",
        component: ReaderPage
    },

    {
        path: "/admin",        
        name: "admin",
        component: AdminPage
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;