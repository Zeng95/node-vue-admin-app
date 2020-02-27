<template>
  <div class="wrapper w-100 h-100">
    <!-- Navbar -->
    <AppNavbar />

    <!-- Sidebar -->
    <AppSidebar />

    <!-- Page Content -->
    <AppMain />
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
