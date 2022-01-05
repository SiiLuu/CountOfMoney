import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Account from "@/views/Account.vue";
import Preferences from "@/views/Preferences.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Hero from "@/views/Hero.vue";
import Prices from "@/views/Prices/Prices.vue";
import News from "@/views/News/News.vue";
import SpecificNews from "@/views/News/SpecificNews.vue";
import SpecificPrice from "@/views/Prices/SpecificPrice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/",
        name: "Home",
        component: Hero,
      },
      {
        path: "/prices",
        name: "Prices",
        component: Prices,
      },
      {
        path: "/prices/:cmid",
        name: "SpecificPrices",
        component: SpecificPrice,
      },
      {
        path: "/news",
        name: "SpecificNews",
        component: News,
      },
      {
        path: "/news/:id",
        name: "News",
        component: SpecificNews,
      },
      {
        path: "/account",
        name: "Account",
        component: Account,
      },
      {
        path: "/preferences",
        name: "Preferences",
        component: Preferences,
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
