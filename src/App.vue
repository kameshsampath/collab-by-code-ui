<template>
  <div id="app">
    <header role="banner">
      <nav id="nav" class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
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
            <li class="nav-item" v-if="isAuthenticated">
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
          <ul class="auth">
            <router-link v-if="!isAuthenticated" to="/login" tag="li">
              <a>
                <span class="icon">
                  <svg class="svg-inline--fa fa-user fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M256 0c88.366 0 160 71.634 160 160s-71.634 160-160 160S96 248.366 96 160 167.634 0 256 0zm183.283 333.821l-71.313-17.828c-74.923 53.89-165.738 41.864-223.94 0l-71.313 17.828C29.981 344.505 0 382.903 0 426.955V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-37.045c0-44.052-29.981-82.45-72.717-93.134z"></path>
                  </svg>
                </span>Login</a>
            </router-link>
            <router-link v-else to="/logout" tag="li">
              <a>
                <span class="icon">
                  <svg class="svg-inline--fa fa-user fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M256 0c88.366 0 160 71.634 160 160s-71.634 160-160 160S96 248.366 96 160 167.634 0 256 0zm183.283 333.821l-71.313-17.828c-74.923 53.89-165.738 41.864-223.94 0l-71.313 17.828C29.981 344.505 0 382.903 0 426.955V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-37.045c0-44.052-29.981-82.45-72.717-93.134z"></path>
                  </svg>
                </span>Logout</a>
            </router-link>
          </ul>
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
import { keyCloak } from "./keycloak/keycloak";

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
      window.location = keyCloak.logoutUrl();
      //keyCloak.logout();
      //this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss">
body,
html {
  font-size: 100%;
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

#preTitle {
  color: black;
  font-size: 13px;
  font-weight: bold;
}

#nav {
  a {
    display: block;
    text-decoration: none;
    color: #999;
    text-transform: uppercase;
    font-size: 14px;
    &.router-link-exact-active {
      color: #fff;
      border-bottom-color: #c00;
      border-bottom-style: solid;
      border-bottom-width: 3px;
    }
  }
}

.jumbotron {
  margin-top: 5.3%;
  background-color: #c50001;
  background-image: url(./assets/img/shapes.svg);
  background-size: 65%;
  margin-bottom: 3%;
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

.auth {
  list-style: none;
  margin: 0;
  & li {
    a {
      font-size: 16px !important;
      text-transform: none !important;
      color: #fff !important;
      font-weight: 400 !important;
    }
  }
  & .icon {
    margin-right: 10px;
    color: #fff;
  }
  .fa-user {
    width: 14px;
  }
  svg:not(:root).svg-inline--fa {
    overflow: visible;
  }
  .svg-inline--fa.fa-w-16 {
    width: 1em;
  }
  .svg-inline--fa {
    display: inline-block;
    font-size: inherit;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
  }
}
</style>
