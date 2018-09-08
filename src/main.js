import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";

Vue.use(Vuex);

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
  router,
  render: h => h(App)
}).$mount("#app");
