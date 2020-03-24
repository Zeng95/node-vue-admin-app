<template>
  <header id="header" class="position-fixed bg-white">
    <!-- Navbar -->
    <b-navbar type="light" class="h-100">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="px-3" href="#">首页</b-nav-item>
          <b-nav-item class="px-3" href="#">用户</b-nav-item>
          <b-nav-item class="px-3" href="#">设置</b-nav-item>
        </b-navbar-nav>

        <!-- 右侧的导航项 -->
        <b-navbar-nav class="ml-auto align-items-center">
          <!-- 通知 -->
          <b-nav-item-dropdown right :no-caret="true" class="mx-2">
            <template v-slot:button-content>
              <b-icon-bell class="icon d-block"></b-icon-bell>
              <b-badge class="position-absolute" variant="danger" pill>
                4
              </b-badge>
            </template>

            <b-dropdown-item href="#">a</b-dropdown-item>
            <b-dropdown-item href="#">b</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- 任务 -->
          <b-nav-item-dropdown right :no-caret="true" class="mx-2">
            <template v-slot:button-content>
              <b-icon-list-task class="icon d-block"></b-icon-list-task>
              <b-badge class="position-absolute" variant="warning" pill>
                20
              </b-badge>
            </template>

            <b-dropdown-item href="#">a</b-dropdown-item>
            <b-dropdown-item href="#">b</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- 邮件 -->
          <b-nav-item-dropdown right :no-caret="true" class="mx-2">
            <template v-slot:button-content>
              <b-icon-envelope class="icon d-block"></b-icon-envelope>
              <b-badge class="position-absolute" variant="primary" pill>
                8
              </b-badge>
            </template>

            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- 头像 -->
          <b-nav-item-dropdown right lazy class="mx-2">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <b-img
                v-if="user"
                class="avatar"
                :src="user.avatar"
                fluid
                alt="头像"
              ></b-img>
            </template>

            <b-dropdown-item :to="{ name: 'Dashboard' }">
              <span>首页</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'Profile' }">
              <span>个人中心</span>
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item @click="handleLogout">
              <span>退出登录</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Subheader -->
    <div class="subheader w-100 px-3 border-top">
      <b-breadcrumb class="bg-transparent mb-0">
        <b-breadcrumb-item href="#home">Home</b-breadcrumb-item>
        <b-breadcrumb-item href="#">Dashboard</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
  </header>
</template>

<script>
import { BIconListTask, BIconEnvelope, BIconBell } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    // BIconThreeDotsVertical
    BIconBell,
    BIconListTask,
    BIconEnvelope
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      await this.logout()

      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  top: 0;
  right: 0;
  left: 260px;
  z-index: 100;
  box-shadow: 0 2px 2px 0 rgba(60, 75, 100, 0.14),
    0 3px 1px -2px rgba(60, 75, 100, 0.12), 0 1px 5px 0 rgba(60, 75, 100, 0.2);

  .navbar {
    .hamburger-container {
      margin-right: 12px;
      width: 40px;
      height: 40px;
      outline: none;
    }

    .icon {
      width: 24px;
      height: 24px;
    }

    .badge {
      top: 0;
      left: 55%;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  .subheader {
    height: 48px;
  }
}
</style>
