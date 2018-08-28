<template>
  <div class="booth">
    <div class="row">
      <div class="col-md-2">
        <video ref="video" id="video" muted="true" autoplay></video>
        <button id="snap" class="btn btn-secondary" @click="takeSnapshot()">Snap Photo</button>
      </div>
    </div>
    <div class="col-md-12">
      <canvas ref="canvas" id="canvas" width="500" height="500" hidden></canvas>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  data: () => {
    return {
      video: "",
      snapshot: "",
      canvas: ""
    };
  },
  methods: {
    takeSnapshot() {
      this.canvas = this.$refs.canvas;
      const context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      this.snapshot = this.canvas.toDataURL("image/png");
      eventBus.snapshot(this.snapshot);
    }
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
