import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store/store";
Vue.config.productionTip = false;

export const eventBus = new Vue({
  methods: {
    previewSnapshot(snapshotImg) {
      //console.log(snapshotImg);
      this.$emit("changeComponent", snapshotImg);
    },
    photoFilter(frame, nextIdx) {
      this.$emit("photoFilter", frame, nextIdx);
    },
    collaborate(userResponse) {
      //console.log("", userResponse);
      this.$emit("collaborate", userResponse);
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
