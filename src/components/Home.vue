<template>
  <div class="container">
    <h1>
      <span class="field field--name-title field--type-string field--label-hidden">{{title}}</span>
    </h1>
    <div class="content">
      <p>{{msg}}</p>
    </div>
    <router-link to="/quiz" class="btn btn-secondary" tag="button">Get started</router-link>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      title: "Take our quiz to begin collaborating by code",
      msg: `You’ll start by taking a photo of yourself, and then answer 3 questions. Each answer will apply a filter to your photo. At the end, you’ll be able to add it to the canvas of photos from all participants. We’ll also email the photo to you so that you can share it on social media.`
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  &:hover {
    color: #fff;
    background-color: #c00;
  }
}

h1 {
  color: #242424;
  font-size: 23px;
  font-weight: 500;
  line-height: 1.24;
  margin-top: 16px;
  margin-bottom: 16px;
}

.field--name-title {
  margin-bottom: 10px;
}

.content p {
  margin-top: 0;
  font-size: 15px;
  line-height: 1.6;
}
</style>
