<template>
  <nav id="sidebar" class="position-fixed h-100 text-white text-sm">
    <!-- Logo -->
    <div class="logo position-relative px-3">
      <router-link :to="{ name: 'Home' }" class="d-block text-white">
        <!-- Logo Image -->
        <div class="logo-img">
          <img
            src="../../assets/images/vue-logo.png"
            alt="Vue Logo"
            width="18px"
            height="18px"
          />
        </div>
        <!-- Project Name -->
        <h1 class="d-inline-block text-sm">Vue 后台管理系统</h1>
      </router-link>
    </div>

    <!-- User -->
    <div
      class="user d-flex justify-content-around position-relative align-items-center px-3"
    >
      <!-- Avatar -->
      <div class="avatar">
        <img
          src="../../assets/images/vue-logo.png"
          alt="avatar"
          width="18px"
          height="18px"
        />
      </div>

      <!-- Name -->
      <div class="name">Leo Zeng</div>

      <!-- Icon -->
      <span class="icon-menu-down d-inline-block"></span>
    </div>

    <!-- Navigation -->
    <b-nav vertical class="w-100">
      <b-nav-item active>
        <span>首页</span>
      </b-nav-item>
      <b-nav-item v-b-toggle.collapse-1>
        <span>信息管理</span>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text">Collapse contents Here</p>
            <b-button v-b-toggle.collapse-1-inner size="sm">
              Toggle Inner Collapse
            </b-button>
            <b-collapse id="collapse-1-inner" class="mt-2">
              <b-card>Hello!</b-card>
            </b-collapse>
          </b-card>
        </b-collapse>
      </b-nav-item>
    </b-nav>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#sidebar {
  top: 0;
  left: 0;
  width: 260px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('../../assets/images/sidebar.jpg') no-repeat center/cover;

  .logo,
  .user {
    padding: 18px 0;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 15px;
      width: calc(100% - 30px);
      height: 1px;
      background-color: rgba(181, 181, 181, 0.2);
    }
  }

  .logo {
    .logo-img {
      display: inline-block;
      width: 34px;
      height: 34px;
      line-height: 34px;
      margin-left: 7px;
      margin-right: 10px;
      background: #fff;
      border-radius: 40px;
      text-align: center;
    }
  }

  .user {
    .icon-menu-down {
      width: 0;
      height: 0;
      border-top: 4px solid;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
  }
}
</style>
