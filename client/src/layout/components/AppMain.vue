<template>
  <main class="main-panel float-right h-100">
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.main-panel {
  width: calc(100% - 260px);
  padding-top: 70px;
  background-color: #eee;
}
</style>
