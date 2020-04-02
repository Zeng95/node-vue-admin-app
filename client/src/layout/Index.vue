<template>
  <div id="layout">
    <div id="sidebar" class="fixed-top bottom-0">
      <app-sidebar />
    </div>

    <div id="content">
      <app-navbar />

      <app-main />
    </div>
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar'
import AppNavbar from './components/AppNavbar'
import AppMain from './components/AppMain'

export default {
  components: {
    AppSidebar,
    AppNavbar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  width: 260px;
  background: url('../assets/images/sidebar.jpg') no-repeat center/cover;

  &::after,
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    content: '';
  }

  &::before {
    background: #000;
    opacity: 0.33;
  }

  &::after {
    background: linear-gradient(180deg, #292929 0, #0e0e0e);
    opacity: 0.67;
  }
}

#content {
  margin-left: 260px;
}
</style>
