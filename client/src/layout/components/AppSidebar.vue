<template>
  <nav id="sidebar-content" class="d-flex flex-column h-100">
    <!-- Logo -->
    <div class="logo-container d-flex align-items-center text-white">
      <!-- Logo Image -->
      <div class="logo">
        <b-img src="../../assets/images/vue-logo.png" alt="Logo" />
      </div>

      <!-- Project Name -->
      <h1 class="d-inline-block text-base mb-0">
        后台管理系统
      </h1>
    </div>

    <!-- Scroll area -->
    <b-nav
      class="position-relative d-block pt-3 px-3 tracking-wide overflow-hidden"
      @wheel="handleSidebarScroll"
    >
      <b-nav-item
        link-classes="no-collapse position-relative d-flex align-items-center"
      >
        <b-icon-house-door-fill
          class="sidebar-nav-icon ml-n3"
        ></b-icon-house-door-fill>
        <span>首页</span>
      </b-nav-item>

      <!-- 主题 -->
      <b-nav-text class="font-weight-bold mt-3">主题</b-nav-text>

      <b-nav-item
        link-classes="no-collapse position-relative d-flex align-items-center"
      >
        <b-icon-droplet-fill
          class="sidebar-nav-icon ml-n3"
        ></b-icon-droplet-fill>
        <span>颜色</span>
      </b-nav-item>

      <b-nav-item
        link-classes="no-collapse position-relative d-flex align-items-center"
      >
        <b-icon-pencil class="sidebar-nav-icon ml-n3"></b-icon-pencil>
        <span>字体</span>
      </b-nav-item>

      <!-- 用户界面 -->
      <b-nav-text class="font-weight-bold mt-3">用户界面</b-nav-text>

      <!-- 信息管理 -->
      <b-nav-item link-classes="flex-column rounded-0 p-0">
        <b-nav-toggle
          target="data-list"
          class="d-flex align-items-center position-relative w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <!-- Icon | 图标 -->
          <b-icon-list-ul class="sidebar-nav-icon ml-n3"></b-icon-list-ul>

          <!-- Text | 文字 -->
          <span>信息管理</span>

          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <b-collapse is-nav id="data-list" accordion="accordion">
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

      <!-- 组件 -->
      <b-nav-item link-classes="flex-column rounded-0 p-0">
        <b-nav-toggle
          target="components"
          class="d-flex align-items-center position-relative w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-puzzle-fill
            class="sidebar-nav-icon ml-n3"
          ></b-icon-puzzle-fill>

          <span>组件</span>

          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <b-collapse is-nav id="components" accordion="accordion">
          <b-nav vertical>
            <!-- 面包屑 -->
            <b-nav-item
              :to="{ name: 'Breadcrumb' }"
              link-classes="d-flex align-items-center rounded-0"
              @click.stop
            >
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>面包屑</span>
            </b-nav-item>

            <!-- 卡片 -->
            <b-nav-item
              :to="{ name: 'Card' }"
              link-classes="d-flex align-items-center rounded-0"
              @click.stop
            >
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>卡片</span>
            </b-nav-item>

            <b-nav-item
              link-classes="d-flex align-items-center rounded-0"
              @click.stop
            >
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>警告</span>
            </b-nav-item>

            <!-- 走马灯 -->
            <b-nav-item
              link-classes="d-flex align-items-center rounded-0"
              @click.stop
            >
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>走马灯</span>
            </b-nav-item>

            <!-- 折叠面板 -->
            <b-nav-item
              link-classes="d-flex align-items-center rounded-0"
              @click.stop
            >
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>折叠面板</span>
            </b-nav-item>

            <!-- 弹出框 -->
            <b-nav-item
              link-classes="d-flex align-items-center rounded-0"
              @click.stop
            >
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>弹出框</span>
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-nav-item>

      <!-- 栅格系统 -->
      <b-nav-item link-classes="flex-column rounded-0 p-0">
        <b-nav-toggle
          target="grid"
          class="d-flex align-items-center position-relative w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <!-- Icon | 图标 -->
          <b-icon-grid-fill class="sidebar-nav-icon ml-n3"></b-icon-grid-fill>

          <!-- Text | 文字 -->
          <span>栅格系统</span>

          <!-- Arrow | 箭头 -->
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <b-collapse is-nav id="grid" accordion="accordion">
          <b-nav vertical>
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>Bootstrap</span>
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-nav-item>

      <!-- 扩展 -->
      <b-nav-item link-classes="flex-column rounded-0 p-0">
        <b-nav-toggle
          target="extensions"
          class="d-flex align-items-center position-relative w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-plus-square-fill
            class="sidebar-nav-icon ml-n3"
          ></b-icon-plus-square-fill>
          <span>扩展</span>
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <!-- 内容 -->
        <b-collapse is-nav id="extensions" accordion="accordion">
          <b-nav vertical>
            <b-nav-item link-classes="d-flex align-items-center rounded-0">
              <b-icon-circle
                class="sidebar-nav-icon ml-n3 scale-55"
              ></b-icon-circle>

              <span>剪贴板</span>
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-nav-item>

      <!-- 表单 & 表格 -->
      <b-nav-text class="font-weight-bold mt-3">表单 & 表格</b-nav-text>

      <!-- 表单元素 -->
      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-intersect class="sidebar-nav-icon ml-n3"></b-icon-intersect>
          <span>表单元素</span>
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

      <!-- 表单布局 -->
      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-layout-sidebar-inset-reverse
            class="sidebar-nav-icon ml-n3"
          ></b-icon-layout-sidebar-inset-reverse>
          <span>表单布局</span>
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

      <!-- 表单校验 -->
      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-check-box class="sidebar-nav-icon ml-n3"></b-icon-check-box>
          <span>表单校验</span>
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

      <!-- 表格 -->
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

      <!-- 页面 -->
      <b-nav-text class="font-weight-bold mt-3">页面</b-nav-text>

      <!-- 用户资料 -->
      <b-nav-item
        class="position-relative"
        link-classes="flex-column rounded-0 p-0"
      >
        <!-- Toggle -->
        <b-nav-toggle
          target="nav_collapse"
          class="d-flex align-items-center w-100 text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-person-fill
            class="sidebar-nav-icon ml-n3"
          ></b-icon-person-fill>
          <span>用户资料</span>
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

      <!-- 图表 & 地图 -->
      <b-nav-text class="font-weight-bold mt-3">图表 & 地图</b-nav-text>

      <!-- 图表 -->
      <b-nav-item link-classes="flex-column rounded-0 p-0">
        <!-- Toggle -->
        <b-nav-toggle
          target="charts"
          class="d-flex align-items-center w-100 position-relative text-white text-sm border-0 rounded-0 outline-none"
        >
          <b-icon-pie-chart-fill
            class="sidebar-nav-icon ml-n3"
          ></b-icon-pie-chart-fill>
          <span>图表</span>
          <span class="icon-menu-down ml-auto"></span>
        </b-nav-toggle>

        <!-- Collapse -->
        <b-collapse is-nav id="charts" accordion="accordion">
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

      <!-- 地图 -->
      <b-nav-item
        link-classes="no-collapse position-relative d-flex align-items-center"
      >
        <b-icon-map class="sidebar-nav-icon ml-n3"></b-icon-map>
        <span>地图</span>
      </b-nav-item>

      <div class="scrollbar-y-track position-absolute top-0 right-0 bottom-0">
        <div
          ref="scrollbar-thumb"
          class="scrollbar-thumb position-absolute"
        ></div>
      </div>
    </b-nav>

    <button
      typef="button"
      class="minimizer d-flex justify-content-end border-0 outline-none"
    ></button>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  BIconMap,
  BIconTable,
  BIconCircle,
  BIconPencil,
  BIconListUl,
  BIconGridFill,
  BIconCheckBox,
  BIconIntersect,
  BIconPersonFill,
  BIconPuzzleFill,
  BIconDropletFill,
  BIconPieChartFill,
  BIconHouseDoorFill,
  BIconPlusSquareFill,
  BIconLayoutSidebarInsetReverse
} from 'bootstrap-vue'

export default {
  components: {
    BIconMap,
    BIconTable,
    BIconCircle,
    BIconPencil,
    BIconListUl,
    BIconGridFill,
    BIconCheckBox,
    BIconIntersect,
    BIconPersonFill,
    BIconPuzzleFill,
    BIconDropletFill,
    BIconPieChartFill,
    BIconHouseDoorFill,
    BIconPlusSquareFill,
    BIconLayoutSidebarInsetReverse
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
    },
    handleSidebarScroll(event) {
      console.log(this.$refs['scrollbar-thumb'], event)
    },
    handleClickRoute(event) {
      console.log(event.target)
    }
  }
}
</script>

<style lang="scss" scoped>
#sidebar-content {
  .icon-menu-down {
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    transform: rotate(90deg);

    &.rotate0 {
      transform: rotate(0);
    }
  }

  .logo-container {
    flex: 0 0 66px;
    margin-left: -6px;
    padding: 1rem 2rem;
    background-color: rgba(52, 58, 64, 0.9);

    .logo {
      display: inline-block;
      margin-right: 10px;
      width: 34px;
      height: 34px;
      border-radius: 40px;
      background: #fff;
      text-align: center;
      line-height: 34px;

      > img {
        max-width: 18px;
      }
    }

    h1 {
      letter-spacing: 0.2em;
    }
  }

  .nav {
    &:hover {
      .scrollbar-y-track {
        opacity: 1;
      }
    }

    .navbar-text {
      padding: 0.75rem 1rem;
      color: rgba(255, 255, 255, 0.6);
      font-size: 90%;
    }

    .nav-link {
      color: white;

      &.no-collapse {
        padding: 0.8445rem 1rem;

        &::before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 6px;
          background-color: white;
          content: '';
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        &:hover {
          color: white;

          &::before {
            opacity: 0.08;
          }

          & > * {
            transform: translateX(5px);
          }
        }

        & > * {
          transition: transform 0.25s ease;
        }
      }
    }

    .navbar-toggler {
      padding: 0.8445rem 1rem;
      line-height: 1.5;
      transition: margin-bottom 0.5s ease, transform 0.25s ease;

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 6px;
        background-color: white;
        content: '';
        opacity: 0;
        transition: opacity 0.5s ease;
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

    .sidebar-nav-icon {
      width: 56px;
    }

    .scrollbar-y-track {
      width: 6px;
      opacity: 0;
      transition: opacity 0.2s linear;

      &:hover {
        .scrollbar-humb {
          background-color: rgb(170, 170, 170);
        }
      }
    }

    .scrollbar-thumb {
      right: 2px;
      width: 6px;
      height: 200px;
      border-radius: 6px;
      background-color: rgba(170, 170, 170, 0.7);
      transition: background-color 0.2s linear;
    }
  }

  .minimizer {
    flex: 0 0 50px;
    padding: 0;
    padding-right: 40px;
    background-color: rgba(52, 58, 64, 0.9);

    &:hover {
      background-color: #23272b;

      &::before {
        border-top-color: white;
      }
    }

    &::before {
      display: inline-block;
      border-top: 4px solid rgba(255, 255, 255, 0.6);
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
      content: '';
      transition: 0.25s;
      transform: rotate(90deg) scale(2);
    }
  }
}
</style>
