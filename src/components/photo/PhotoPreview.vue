<template>
  <div>
    <canvas id="preview" width="1024" height="512"></canvas>
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
  mounted() {
    var vm = this;
    //TODO refresh this data in timed manner
    getFrames()
      .then(f => {
        vm.frames = f;
      })
      .catch(err => {
        console.log(err);
      });
    //TODO Fix this
    // async () => {
    //   try {
    //     console.log("+++");
    //     vm.frames = await getFrames();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    eventBus.$on("photoFilter", (frame, qIndex) => {
      vm.layerIndex = qIndex + 1;
      var f = _.find(vm.frames, { id: frame });
      //console.log("To be applied frame :", JSON.stringify(f));
      fabric.Image.fromURL(`/frames/${f.filename}`, img => {
        img.set(f.settings).scaleToWidth(f.scaleWidth);
        console.log("Layer Index :", vm.layerIndex);
        const currLayerImg = vm.canvas.getObjects()[vm.layerIndex];
        if (currLayerImg) {
          vm.canvas.remove(currLayerImg);
        }
        vm.canvas.add(img);
        vm.canvas.moveTo(img, vm.layerIndex);
        vm.canvas.renderAll();
      });
    });

    this.canvas = new fabric.Canvas("preview", {
      selectable: false
    });

    fabric.Image.fromURL(this.snapshotData, img => {
      img
        .set({
          left: vm.imgLeft,
          top: vm.imgTop,
          angle: vm.imgAngle,
          selectable: vm.imgSelectable,
          hoverCursor: vm.imgHoverCursor
        })
        .scaleToWidth(this.imgScaleWidth)
        .scaleToHeight(this.imgScaleHeight);
      vm.canvas.add(img);
      vm.canvas.renderAll();
    });
  }
};
</script>
<style>
</style>
