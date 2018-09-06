<template>
  <!-- TODO footer -->
  <footer class="footer">
    <div class="container">
      <a href="https://www.openshift.com/" title="Powered by OpenShift Online">
        <img alt="Powered by OpenShift Online" src="https://www.openshift.com/images/logos/powered_by_openshift.png">
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
}
.footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}
.footer > .container a {
  float: right;
}
</style>
