<template>
  <!-- this is part of the bootstrap structure you should have -->
  <div class="container-fluid">
    <!--   the gallery starts here -->
    <ul class="list-unstyled demo-gallery">
      <li v-for="avatar in avatars" v-bind:key="avatar.email">
        <img :src="imgUrl(avatar)">
      </li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";
import * as _ from "lodash";
import { getAvatars } from "@/utils/apiUtils";

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
    const avatarSocket = io(`${process.env.VUE_APP_SOCKET_URL}`);
    avatarSocket.on("connect", () => {
      //console.log("Connected to Avatar Socket");
      //Reload entire data to make sure no events is lost during disconnect
      getAvatars()
        .then(res => {
          const docs = res.data;
          vm.avatars = [];
          _.map(docs, e => {
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
.demo-gallery {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0.25rem;
  padding: 1rem;
}
.demo-gallery li {
  transition: 0.2s transform ease-in-out;
}
.demo-gallery img {
  width: 100%;
  display: block;
}

.demo-gallery li:hover {
  transform: scale3d(1.2, 1.2, 1) rotate(5deg);
  z-index: 2;
  box-shadow: 0 0.2rem 1rem -0.2rem rgba(0, 0, 0, 0.5);
}

.demo-gallery li:nth-child(4n-7):hover {
  transform: scale3d(1.2, 1.2, 1) rotate(-5deg);
}

.demo-gallery li:nth-child(3n-7):hover {
  transform: scale3d(1.2, 1.2, 1) rotate(-3deg);
}

.demo-gallery li:nth-child(5n-7):hover {
  /* or 4n+1 */
  transform: scale3d(1.2, 1.2, 1) rotate(3deg);
}
</style>
