<template>
  <div>
    <div class="quiz row justify-content-center">
      <div class="col-8">
        <photo-preview :snapshotData="snapshotData"></photo-preview>
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
<style lang="scss" scoped>
</style>
