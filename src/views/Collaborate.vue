<template>
  <div class="container-fluid collaborate">
    <!-- TODO Add Info/Error Dialog -->
    <div class="quiz row justify-content-center">
      <div class="col-8">
        <div id="canvasSizer" ref="canvasSizer">
          <canvas id="preview" ref="preview"></canvas>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="form-group ">
          <label for="email">Email</label>
          <input class="form-control" id="email" placeholder="you@example.com" v-model="email" />
          <github-gist :gistId="gistId" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <button type="button" :class="enableSubmit" data-toggle="modal" data-target="#privacyModal" v-if="validateEmail">Collaborate!</button>
        <button type="button" :class="enableSubmit" v-else>Collaborate!</button>
      </div>
    </div>
    <!-- Modal -->
    <div class=" modal fade" id="privacyModal" ref="privacyModal" tabindex="-1" role="dialog" aria-labelledby="privacyModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="privacyModalLabel">Privacy Statement</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            By clicking 'collaborate' you are giving Red Hat permission to post your image on the Collaborate by Code canvas. Your contact information will only be used for the purposes of Collaborate by Code. View Red Hat's
            <a href="https://www.redhat.com/en/about/privacy-policy " target="_blank ">privacy statement</a>.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Disagree</button>
            <button type="button" class="btn btn-primary" @click="saveData">Agree</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
import { toBlob } from "@/utils/utils";
import { saveUserResponse } from "@/utils/apiUtils.js";
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
import githubGist from "@/components/GitHubGist.vue";
export default {
  props: ["userResponse"],
  data() {
    return {
      email: "",
      gistId: "8bf31b108449db1bba43d7c090db465b",
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
  components: {
    githubGist
  },
  computed: {
    enableSubmit() {
      var style = {
        "order-1": true,
        btn: true,
        "btn-md": true,
        "ml-2": true
      };
      if (this.validateEmail) {
        style["disabled"] = false;
        style["active"] = true;
        return style;
      } else {
        style["disabled"] = true;
        return style;
      }
    },
    validateEmail() {
      return EMAIL_REGEX.test(this.email);
    }
  },
  methods: {
    saveData() {
      $(this.$refs.privacyModal).modal("toggle");
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
.collaborate {
}
</style>
