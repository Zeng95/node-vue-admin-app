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
      <div class="name" v-if="user">{{ user.name }}</div>

      <!-- Icon -->
      <span class="icon-menu-down d-inline-block"></span>
    </div>

    <!-- Navigation -->
    <b-nav vertical class="w-100">
      <b-nav-item>
        <b-icon-house-door-fill
          class="sidebar-nav-icon ml-n3"
        ></b-icon-house-door-fill>
        <span>首页</span>
      </b-nav-item>

      <b-nav-text class="font-weight-bold mt-3">主题</b-nav-text>

      <b-nav-item>
        <b-icon-droplet-fill
          class="sidebar-nav-icon ml-n3"
        ></b-icon-droplet-fill>
        <span>颜色</span>
      </b-nav-item>

      <b-nav-item>
        <b-icon-pencil class="sidebar-nav-icon ml-n3"></b-icon-pencil>
        <span>字体</span>
      </b-nav-item>

      <b-nav-text class="font-weight-bold mt-3">组件</b-nav-text>

      <b-nav-item>
        <b-icon-cursor-fill class="sidebar-nav-icon ml-n3"></b-icon-cursor-fill>
        <span>按钮</span>
        <span class="icon-menu-down ml-auto"></span>
      </b-nav-item>

      <b-nav-item>
        <b-icon-bar-chart-fill
          class="sidebar-nav-icon ml-n3"
        ></b-icon-bar-chart-fill>
        <span>图表</span>
        <span class="icon-menu-down ml-auto"></span>
      </b-nav-item>

      <b-nav-item>
        <b-icon-card-text class="sidebar-nav-icon ml-n3"></b-icon-card-text>
        <span>表单</span>
        <span class="icon-menu-down ml-auto"></span>
      </b-nav-item>

      <b-nav-item>
        <b-icon-star-fill class="sidebar-nav-icon ml-n3"></b-icon-star-fill>
        <span>图标</span>
        <span class="icon-menu-down ml-auto"></span>
      </b-nav-item>

      <b-nav-item>
        <b-icon-bell-fill class="sidebar-nav-icon ml-n3"></b-icon-bell-fill>
        <span>通知</span>
        <span class="icon-menu-down ml-auto"></span>
      </b-nav-item>

      <b-nav-item>
        <b-icon-table class="sidebar-nav-icon ml-n3"></b-icon-table>
        <span>表格</span>
        <span class="icon-menu-down ml-auto"></span>
      </b-nav-item>

      <b-nav-text class="font-weight-bold mt-3">附加</b-nav-text>

      <b-nav-item>
        <b-icon-book-half class="sidebar-nav-icon ml-n3"></b-icon-book-half>
        <span>错误页面</span>
        <span class="icon-menu-down ml-auto"></span>
      </b-nav-item>
    </b-nav>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  BIconTable,
  BIconPencil,
  BIconStarFill,
  BIconBellFill,
  BIconCardText,
  BIconCursorFill,
  BIconDropletFill,
  BIconBarChartFill,
  BIconHouseDoorFill,
  BIconBookHalf
} from 'bootstrap-vue'

export default {
  components: {
    BIconTable,
    BIconPencil,
    BIconBookHalf,
    BIconStarFill,
    BIconBellFill,
    BIconCardText,
    BIconCursorFill,
    BIconDropletFill,
    BIconBarChartFill,
    BIconHouseDoorFill
  },
  computed: {
    ...mapGetters('auth', ['user'])
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  top: 0;
  left: 0;
  width: 260px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('../../assets/images/sidebar.jpg') no-repeat center/cover;

  .icon-menu-down {
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    transform: rotate(90deg);
  }

  .logo,
  .user {
    padding: 18px 0;

    &::before {
      position: absolute;
      right: 15px;
      bottom: 0;
      width: calc(100% - 30px);
      height: 1px;
      background-color: rgba(181, 181, 181, 0.2);
      content: '';
    }
  }

  .logo {
    .logo-img {
      display: inline-block;
      margin-right: 10px;
      margin-left: 7px;
      width: 34px;
      height: 34px;
      border-radius: 40px;
      background: #fff;
      text-align: center;
      line-height: 34px;
    }
  }

  .user {
    .name {
      text-transform: capitalize;
    }
  }

  .navbar-text {
    padding: 0.75rem 1rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 90%;
  }

  .nav-item {
    height: 56px;
    line-height: 56px;
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 100%;
    color: white;

    .sidebar-nav-icon {
      flex: 0 0 60px;

      & + span {
        margin-left: 10px;
      }
    }
  }
}
</style>
