<template>
  <div class="contanier">
    <div class="row">
      <div class="col-2">&nbsp;</div>
      <div class="col-4">
        <video ref="webcam" width="500" height="500" id="webcam" style="display: none">
        </video>
        <canvas id="c" width="1024" height="512"></canvas>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-2">&nbsp;</div>
      <div class="col-6">
        <button @click="takeSnapshot()" class="btn active">I am looking good!</button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

import { fabric } from "fabric";

export default {
  data() {
    return {
      canvas: {},
      webcam: {},
      snapshot: ""
    };
  },
  methods: {
    takeSnapshot() {
      this.snapshot = this.canvas.toDataURL({
        format: "png"
      });
      this.$store.dispatch("previewSnapshot", this.snapshot);
    },
    getUserMedia() {
      var userMediaFunc =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      if (userMediaFunc) userMediaFunc.apply(navigator, arguments);
    },
    renderWebcam() {
      var vm = this;
      fabric.util.requestAnimFrame(function render() {
        vm.canvas.renderAll();
        fabric.util.requestAnimFrame(render);
      });
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas("c");
    var webcamEl = this.$refs.webcam;
    //console.log('webcam el', webcam);
    this.webcam = new fabric.Image(webcamEl, {
      left: 300,
      top: 200,
      angle: -180,
      originX: "center",
      originY: "center",
      flipY: true,
      selectable: false
    });
    // adding webcam video element
    var vm = this;
    this.getUserMedia(
      { video: true },
      function getWebcamAllowed(stream) {
        webcamEl.srcObject = stream;
        vm.canvas.add(vm.webcam);
        vm.webcam.moveTo(0); // move webcam element to back of zIndex stack
        vm.webcam.getElement().play();
      },
      function getWebcamNotAllowed(e) {
        // block will be hit if user selects "no" for browser "allow webcam access" prompt
      }
    );
    this.renderWebcam();
  }
};
</script>

<style  lang="scss" scoped>
.btn {
  text-transform: none;
}
#c {
  position: relative;
  overflow: hidden;
}
</style>
