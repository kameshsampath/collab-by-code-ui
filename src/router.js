import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import QuizView from "./views/QuizView.vue";
import Canvas from "./views/Canvas.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizView
    },
    {
      path: "/canvas",
      name: "canvas",
      component: Canvas
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
