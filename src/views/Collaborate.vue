<template>
  <div>
    <!-- TODO Add Info/Error Dialog -->
    <div id="canvasSizer" ref="canvasSizer">
      <canvas id="preview" ref="preview"></canvas>
    </div>
    <div class="form-group ">
      <label for="email">Email</label>
      <input class="form-control" id="email" placeholder="you@example.com" v-model="email" />
      <label for="exampleCode ">Code</label>
      <textarea class="form-control " id="exampleCode" rows="7" readonly v-model="code"></textarea>
    </div>
    <div class="d-flex align-items-end pb-2 justify-content-end">
      <button type="button" class="order-1 btn btn-md btn-primary mr-2">Tweet!</button>
      <button type="button" class="order-2 btn btn-md btn-primary ml-2" @click="saveData()">Collaborate!</button>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
import { toBlob } from "@/utils/utils";
import { saveUserResponse } from "@/utils/apiUtils.js";
export default {
  props: ["userResponse"],
  data() {
    return {
      email: "",
      code: "",
      canvas: {},
      imgLeft: 0,
      imgTop: 0,
      imgAngle: 0,
      imgSelectable: false,
      imgHoverCursor: "default",
      imgScaleWidth: 1024,
      imgScaleHeight: 512
    };
  },
  methods: {
    saveData() {
      let vm = this;
      let userData = new FormData();
      let imageData = this.canvas.toDataURL({
        format: "png",
        multiplier: 1
      });
      userData.append("avatar", toBlob(imageData), "avatar.png");
      userData.set("email", this.email);
      userData.set(
        "userResponses",
        JSON.stringify(this.userResponse.userResponses)
      );

      saveUserResponse(userData)
        .then(res => {
          if (res.status === 200) {
            vm.$store.dispatch("clearSnapshot");
            vm.$store.dispatch("clearAvatar");
            vm.$router.replace("/");
          }
        })
        .catch(err => {
          console.log("Error", err);
          //TODO show error dialog ??
        });
    },
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

        fabric.Image.fromURL(vm.$store.getters.avatar, img => {
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
      }
    }
  },
  mounted() {
    var vm = this;
    this.renderImageCanvas();
  }
};
</script>

<style lang="scss" scoped>
</style>
