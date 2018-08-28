<template>
  <div class="preview">
    <img :src="imageData" height="auto" width="auto" />
  </div>
</template>

<script>
// Vue
import { eventBus } from "@/main";

export default {
  data: () => {
    return {
      imageData: ""
    };
  },
  methods: {
    previewSnapshot() {
      eventBus.$on("snapshotTaken", snapshotImg => {
        console.log("Preview Snapshot");
        this.imageData = snapshotImg;
      });
    }
  },
  created() {
    this.previewSnapshot();
  },
  activated() {
    this.previewSnapshot();
  }
};
</script>


<style scoped>
.preview {
  border: 1px solid goldenrod;
}
</style>
