<template>
  <div>
    <photo-preview :snapshotData="snapshotData"></photo-preview>
    <question-options :questions="questions" />
  </div>
</template>

<script>
// API
import { getQuestions } from "@/utils/apiUtils";

// Components
import questionOptions from "@/components/quiz/QuestionOptions.vue";
import photoPreview from "@/components/photo/PhotoPreview.vue";

export default {
  props: {
    snapshotData: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      questions: [],
      nextIdx: 0,
      imageData: null
    };
  },
  components: {
    questionOptions,
    photoPreview
  },
  mounted() {
    getQuestions()
      .then(data => (this.questions = data))
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question {
  border: 1px solid teal;
}
#preview {
  border: 2px black;
}
.qpanel {
  padding: 20px;
}
</style>
