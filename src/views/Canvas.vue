<template>
  <!-- this is part of the bootstrap structure you should have -->
  <div id="avatarCarousel" ref="myCarousel" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <gallery v-for="(page,index) in pages" :avatars="page" class="carousel-item active" v-if="index===0" />
      <gallery :avatars="page" class="carousel-item" v-else />
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
      currentPage: 0
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
      return this.$store.getters.pages;
    }
  },
  created() {
    const avatarSocket = io(`${process.env.VUE_APP_SOCKET_URL}`);
    avatarSocket.on("connect", () => {
      this.$store.dispatch("clearAvatars");
      //console.log("Connected to Avatar Socket");
      this.$store.dispatch("fetchAvatars");
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
</style>
