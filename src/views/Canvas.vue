<template>
  <div class="container-fluid canvas">
    <!-- this is part of the bootstrap structure you should have -->
    <div id="avatarCarousel" ref="avatarCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <gallery v-for="(page,index) in pages" :avatars="page" class="carousel-item active" v-if="index===0" v-bind:key="index" />
        <gallery :avatars="page" class="carousel-item" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import * as _ from "lodash";
import { getAvatars } from "@/utils/apiUtils";
import Gallery from "@/components/canvas/Gallery";

export default {
  data() {
    return {
      isCycling: false
    };
  },
  computed: {
    avatars() {
      return this.pages[this.currentPage];
    },
    pageSize() {
      return this.$store.getters.pageSize;
    },
    pages() {
      if (!this.isCycling) {
        $(this.$refs.avatarCarousel).carousel("cycle");
      }
      return this.$store.getters.pages;
    }
  },
  mounted() {
    if (!this.isCycling && this.pages) {
      $(this.$refs.avatarCarousel).carousel("cycle");
    }
  },
  updated() {
    if (!this.isCycling && this.pages) {
      $(this.$refs.avatarCarousel).carousel("cycle");
    }
  },
  created() {
    const avatarSocket = io(`${process.env.VUE_APP_SOCKET_URL}`);
    avatarSocket.on("connect", () => {
      this.$store.dispatch("clearAvatars");
      //console.log("Connected to Avatar Socket");
      this.$store.dispatch("fetchAvatars");
      if (!this.isCycling && this.pages) {
        $(this.$refs.avatarCarousel).carousel("cycle");
      }
    });
    avatarSocket.on("c_avatars", data => {
      //console.log("Got new avatar",avatar);
      this.$store.dispatch("addAvatar", data);
    });
  },
  components: {
    Gallery
  }
};
</script>

<style scoped>
.canvas {
  margin-top: 7%;
}
</style>
