import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store/store";
Vue.config.productionTip = false;

export const eventBus = new Vue({
  methods: {
    previewSnapshot() {
      this.$emit("changeComponent");
    },
    photoFilter(frame, nextIdx) {
      this.$emit("photoFilter", frame, nextIdx);
    },
    collaborate(userResponse) {
      //console.log("", userResponse);
      this.$emit("collaborate", userResponse);
    },
    progress(progressStep) {
      this.$emit("progress", progressStep);
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
