import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

import Quiz from "@/views/Quiz.vue";
import Canvas from "@/views/Canvas.vue";
import Collaborate from "@/views/Collaborate.vue";

Vue.use(Router);

export default new Router({
  routes: [
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
      props: true
    },
    {
      path: "/quiz",
      name: "quiz",
      component: Quiz
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
