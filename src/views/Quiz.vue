<template>
  <div class="container">
    <div class="row quiz">
      <div class="col">
        <div class="progress" style="height: 40px;">
          <div class="progress-bar bg-danger" role="progressbar" :style="progressStyle" :aria-valuenow="progress" aria-valuemin="25" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
    <appMessages/>
    <div class="row justify-content-center">
      <component :is="selectedComponent">
      </component>
    </div>
  </div>
</template>

<script>
// Vue
import { eventBus } from "@/main";

// Components
import photoBooth from "@/components/photo/PhotoBooth.vue";
import appMessages from "@/components/AppMessages.vue";
import quiz from "@/components/quiz/Quiz.vue";

export default {
  data() {
    return {
      selectedComponent: "photoBooth"
    };
  },
  computed: {
    progress() {
      return this.$store.getters.progress;
    },
    progressStyle() {
      return {
        width: this.progress + "%"
      };
    }
  },
  components: {
    photoBooth,
    quiz,
    appMessages
  },
  mounted() {
    this.$store.dispatch("fetchQuestions");
    this.$store.dispatch("clearProgress");
    eventBus.$on("changeComponent", () => {
      this.selectedComponent = "quiz";
      this.$store.dispatch("progress", 1);
    });
  }
};
</script>

<style lang="scss" scoped>
.quiz {
  margin-bottom: 7%;
}
.bg-danger {
  background-color: #a30000 !important;
}
</style>
