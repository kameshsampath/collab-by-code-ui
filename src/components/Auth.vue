<template>
  <div></div>
</template>

<script>
import { store } from "../store/store";
import { keyCloak } from "../keycloak/keycloak";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    const vm = this;
    let nextRoute = vm.$route.params["next"];
    if (!store.state.accessToken) {
      keyCloak.init({
        onLoad: "login-required"
      });
    }
    this.$nextTick(() => {
      keyCloak.onAuthSuccess = () => {
        console.log("Auth Success");
        store.dispatch("saveToken", keyCloak.token);
        vm.$router.push({ name: nextRoute });
      };

      keyCloak.onAuthError = err => {
        console.log("Auth Failed", JSON.stringify(err));
      };
    });
  }
};
</script>
