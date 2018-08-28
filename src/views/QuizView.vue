<template>
  <div class="quiz">
    <div class="container">
      <keep-alive>
        <component :is="currComponent">
        </component>
      </keep-alive>
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
  data: () => {
    return {
      currComponent: "photoBooth"
    };
  },
  components: {
    photoBooth,
    quiz
  },
  mounted() {
    eventBus.$on("changeComponent", data => {
      this.currComponent = "quiz";
    });
  }
};
</script>
