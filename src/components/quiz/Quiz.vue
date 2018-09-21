<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <photo-preview :snapshotData="snapshotData"></photo-preview>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <question-options/>
      </div>
    </div>
  </div>
</template>

<script>
// API
import { getQuestions } from "@/utils/apiUtils";

// Components
import questionOptions from "@/components/quiz/QuestionOptions.vue";
import photoPreview from "@/components/photo/PhotoPreview.vue";

export default {
  computed: {
    snapshotData() {
      return this.$store.getters.snapshot;
    }
  },
  data: function() {
    return {
      nextIdx: 0,
      imageData: null
    };
  },
  components: {
    questionOptions,
    photoPreview
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-danger {
  background-color: #a30000 !important;
}
</style>
