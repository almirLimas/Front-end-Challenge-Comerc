import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "@/views/Home.vue";
import RegisterUser from "@/views/RegisterUser.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home,
    // },
    {
      path: "/",
      name: "RegisterUser",
      component: RegisterUser,
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
