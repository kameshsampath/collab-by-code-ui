<template>
  <footer role="contentinfo" class="footer">
    <ul class="rh-universal-footer-legal">
      <li>
        <a class="copyright">Copyright © 2018 Red Hat Inc.</a>
      </li>
      <ul class="rhd-menu">
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
    <a href="https://www.openshift.com/" title="Powered by OpenShift Online" class="powered-by-openshift-online">
      <img alt="Powered by OpenShift Online" src="https://www.openshift.com/images/logos/powered_by_openshift_reverse.png">
    </a>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: block;
}

.powered-by-openshift-online {
  grid-column-start: 1;
  grid-column-end: -1;
  justify-self: end;
}
.footer {
  background-color: #1a1a1a;
  flex: 0 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #5e6a71;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.footer {
  padding: 1em;
}
.rh-universal-footer-legal {
  grid-column-start: 1;
  grid-column-end: -1;
  justify-self: start;
  margin-left: 0;
  margin: 0.5em 1em;
  padding-left: 0;
  list-style: none;
  & li {
    margin: 0;
    display: inline;
  }
  & li a {
    font-size: 14px;
    color: #858585;
    display: inline;
  }
  & li a.copyright {
    width: 220px;
    cursor: default;
    text-decoration: none;
    margin-right: 3em;
  }
  .rhd-menu {
    display: inline;
    overflow: hidden;
    list-style: none;
    padding-left: 0;
    margin: 0;
    & li {
      margin: 0;
      display: inline;
      padding: 0;
    }

    & li:not(:last-child)::after {
      content: "|";
      margin: 0 10px;
      display: inline-block;
    }
  }
}
</style>
