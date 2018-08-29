<template>
  <div class="row">
    <div class="col">
      <svg id="preview" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="480">
        <image :xlink:href="snapshotData" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["snapshotData"]
};
</script>
<style>
.preview {
  border: 1px solid darkred;
}
</style>
