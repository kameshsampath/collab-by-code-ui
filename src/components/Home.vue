<template>
  <div>
    <h3 class="body_title textBlack">{{msg}}</h3>
    <p class="lead body_content textBlack">
      Each of your answers to the following questions will generate a fragment of code, which will produce an object unique to you. Click tweet to watch your object get added to our collaborative canvas!
    </p>
    <p>
      <router-link to="/quiz" class="btn btn-secondary" tag="button">Get started</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      msg: ""
    };
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
