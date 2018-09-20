<template>
  <!-- this is part of the bootstrap structure you should have -->
  <div>
    <!--   the gallery starts here -->
    <ul class="list-unstyled demo-gallery">
      <li v-for="avatar in avatars" v-bind:key="avatar.email">
        <img :src="imgUrl(avatar)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["avatars"],
  methods: {
    imgUrl(img) {
      if (img) {
        return img.url;
      }
      return null;
    }
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