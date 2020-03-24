<template>
  <main class="content float-right h-100">
    <transition name="fade">
      <router-view />
    </transition>
  </main>
</template>

<style lang="scss" scoped>
.content {
  padding: 30px 15px;
  padding-top: 150px;
  width: calc(100% - 260px);
  background-color: #eee;
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
