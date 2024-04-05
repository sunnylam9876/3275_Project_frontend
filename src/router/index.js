import { createWebHistory, createRouter } from "vue-router";
//import UserLogin from "../components/UserLogin.vue";
import HomePage from "../components/HomePage.vue";
import WriterFunction from "../components/WriterFunction.vue";

const routes = [
    {
        path: "/",
        alias: "/home",
        name: "homePage",
        component: HomePage
    },

    {
        path: "/writer",        
        name: "writer",
        component: WriterFunction
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;