<template>
  <div class="container-fluid">
    <canvas id="preview" ref="preview"></canvas>
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
      let imageData = this.canvas.toDataURL();
      userData.append("avatar", toBlob(imageData), "avatar.png");
      userData.set("email", this.email);
      userData.set(
        "userRespones",
        JSON.stringify(this.userResponse.userResponses)
      );

      saveUserResponse(userData)
        .then(res => {
          if (res.status === 200) {
            vm.$router.replace("/");
          }
        })
        .catch(err => {
          console.log("Error", err);
        });
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

    //console.log(this.userResponse);
    this.canvas = new fabric.Canvas("preview", {
      selectable: false,
      width: 1024,
      height: 512
    });

    vm.canvas.setDimensions({ width, height }, { cssOnly: true });
    fabric.Image.fromURL(this.userResponse.avatar, img => {
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
  }
};
</script>

<style lang="scss" scoped>
</style>
