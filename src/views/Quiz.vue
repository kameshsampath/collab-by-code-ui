<template>
  <div class="quiz">
    <div class="container">
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
import quiz from "@/components/quiz/Quiz.vue";

export default {
  data() {
    return { selectedComponent: "photoBooth" };
  },
  components: {
    photoBooth,
    quiz
  },
  mounted() {
    eventBus.$on("changeComponent", () => {
      this.selectedComponent = "quiz";
    });
  }
};
</script>
