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
    <home msg="Take the quiz to begin collaborating by code." />
  </div>
</template>

<style lang="scss">
.btn {
  border-radius: 0rem;
}
</style>


<script>
import Home from "@/components/Home.vue"; // @ is an alias to /src
export default {
  components: {
    Home
  }
};
</script>
