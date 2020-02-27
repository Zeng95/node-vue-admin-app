<template>
  <header id="header" class="position-absolute">
    <b-navbar type="light" class="h-100 bg-transparent">
      <b-navbar-brand href="#">首页</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="语言" right>
            <b-dropdown-item href="#">中文</b-dropdown-item>
            <b-dropdown-item href="#">English</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>admin</em>
            </template>
            <b-dropdown-item href="#">
              <b-icon-house-fill></b-icon-house-fill>
              <span>首页</span>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <b-icon-person-fill></b-icon-person-fill>
              <span>个人中心</span>
            </b-dropdown-item>
            <hr />
            <b-dropdown-item href="#">
              <b-icon-power></b-icon-power>
              <span>退出登录</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { BIconPower, BIconHouseFill, BIconPersonFill } from 'bootstrap-vue'

export default {
  components: {
    BIconPower,
    BIconHouseFill,
    BIconPersonFill
  }
}
</script>

<style lang="scss" scoped>
#header {
  top: 0;
  right: 0;
  left: 260px;
  height: 70px;

  .navbar {
    border-bottom: 1px solid #cfcfca;
  }
}
</style>
