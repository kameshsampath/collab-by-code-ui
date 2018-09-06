<template>
  <canvas id="preview" ref="preview"></canvas>
</template>

<script>
import { eventBus } from "@/main";
import { fabric } from "fabric";
import _ from "lodash";
import { getFrames } from "../../utils/apiUtils.js";
export default {
  props: ["snapshotData"],
  data() {
    return {
      canvas: {},
      imgLeft: 0,
      imgTop: 0,
      imgAngle: 0,
      imgSelectable: false,
      imgHoverCursor: "default",
      imgScaleWidth: 1024,
      imgScaleHeight: 512,
      frames: [],
      layerIndex: 1
    };
  },
  methods: {
    layerWidth() {
      return this.canvas.getObjects()[0].canvas.vptCoords.br.x;
    }
  },
  mounted() {
    var vm = this;
    var canvasEl = this.$refs.preview;
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width > 1024) {
      width = 1024;
    }
    var height = window.innerHeight > 0 ? window.innerHeight : screen.height;
    if (height > 512) {
      height = 512;
    }
    canvasEl.width = width;
    canvasEl.height = height;
    //TODO refresh this data in timed manner
    getFrames()
      .then(f => {
        vm.frames = f;
      })
      .catch(err => {
        console.log(err);
      });

    //console.log("After", canvasEl);

    eventBus.$on("photoFilter", (frame, qIndex) => {
      vm.layerIndex = qIndex + 1;
      var f = _.find(vm.frames, { id: frame });
      //console.log("To be applied frame :", JSON.stringify(f));
      fabric.Image.fromURL(`/frames/${f.filename}`, img => {
        img.set(f.settings);
        //console.log("Layer Index :", vm.layerIndex);
        const currLayerImg = vm.canvas.getObjects()[vm.layerIndex];
        if (currLayerImg) {
          vm.canvas.remove(currLayerImg);
        }
        vm.canvas.add(img);
        vm.canvas.moveTo(img, vm.layerIndex);
        vm.canvas.renderAll();
      });
    });

    vm.canvas = new fabric.Canvas("preview", {
      selectable: false,
      width: 1024,
      height: 512
    });

    vm.canvas.setDimensions({ width, height }, { cssOnly: true });

    fabric.Image.fromURL(this.snapshotData, img => {
      img.set({
        left: vm.imgLeft,
        top: vm.imgTop,
        angle: vm.imgAngle,
        selectable: vm.imgSelectable,
        hoverCursor: vm.imgHoverCursor
      });
      vm.canvas.add(img);
      vm.canvas.renderAll();
    });

    //Routing to Collaborate page
    eventBus.$on("collaborate", userResponse => {
      userResponse["avatar"] = this.canvas.toDataURL({ format: "png" });
      this.$router.push({ name: "collaborate", params: { userResponse } });
    });
  }
};
</script>
<style>
</style>
