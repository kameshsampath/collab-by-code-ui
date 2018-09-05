<template>
  <div class="grid" id="grid" ref="grid">
    <div class="grid-sizer"></div>
    <div class="grid-item" v-for="avatar in avatars" v-bind:key="avatar.email">
      <img :src="imgUrl(avatar)">
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import * as _ from "lodash";
import { getAvatars } from "@/utils/apiUtils";

import * as Masonry from "masonry-layout";

let imagesloaded = require("imagesloaded");

export default {
  data() {
    return {
      avatars: [],
      index: 0
    };
  },
  methods: {
    imgUrl(img) {
      if (img) {
        return img.url;
      }
      return null;
    }
  },
  mounted() {
    var vm = this;
    var grid = this.$refs.grid;

    var msnry = new Masonry(grid, {
      columnWidth: ".grid-sizer",
      percentPosition: true,
      itemSelector: ".grid-item"
    });

    imagesloaded(grid, { background: true }).on("progress", () => {
      msnry.layout();
    });
    const avatarSocket = io(`${process.env.VUE_APP_SOCKET_URL}`);
    avatarSocket.on("connect", () => {
      //console.log("Connected to Avatar Socket");
      //Reload entire data to make sure no events is lost during disconnect
      getAvatars()
        .then(res => {
          const docs = res.data;
          vm.avatars = [];
          const imgUrls = _.map(docs, e => {
            vm.avatars.push({
              email: e.email,
              url: `${process.env.VUE_APP_COLLABORATORS_AVATAR_URL}/${e.avatar}`
            });
            return;
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
    avatarSocket.on("c_avatars", data => {
      vm.avatars.unshift({
        email: data.email,
        url: `${process.env.VUE_APP_COLLABORATORS_AVATAR_URL}/${data.avatar}`
      });
    });
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* force scrollbar */
html {
  overflow-y: scroll;
}

body {
  font-family: overpass;
}

/* ---- grid ---- */

.grid {
  background: #ddd;
}

/* clear fix */
.grid:after {
  content: "";
  display: block;
  clear: both;
}

/* ---- .grid-item ---- */

.grid-sizer,
.grid-item {
  width: 33.333%;
}

.grid-item {
  float: left;
}

.grid-item img {
  display: block;
  max-width: 100%;
}
</style>
