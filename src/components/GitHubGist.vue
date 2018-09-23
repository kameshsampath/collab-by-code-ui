<template>
  <div class="d-flex flex-column mt-2">
    <div class="align-self-start">
      <p>
        <span>Example Code</span>
      </p>
    </div>
    <div class="align-self-center" v-if="!gistContent">
      <i class="fa fa-spinner fa-spin" style="font-size:48px;color:#CC0000"></i>
    </div>
    <div class="align-self-strech flex-grow-1" v-else v-html="gistContent">
    </div>
  </div>
</template>

<script>
import { getGist } from "../utils/apiUtils";
export default {
  props: ["gistId"],
  data() {
    return {
      gistContent: ""
    };
  },
  mounted() {
    getGist(this.gistId)
      .then(res => {
        this.gistContent = res.data;
      })
      .catch(err => {
        console.log("error", err);
      });
  }
};
</script>

<style scoped>
@import url("https://assets-cdn.github.com/assets/gist-embed-c2b1c51a2a8f23e346b3b1581e388f48.css");
</style>
