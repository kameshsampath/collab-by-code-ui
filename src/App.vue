<template>
  <div id="app">
    <header>
      <nav id="nav" class="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <a class="navbar-brand" href="/">Collaborate by Code</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault" aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsDefault">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/">
                <span class="p-2">Home</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/quiz">
                <span class="p-2">Quiz</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/canvas">
                <span class="p-2">Canvas</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about">
                <span class="p-2">About</span>
              </router-link>
            </li>
          </ul>
          <form class="form-inline mt-2 mt-md-0">
            <router-link v-if="!isAuthenticated" to="/login" tag="button" class="btn btn-outline-success my-2 my-sm-0">Login</router-link>
            <button v-else @click="doLogout" class="btn btn-outline-success my-2 my-sm-0">Logout</button>
          </form>
        </div>
      </nav>
    </header>
    <main role="main">
      <router-view/>
    </main>
    <appFooter/>
  </div>
</template>

<script>
import appFooter from "@/components/Footer";
export default {
  components: {
    appFooter
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.authed;
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

body {
  padding-top: 3.5rem;
}

body {
  font-size: 16px;
  line-height: 1.5;
  font-family: "Overpass", sans-serif;
  margin-bottom: 60px;
}

.textBlack {
  color: black;
}

h2 {
  color: white;
  font-size: 72px;
  font-weight: lighter;
}

#preTitle {
  color: black;
  font-size: 13px;
  font-weight: bold;
}

#nav {
  a {
    font-weight: normal;
    color: #000;
    &.router-link-exact-active {
      background-color: lightgrey;
      border-bottom-color: darkred;
      border-bottom-style: solid;
      border-bottom-width: 5px;
    }
  }
}
.jumbotron {
  background-color: #c50001;
  background-image: url(./assets/img/shapes.svg);
  background-size: cover;
}
.body_content {
  font-size: 16px;
  width: 100%;
  font-weight: 300;
}

a.btn.btn-secondary {
  padding: 15px 30px;
  border-radius: 60px;
  font-family: "Overpass", sans-serif;
  background-color: #500000;
  color: white;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.btn:hover {
  background-color: #5c3e84;
}
</style>
