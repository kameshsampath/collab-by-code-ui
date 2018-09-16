<template>
  <div id="canvasSizer" ref="canvasSizer">
    <canvas id="preview" ref="preview"></canvas>
  </div>
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
      imgLeft: -10,
      imgTop: 0,
      imgAngle: 0,
      imgSelectable: false,
      imgHoverCursor: "default",
      imgScaleWidth: 1024,
      imgScaleHeight: 512,
      imgCurrentWidth: 0,
      imgCurrentHeight: 0,
      frames: [],
      layerIndex: 1,
      canvasScaleFactor: 0
    };
  },
  methods: {
    renderImageCanvas() {
      var vm = this;
      let canvasSizer = this.$refs.canvasSizer;
      if (canvasSizer) {
        vm.canvas = new fabric.Canvas("preview", {
          selectable: false,
          width: vm.imgScaleWidth,
          height: vm.imgScaleHeight,
          containerClassName: "preview",
          preserveObjectStacking: true,
          originX: "left",
          originY: "center"
        });

        let canvasScaleFactor = canvasSizer.offsetWidth / vm.imgScaleWidth;
        let width = canvasSizer.offsetWidth;
        let height = canvasSizer.offsetHeight;

        var ratio = vm.canvas.getWidth() / vm.canvas.getHeight();
        if (width / height > ratio) {
          width = height * ratio;
        } else {
          height = width / ratio;
        }

        vm.canvas.setDimensions({ width, height });

        fabric.Image.fromURL(this.snapshotData, img => {
          img.set({
            left: vm.imgLeft,
            top: vm.imgTop,
            angle: vm.imgAngle,
            selectable: vm.imgSelectable,
            hoverCursor: vm.imgHoverCursor
          });
          img.scaleToWidth(width);
          img.scaleToHeight(height);
          vm.canvas.add(img);
          vm.canvas.renderAll();
        });
        vm.canvasScaleFactor = canvasScaleFactor;
        vm.imgCurrentWidth = width;
        vm.imgCurrentHeight = height;
      }
    }
  },
  mounted() {
    var vm = this;
    vm.renderImageCanvas();
    this.$nextTick(() => {
      window.addEventListener("resize", function() {
        vm.renderImageCanvas();
      });
    });

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
      fabric.Image.fromURL(`/frames/${f.filename}`, img => {
        img.set({
          left: 20,
          top: 0,
          angle: 0,
          selectable: false,
          hoverCursor: "default"
        });
        img.scaleToHeight(vm.imgCurrentHeight * 0.8);
        const currLayerImg = vm.canvas.getObjects()[vm.layerIndex];
        if (currLayerImg) {
          vm.canvas.remove(currLayerImg);
        }
        vm.canvas.add(img);
        vm.canvas.moveTo(img, vm.layerIndex);
        vm.canvas.renderAll();
      });
    });

    //Routing to Collaborate page
    eventBus.$on("collaborate", userResponse => {
      userResponse["avatar"] = this.canvas.toDataURL({
        format: "png",
        multiplier: 2
      });
      this.$router.push({ name: "collaborate", params: { userResponse } });
    });
  }
};
</script>
<style>
.preview {
  border: 1px solid black;
}
</style>
