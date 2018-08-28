import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

export const eventBus = new Vue({
  methods: {
    snapshot(snapshotImg) {
      this.$emit("changeComponent");
      this.$emit("snapshotTaken", snapshotImg);
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
