<template>
  <div class="d-flex flex-column">
    <appHeader role="header" />
    <main role="main" class="container-fluid py-3 flex-fill">
      <router-view/>
    </main>
    <appFooter role="footer" class="container-fluid" />
  </div>
</template>

<script>
import appHeader from "@/components/Header";
import appFooter from "@/components/Footer";
import { keyCloak } from "./keycloak/keycloak";

export default {
  components: {
    appHeader,
    appFooter
  }
};
</script>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

* {
  font-family: "Overpass", "Open Sans", "Arial", "Helvetica", "sans-serif";
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

h2 {
  color: white;
  font-size: 72px;
  font-weight: lighter;
}

.btn {
  border-radius: 0rem;
}

button {
  text-transform: uppercase;
  text-decoration: none;
  font-size: 16px;
  background: #c00;
  font-weight: 600;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.btn {
  border: 1px solid #c00;
  line-height: 1.44;
  color: #c00;
  background-color: transparent;
  padding: 8px 40px;
  display: inline-block;
}

button:hover:not(.disabled) {
  color: #fff;
  background-color: #c00;
}
</style>
