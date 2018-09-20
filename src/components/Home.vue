<template>
  <div>
    <h3 class="body_title textBlack">{{msg}}</h3>
    <p class="lead body_content textBlack">
      You’ll start by taking a photo of yourself, and then answer 3 questions. Each answer will apply a filter to your photo. At the end, you’ll be able to add it to the canvas of photos from all participants. We’ll also email the photo to you so that you can share it on social media.
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
      msg: "Take our quiz to begin collaborating by code."
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
