<template>
  <div id="data-list-thumb-view">
    <b-card no-body class="rounded-xl shadow">
      <!-- 头部 -->
      <b-card-header class="d-flex justify-content-between rounded-0">
        <div class="card-header-title">
          <h4 class="mb-0 text-info">Thumb View</h4>
        </div>
      </b-card-header>

      <!-- 内容 -->
      <b-card-body>
        <!-- 表单 -->
        <b-form inline class="form">
          <!-- 搜索框 -->
          <b-form-input type="search"></b-form-input>

          <!-- 按钮 -->
          <div class="d-flex ml-auto">
            <b-button
              variant="outline-info"
              class="mr-3"
              :class="{ 'cursor-not-allowed': !allSelected }"
              :disabled="!allSelected"
              @click.stop="modalShow = true"
            >
              批量删除
            </b-button>

            <b-button
              variant="outline-info"
              class="d-flex align-items-center"
              @click="handleShowModal"
            >
              <b-icon-plus></b-icon-plus>添加
            </b-button>
          </div>

          <!-- 对话框 -->
          <DeleteModal :modalShow="modalShow" @cancel="modalShow = false" />
        </b-form>

        <!-- 表格 -->
        <b-table
          hover
          fixed
          selectable
          v-model="tableValues"
          :items="fetchTransactions"
          :fields="fields"
          :busy.sync="isTableBusy"
          :per-page="perPage"
          :current-page="currentPage"
          id="table"
          ref="table"
          class="text-center mb-0"
          @row-selected="onRowSelected"
        >
          <template v-slot:table-busy>
            <div class="loading text-center text-info">
              <b-spinner type="grow" class="align-middle"></b-spinner>
            </div>
          </template>

          <template v-slot:head(selected)>
            <b-form-checkbox v-model="allSelected" @change="toggleSelected" />
          </template>

          <template v-slot:cell(selected)="data">
            <b-form-checkbox-group v-model="selectedItems">
              <b-form-checkbox :value="data.item._id"></b-form-checkbox>
            </b-form-checkbox-group>
          </template>

          <template v-slot:cell(photo)="data">
            <b-img :src="data.item.photo" class="w-100"></b-img>
          </template>

          <template v-slot:cell(createdAt)="data">
            {{ formatDate(data.value) }}
          </template>

          <template v-slot:cell(actions)="data">
            <div>
              <!-- 编辑 -->
              <b-icon-pencil-square
                class="cursor-pointer"
                @click.stop="handleShowModal(data.item)"
              />

              <!-- 删除 -->
              <b-icon-trash
                class="cursor-pointer ml-2"
                @click.stop="data.item.modalShow = true"
              />

              <!-- 提示 SaveModal -->
              <DeleteModal
                :modalShow="data.item.modalShow"
                @cancel="data.item.modalShow = false"
              />
            </div>
          </template>
        </b-table>

        <!-- 分页 -->
        <div
          class="pagination-container d-flex align-items-center justify-content-end"
        >
          <!-- 总数 -->
          <span class="pagination-total">共 {{ totalRows }} 条</span>

          <!-- 下拉菜单 -->
          <div class="pagination-size mx-3">
            <b-dropdown
              variant="transparent"
              menu-class="mb-0"
              offset="-28"
              :text="dropdownDefault"
            >
              <b-dropdown-item
                v-for="(item, index) in dropdownItems"
                :key="item.size"
                :active="item.isActive"
                @click="changePaginationSize(index)"
              >
                {{ item.text }}
              </b-dropdown-item>
            </b-dropdown>
          </div>

          <b-pagination
            first-number
            last-number
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            aria-controls="table"
            prev-class="mr-1"
            page-class="mx-1"
            next-class="ml-1"
            class="mb-0"
          ></b-pagination>

          <div class="pagination-jump ml-3 d-flex align-items-center">
            前往
            <b-form-input
              lazy
              v-model="currentPage"
              type="number"
              class="pagination-editor mx-1 text-center"
              autocomplete="off"
              min="1"
              @change="changePaginationJump"
            ></b-form-input>
            页
          </div>
        </div>

        <!-- 对话框 -->
        <SaveModal
          :item="tableItem"
          :isUpdate="isUpdate"
          @refreshTable="handleRefresh"
          @showAlert="handleShowAlert"
        />

        <!-- 消息提示 -->
        <Alert
          :message="alertMessage"
          :variant="alertVariant"
          :isShow="isAlertShow"
          @hideAlert="isAlertShow = false"
        />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { BIconPlus, BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import { getAllTransactions } from '@/api/transactions'
import Alert from '@/components/Alert'
import SaveModal from './components/SaveModal'
import DeleteModal from './components/DeleteModal'

export default {
  name: 'ThumbView',
  components: {
    Alert,
    SaveModal,
    DeleteModal,
    BIconPlus,
    BIconTrash,
    BIconPencilSquare
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.totalRows / this.perPage)
    }
  },
  watch: {
    selectedItems(val) {
      this.allSelected = val.length > 0 ? true : false
    }
  },
  data() {
    return {
      // 表头
      fields: [
        {
          key: 'selected',
          label: '',
          sortable: false,
          class: 'a',
          tdClass: 'align-middle'
        },
        { key: 'photo', label: '图片' },
        {
          key: 'method',
          label: '付款方式',
          sortable: true,
          tdClass: 'align-middle'
        },
        { key: 'category', label: '账单分类', tdClass: 'align-middle' },
        {
          key: 'description',
          label: '收支描述',
          tdClass: ['text-truncate', 'align-middle']
        },
        {
          key: 'expense',
          label: '支出',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'income',
          label: '收入',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'balance',
          label: '账户现金',
          sortable: true,
          tdClass: 'align-middle'
        },
        {
          key: 'remark',
          label: '备注',
          tdClass: ['text-truncate', 'align-middle']
        },
        { key: 'actions', label: '操作', tdClass: 'align-middle' }
      ],
      tableItem: undefined,
      tableValues: [],

      // 已勾选的表格行
      selectedItems: [],
      // 是否勾选所有的表格行
      allSelected: false,

      currentPage: 1,
      perPage: 20,
      totalRows: 0,

      isTableBusy: false,
      isUpdate: false,
      isBtnDisabled: false,
      showSpinner: false,

      alertMessage: '',
      alertVariant: '',
      isAlertShow: false,

      dropdownDefault: '20条/页',
      dropdownItems: [
        {
          text: '10条/页',
          size: 10,
          isActive: false
        },
        {
          text: '20条/页',
          size: 20,
          isActive: true
        },
        {
          text: '30条/页',
          size: 30,
          isActive: false
        },
        {
          text: '50条/页',
          size: 50,
          isActive: false
        }
      ],

      modalShow: false
    }
  },
  methods: {
    async fetchTransactions(ctx) {
      try {
        const response = await getAllTransactions(ctx.currentPage, ctx.perPage)
        const { data } = response.data

        this.totalRows = data.totalCount

        const items = data.transactions.map((item) => {
          item.modalShow = false
          return item
        })

        this.tableValues = items

        return items
      } catch (err) {
        this.handleShowAlert({
          variant: 'danger',
          message: '获取失败'
        })

        return []
      }
    },
    onRowSelected(items) {
      const selectedItemsLen = this.selectedItems.length

      if (items.length > selectedItemsLen) {
        // Add an item
        items.forEach((item) => {
          // 添加 selectedItems 数组中不存在的 itemId
          if (this.selectedItems.indexOf(item._id) === -1) {
            this.selectedItems.push(item._id)
          }
        })

        this.allSelected = true
      } else if (items.length < selectedItemsLen && items.length > 0) {
        // Remove an item
        const uniqueResult = items.map((o1) => {
          const result = !this.selectedItems.some((o2) => {
            return o1 === o2.id
          })

          if (result) return o1._id
        })

        this.selectedItems.forEach((x, index) => {
          if (uniqueResult.indexOf(x) === -1) {
            this.selectedItems.splice(index, 1)
          }
        })

        this.allSelected = true
      } else {
        // Clear items
        this.allSelected = false
        this.selectedItems = []
      }
    },
    toggleSelected() {
      this.allSelected = !this.allSelected

      if (this.allSelected) {
        this.$refs.table.selectAllRows()
      } else {
        this.$refs.table.clearSelected()
      }
    },

    changePaginationSize(currentIndex) {
      this.dropdownItems.forEach((element, index) => {
        element.isActive = false

        if (index === currentIndex) {
          element.isActive = true

          this.dropdownDefault = element.text
          this.perPage = element.size
        }
      })
    },
    changePaginationJump(value) {
      if (value < 1) {
        this.currentPage = 1
      } else if (value > this.numberOfPages) {
        this.currentPage = this.numberOfPages
      }
    },

    handleShowAlert(options) {
      this.alertVariant = options.variant
      this.alertMessage = options.message

      this.isAlertShow = true
    },
    handleShowModal(item) {
      if (!item.target) {
        this.tableItem = item
        this.isUpdate = true
      } else {
        this.tableItem = undefined
        this.isUpdate = false
      }

      this.$bvModal.show('modal')
    },
    handleRefresh() {
      this.$refs.table.refresh()

      this.fetchTransactions({
        currentPage: this.currentPage,
        perPage: this.perPage
      })
    },

    formatDate(value) {
      const date = new Date(value)

      let year = date.getFullYear()
      let month, day, hours, minutes, seconds

      if (date.getMonth() < 10) {
        month = `0${date.getMonth()}`
      } else {
        month = date.getMonth()
      }

      if (date.getDate() < 10) {
        day = `0${date.getDate()}`
      } else {
        day = date.getDate()
      }

      if (date.getHours() < 10) {
        hours = `0${date.getHours()}`
      } else {
        hours = date.getHours()
      }

      if (date.getMinutes() < 10) {
        minutes = `0${date.getMinutes()}`
      } else {
        minutes = date.getMinutes()
      }

      if (date.getSeconds() < 10) {
        seconds = `0${date.getSeconds()}`
      } else {
        seconds = date.getSeconds()
      }

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style lang="scss" scoped>
#data-list-thumb-view {
  .form {
    padding-bottom: 1.25rem;
  }

  .table {
    &[aria-busy='true'] {
      .loading {
        margin-top: 1.25rem;
      }
    }

    .bi-pencil-square {
      &:hover {
        color: var(--info);
      }
    }

    .bi-trash {
      &:hover {
        color: var(--danger);
      }
    }
  }

  .pagination-container {
    margin-top: 1.25rem;

    .pagination-size {
      ::v-deep.dropdown-toggle {
        border: 1px solid #ced4da;
      }

      ::v-deep.dropdown-menu {
        top: -12px !important;
      }
    }

    .pagination {
      ::v-deep.page-item {
        &.disabled {
          cursor: not-allowed;
        }
      }
    }

    .pagination-editor {
      width: 50px;

      &[type='number']::-webkit-inner-spin-button,
      &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    }
  }
}
</style>
