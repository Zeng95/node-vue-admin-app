<template>
  <main class="router-content">
    <transition name="fade">
      <router-view />
    </transition>
  </main>
</template>

<style lang="scss" scoped>
.router-content {
  padding: 30px 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
