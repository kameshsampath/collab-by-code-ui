<template>
  <!-- TODO footer -->
  <footer class="footer" role="contentinfo">
    <ul class="rh-legal">
      <li>
        <a class="copyright">Copyright © 2018 Red Hat Inc.</a>
      </li>
      <ul class="footer-menu">
        <li class="menu-item">
          <a href="http://www.redhat.com/en/about/privacy-policy" title="Red Hat Privacy Policy">Privacy Statement</a>
        </li>
        <li class="menu-item">
          <a href="http://www.redhat.com/en/about/terms-use" title="Red Hat Terms of Use">Terms of Use</a>
        </li>
        <li class="menu-item">
          <a href="http://www.redhat.com/en/about/all-policies-guidelines" title="Red Hat Policies and Guidelines">All policies and guidelines</a>
        </li>
      </ul>
    </ul>
    <a href="https://www.openshift.com/" title="Powered by OpenShift Online" class="openshift-online">
      <img alt="Powered by OpenShift Online" src="https://www.openshift.com/images/logos/powered_by_openshift_reverse.png">
    </a>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #1a1a1a;
  color: #5e6a71;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 50px;
  width: 100%;
  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(12, 1fr);
  padding: 15px 0 10px;
}
.footer ul {
  grid-column-start: 4;
  grid-column-end: 10;
  justify-self: center;
  list-style: none;
  margin: 0.5em 1em;
}
.footer-menu {
  display: inline;
  overflow: hidden;
  transition: max-height 0.5s;
  list-style: none;
  padding-left: 0;
  margin: 0;
  & li a {
    font-size: 14px;
    color: #858585;
    display: inline;
  }
}
.rh-legal {
  grid-column-start: 4;
  grid-column-end: 10;
  justify-self: center;
  margin: 0.5em 1em;
  padding-left: 0;
  list-style: none;
  & li {
    margin: 0;
    display: inline;
    padding: 0;
    a {
      font-size: 14px;
      color: #858585;
      display: inline;
    }
  }
  & li a.copyright {
    width: 220px;
    cursor: default;
    text-decoration: none;
    margin-right: 3em;
  }
}

.openshift-online {
  grid-column-start: 10;
  grid-column-end: 10;
  justify-self: end;
}
</style>
