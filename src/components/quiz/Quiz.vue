<template>
  <div class="quiz .container-fluid">
    <div class="row">
      <div class="col-sm">
        <photo-preview :snapshotData="snapshotData"></photo-preview>
      </div>
      <div class="col-sm">
        <div class="qpanel panel panel-default">
          <div class="panel-body">
            <question-options :questions="questions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// API
import { getQuestions } from "@/utils/apiUtils";

// Components
import questionOptions from "./QuestionOptions.vue";
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
