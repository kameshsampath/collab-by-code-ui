<template>
  <footer class="bg-dark footer pl-5">
    <div class="footer-menu">
      <div class="row">
        <div class="col-md-3 align-self-start">
          <a class="copyright">© 2018 Red Hat Inc.</a>
        </div>
        <div class="col-md-6 footer-legal">
          <a href="http://www.redhat.com/en/about/privacy-policy" title="Red Hat Privacy Policy">
            <span class="small">Privacy Statement</span>
          </a>
          <a href="http://www.redhat.com/en/about/terms-use" title="Red Hat Terms of Use">
            <span class="small">Terms of Use</span>
          </a>
          <a class="item-last" href="http://www.redhat.com/en/about/all-policies-guidelines" title="Red Hat Policies and Guidelines">
            <span class="small">All policies and guidelines</span>
          </a>
        </div>
        <div class="col-md-2 text-right align-self-end powered-by-openshift">
          <a href="https://www.openshift.com/" title="Powered by OpenShift Online" class="openshift-online">
            <img alt="Powered by OpenShift Online" src="https://www.openshift.com/images/logos/powered_by_openshift_reverse.png">
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.bg-dark {
  background-color: #1a1a1a;
}

.footer {
  background-color: #1a1a1a;
  color: #5e6a71;
}
.footer-menu {
  & a.copyright {
    color: #858585;
    text-decoration: none;
  }
  & .footer-legal {
    & a {
      font-size: 14px;
      color: #858585;
    }
    & a:not(.item-last):after {
      content: "|";
      margin: 0 10px;
    }
  }
}
</style>
