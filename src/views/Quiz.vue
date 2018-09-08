<template>
  <div class="quiz">
    <div class="container">
      <component :is="selectedComponent" :snapshotData="snapshotData" :questions="questions">
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
  props: ["questions"],
  data() {
    return { selectedComponent: "photoBooth", snapshotData: "" };
  },
  components: {
    photoBooth,
    quiz
  },
  mounted() {
    eventBus.$on("changeComponent", snapshotData => {
      this.snapshotData = snapshotData;
      this.selectedComponent = "quiz";
    });
  }
};
</script>
