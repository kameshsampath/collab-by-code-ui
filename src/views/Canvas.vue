<template>
  <div>
    <img :src="img" v-for="img in avatars" />
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      avatars: [],
      index: null
    };
  },
  mounted() {
    var vm = this;
    const avatarSocket = io(`${process.env.VUE_APP_SOCKET_URL}`);
    avatarSocket.on("connect", () => {
      console.log("Connected to Avatar Socket");
    });
    avatarSocket.on("c_avatars", data => {
      const imgReader = new FileReader();
      const blob = new Blob([data], { type: "image/png" });
      imgReader.onload = event => {
        var result = event.target.result;
        vm.avatars.push(result);
      };
      imgReader.readAsDataURL(blob);
    });

    // avatarSocket.on("disconnect", () => {
    //   console.log("Disconnected from Avatar Socket");
    // });
  }
};
</script>

<style lang="scss" scoped>
</style>
