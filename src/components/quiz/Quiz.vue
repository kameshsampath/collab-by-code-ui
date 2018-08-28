<template>
  <div class="quiz .container-fluid">
    <div class="row">
      <div class="col-lg-8">
        <h3>Preview here </h3>
        <!-- <photo-preview></photo-preview> -->
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body">
        <question-options :questions="questions" />
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

// API
import { getQuestions } from "@/utils/apiUtils";

// Components
import questionOptions from "./QuestionOptions.vue";
import photoPreview from "@/components/photo/PhotoPreview.vue";

export default {
  data: function() {
    return {
      questions: [],
      nextIdx: 0
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
</style>
