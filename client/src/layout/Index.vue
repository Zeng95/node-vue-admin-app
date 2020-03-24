<template>
  <div class="wrapper w-100 h-100">
    <!-- Page Navbar -->
    <AppNavbar />

    <!-- Page Content -->
    <AppMain />

    <!-- Page Sidebar -->
    <AppSidebar />
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
