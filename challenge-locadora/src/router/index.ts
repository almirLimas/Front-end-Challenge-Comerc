import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import RegisterUser from "@/views/RegisterUser.vue";
import RegisterClient from "@/views/RegisterClient.vue";
import UserList from "@/views/UserList.vue";
import ClientList from "@/views/ClientList.vue";
import FilmList from "@/views/FilmList.vue";
import LocationList from "@/views/LocationList.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/userList",
      name: "UserList",
      component: UserList,
    },
    {
      path: "/clientList",
      name: "ClientList",
      component: ClientList,
    },
    {
      path: "/filmList",
      name: "FilmList",
      component: FilmList,
    },
    {
      path: "/locationList",
      name: "LocationList",
      component: LocationList,
    },
    {
      path: "/registerUser",
      name: "RegisterUser",
      component: RegisterUser,
    },
    {
      path: "/registerClient",
      name: "RegisterClient",
      component: RegisterClient,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
