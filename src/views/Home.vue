<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <h4 class="display-3" id="preTitle">powered by Red Hat</h4>
        <h2>
          Collaborate <br> by Code
        </h2>
      </div>
    </div>
    <div class="container">
      <home/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
import Home from "@/components/Home.vue"; // @ is an alias to /src
export default {
  components: {
    Home
  }
};
</script>
