import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

import Quiz from "@/views/Quiz.vue";
import Canvas from "@/views/Canvas.vue";
import Collaborate from "@/views/Collaborate.vue";
import Auth from "@/components/Auth";

import { store } from "./store/store";
import { keyCloak } from "./keycloak/keycloak";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/canvas",
    name: "canvas",
    component: Canvas
  },
  {
    path: "/collaborate",
    name: "collaborate",
    component: Collaborate,
    props: true,
    beforeEnter(to, from, next) {
      // console.log("Access Token:", store.getters.accessToken);
      // console.log("Token Expired:", JSON.stringify(keyCloak.tokenParsed));
      if (store.getters.accessToken && keyCloak.tokenParsed) {
        next();
      }
    }
  },
  {
    path: "/quiz",
    name: "quiz",
    component: Quiz,
    beforeEnter(to, from, next) {
      //console.log("Access Token:", store.getters.accessToken);
      //console.log("Token Parsed:", JSON.stringify(keyCloak.tokenParsed));
      if (store.getters.accessToken && keyCloak.tokenParsed) {
        next();
      } else {
        next("/auth/quiz");
      }
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
  },
  {
    path: "/auth/:next",
    name: "auth",
    component: Auth
  },
  {
    path: "/login",
    redirect: "/auth/home"
  },
  {
    path: "/logout",
    beforeEnter(to, from, next) {
      //console.log("Keycloak Logout URL", keyCloak.logoutUrl());
      keyCloak.logout();
      //window.location  = keyCloak.logoutUrl();
    }
  }
];

export const router = new VueRouter({ routes, mode: "history" });
