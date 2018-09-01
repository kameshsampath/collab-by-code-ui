<template>
  <div class="container">
    <div class="d-flex align-items-start">
      <canvas id="preview" width="1024" height="512"></canvas>
      <!-- <img :src="userResponse.avatar" alt="Click Image to Tweet! " class="p-2" width="1024" height="512" /> -->
    </div>
    <div class="form-group ">
      <label for="email">Email</label>
      <input class="form-control" id="email" placeholder="you@example.com" v-model="email" />
      <label for="exampleCode ">Code</label>
      <textarea class="form-control " id="exampleCode" rows="7" readonly v-model="code"></textarea>
    </div>
    <div class="d-flex align-items-end pb-2 justify-content-end">
      <button type="button " class="order-1 btn btn-md btn-primary mr-2">Tweet!</button>
      <button type="button " class="order-2 btn btn-md btn-primary ml-2" @click="saveData()">Collaborate!</button>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
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
      let userData = new FormData();
      let imageData = this.canvas.toDataURL();
      const blob = new Blob([imageData], { type: "octet/stream" });
      //console.log(blob);
      userData.append("avatar", blob, "avatar.png");
      userData.set("email", this.email);
      userData.set(
        "userRespones",
        JSON.stringify(this.userResponse.userResponses)
      );
      saveUserResponse(userData);
    }
  },
  mounted() {
    //console.log(this.userResponse);
    this.canvas = new fabric.Canvas("preview", {
      selectable: false
    });
    var vm = this;
    fabric.Image.fromURL(this.userResponse.avatar, img => {
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

<style lang="scss" scoped>
</style>
