<template>
  <div class="header-wrapper">
    <header class="header bg-white rounded-xl shadow">
      <!-- Navbar -->
      <b-navbar type="light">
        <b-navbar-brand class="pl-3">
          <b-icon-list @click="handleMinimizeSidebar"></b-icon-list>
        </b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item class="px-3" link-classes="text-body">首页</b-nav-item>
          <b-nav-item class="px-3" link-classes="text-body">用户</b-nav-item>
          <b-nav-item class="px-3" link-classes="text-body">设置</b-nav-item>
        </b-navbar-nav>

        <!-- 右侧的导航项 -->
        <b-navbar-nav class="ml-auto align-items-center">
          <!-- 通知 -->
          <b-nav-item-dropdown right :no-caret="true" class="mx-2">
            <template v-slot:button-content>
              <b-icon-bell class="icon d-block"></b-icon-bell>
              <b-badge class="position-absolute" variant="danger" pill>
                5
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
          <b-nav-item-dropdown right :no-caret="true" class="mx-2">
            <template v-slot:button-content>
              abc
              <!-- <b-img
                  v-if="user"
                  class="avatar"
                  :src="user.avatar"
                  fluid
                  alt="头像"
                ></b-img> -->
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
      </b-navbar>

      <!-- Subheader -->
      <div class="subheader w-100 px-3 border-top">
        <b-breadcrumb class="mb-0 bg-transparent align-items-center">
          <b-breadcrumb-item :to="{ name: 'Home' }">
            <b-icon-house-door
              class="icon-house"
              variant="info"
            ></b-icon-house-door>
          </b-breadcrumb-item>

          <b-breadcrumb-item active class="text-info">
            Dashboard
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>
    </header>
  </div>
</template>

<script>
import {
  BIconList,
  BIconBell,
  BIconListTask,
  BIconEnvelope,
  BIconHouseDoor
} from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BIconList,
    BIconBell,
    BIconListTask,
    BIconEnvelope,
    BIconHouseDoor
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleMinimizeSidebar() {
      alert(1)
    },
    async handleLogout() {
      await this.logout()

      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  padding: 1.3rem 30px 0;

  .navbar {
    .navbar-brand {
      margin-left: -2px;
    }

    .hamburger-container {
      margin-right: 12px;
      width: 40px;
      height: 40px;
      outline: none;
    }

    .icon {
      width: 18px;
      height: 18px;
    }

    .badge {
      top: 0;
      left: 55%;
    }

    .avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .subheader {
    height: 48px;

    .icon-house {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
