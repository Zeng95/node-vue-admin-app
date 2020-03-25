<template>
  <nav id="sidebar" class="position-fixed h-100 text-white text-sm">
    <!-- Logo -->
    <div class="logo position-relative px-3">
      <router-link
        :to="{ name: 'Home' }"
        class="d-flex justify-content-center align-items-center text-white"
      >
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
        <h1 class="d-inline-block text-sm mb-0">后台管理系统</h1>
      </router-link>
    </div>

    <!-- User -->
    <!-- <div
      class="user d-flex justify-content-around position-relative align-items-center px-3"
    > -->
    <!-- Avatar -->
    <!-- <div class="avatar">
        <img
          src="../../assets/images/vue-logo.png"
          alt="avatar"
          width="18px"
          height="18px"
        />
      </div> -->

    <!-- Name -->
    <!-- <div class="name" v-if="user">{{ user.name }}</div> -->

    <!-- Icon -->
    <!-- <span class="icon-menu-down d-inline-block"></span> -->
    <!-- </div> -->

    <!-- Navigation -->
    <b-nav vertical pills class="w-100 mt-3 px-3">
      <b-nav-item class="position-relative">
        <b-icon-house-door-fill
          class="sidebar-nav-icon ml-n3"
        ></b-icon-house-door-fill>
        <span>首页</span>
      </b-nav-item>

      <b-nav-text class="font-weight-bold mt-3">主题</b-nav-text>

      <b-nav-item class="position-relative">
        <b-icon-droplet-fill
          class="sidebar-nav-icon ml-n3"
        ></b-icon-droplet-fill>
        <span>颜色</span>
      </b-nav-item>

      <b-nav-item class="position-relative">
        <b-icon-pencil class="sidebar-nav-icon ml-n3"></b-icon-pencil>
        <span>字体</span>
      </b-nav-item>

      <b-nav-text class="font-weight-bold mt-3">组件</b-nav-text>

      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <b-nav-toggle
          target="base"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <!-- Icon | 图标 -->
          <b-icon-layers-fill
            class="sidebar-nav-icon ml-n3"
          ></b-icon-layers-fill>

          <!-- Text | 文字 -->
          <span>基础</span>

          <!-- Arrow | 箭头 -->
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <b-collapse is-nav id="base" accordion="accordion">
          <b-nav vertical>
            <!-- 面包屑 -->
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>面包屑</span>
            </b-nav-item>

            <!-- 卡片 -->
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>卡片</span>
            </b-nav-item>

            <!-- 走马灯 -->
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>走马灯</span>
            </b-nav-item>

            <!-- 折叠面板 -->
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>折叠面板</span>
            </b-nav-item>

            <!-- 弹出框 -->
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>弹出框</span>
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-nav-item>

      <!-- 按钮 -->
      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <b-nav-toggle
          target="buttons"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <!-- Icon | 图标 -->
          <b-icon-cursor-fill
            class="sidebar-nav-icon ml-n3"
          ></b-icon-cursor-fill>

          <!-- Text | 文字 -->
          <span>按钮</span>

          <!-- Arrow | 箭头 -->
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <b-collapse is-nav id="buttons" accordion="accordion">
          <b-nav vertical>
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>按钮</span>
            </b-nav-item>

            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>按钮下拉菜单</span>
            </b-nav-item>

            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>按钮组</span>
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-nav-item>

      <!-- 图表 -->
      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <b-nav-toggle
          target="chart"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <!-- Icon | 图标 -->
          <b-icon-pie-chart-fill
            class="sidebar-nav-icon ml-n3"
          ></b-icon-pie-chart-fill>

          <!-- Text | 文字 -->
          <span>图表</span>

          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <b-collapse is-nav id="chart" accordion="accordion">
          <b-nav vertical>
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>Chart.js</span>
            </b-nav-item>

            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>ECharts</span>
            </b-nav-item>

            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>Highcharts</span>
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-nav-item>

      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-card-text class="sidebar-nav-icon ml-n3"></b-icon-card-text>
          <span>表单</span>
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <!-- Collapse -->
        <b-collapse is-nav id="nav_collapse">
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

      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-star-fill class="sidebar-nav-icon ml-n3"></b-icon-star-fill>
          <span>图标</span>
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <!-- Collapse -->
        <b-collapse is-nav id="nav_collapse">
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

      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-bell-fill class="sidebar-nav-icon ml-n3"></b-icon-bell-fill>
          <span>通知</span>
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <!-- Collapse -->
        <b-collapse is-nav id="nav_collapse">
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

      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-table class="sidebar-nav-icon ml-n3"></b-icon-table>
          <span>表格</span>
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <!-- Collapse -->
        <b-collapse is-nav id="nav_collapse">
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

      <b-nav-text class="font-weight-bold mt-3">附加</b-nav-text>

      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-book-half class="sidebar-nav-icon ml-n3"></b-icon-book-half>
          <span>错误页面</span>
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <!-- Collapse -->
        <b-collapse is-nav id="nav_collapse">
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
import { mapGetters } from 'vuex'
import {
  BIconTable,
  BIconPencil,
  BIconCircle,
  BIconBookHalf,
  BIconStarFill,
  BIconBellFill,
  BIconCardText,
  BIconLayersFill,
  BIconCursorFill,
  BIconDropletFill,
  BIconPieChartFill,
  BIconHouseDoorFill
} from 'bootstrap-vue'

export default {
  components: {
    BIconTable,
    BIconPencil,
    BIconCircle,
    BIconBookHalf,
    BIconStarFill,
    BIconBellFill,
    BIconCardText,
    BIconLayersFill,
    BIconCursorFill,
    BIconDropletFill,
    BIconPieChartFill,
    BIconHouseDoorFill
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  data() {
    return {
      isCollapseVisible: false
    }
  },
  methods: {
    handleNavbarToggle() {
      this.isCollapseVisible = !this.isCollapseVisible
    }
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

    &.rotate0 {
      transform: rotate(0);
    }
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

  .navbar-toggler {
    padding: 0.8445rem 1rem;
    transition: all 0.5s ease;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 47px;
      border-radius: 6px;
      background-color: white;
      content: '';
      opacity: 0;
      transition: all 0.5s ease;
      pointer-events: none;
    }

    &:hover {
      &::before {
        opacity: 0.08;
      }

      & > * {
        transform: translateX(5px);
      }

      .icon-menu-down {
        transform: translateX(5px) rotate(90deg);
      }
    }

    &[aria-expanded='true'] {
      margin-bottom: 8px;

      &::before {
        opacity: 0.08;
      }

      &:hover {
        .icon-menu-down {
          transform: translateX(5px) rotate(0deg);
        }
      }

      .icon-menu-down {
        transform: rotate(0deg);
      }
    }

    & > * {
      transition: transform 0.25s ease;
    }

    .icon-menu-down {
      transition: all 0.2s ease-out;
    }

    .sidebar-nav-icon {
      width: 56px;
    }
  }

  .navbar-collapse {
    opacity: 0;
    transition: all 0.3s ease;

    &.show {
      opacity: 1;
    }

    .nav-item {
      &:last-child {
        padding-bottom: 8px;
      }
    }

    .nav-link {
      padding: 0.8445rem 1rem;

      &:hover {
        color: white;

        & > * {
          transform: translateX(5px);
        }

        .sidebar-nav-icon {
          transform: translateX(5px) scale(0.55);
        }
      }

      & > * {
        transition: transform 0.25s ease;
      }

      .sidebar-nav-icon {
        width: 56px;
      }
    }
  }
}
</style>
