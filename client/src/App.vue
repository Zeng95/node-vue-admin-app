<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'assets/css/utility.css';

@import 'assets/scss/custom.scss';
@import 'assets/scss/modal.scss';

@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

html {
  font-size: 0.875rem;
}

.form-control,
.custom-select {
  transition: box-shadow 0.3s ease;
}
</style>
