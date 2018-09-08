<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col">
        <video ref="webcam" height="360" width="500" id="webcam" style="display: none">
        </video>
        <canvas id="c" width="1024" height="512"></canvas>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col">
        <button @click="takeSnapshot()" class="btn btn-primary active">I am looking good!</button>
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
      eventBus.previewSnapshot(this.snapshot);
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
      angle: 360,
      originX: "center",
      originY: "center"
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
