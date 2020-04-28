<template>
  <div id="data-list-thumb-view">
    <h2 class="page-title text-secondary">Thumb View</h2>

    <b-card no-body class="rounded-xl shadow">
      <!-- 头部 -->
      <b-card-header
        header-class="rounded-0 border-bottom-0 pb-0"
        header-bg-variant="transparent"
        header-text-variant="info"
      >
        <b-card-title title="Table Styles" class="mb-0"></b-card-title>
      </b-card-header>

      <!-- 内容 -->
      <b-card-body>
        <!-- 表单 -->
        <b-form inline class="form">
          <!-- 搜索 -->
          <div class="search-box">
            <!-- 搜索框 -->
            <b-input-group class="input-group-search">
              <b-form-select
                v-model="filter"
                :options="categories"
              ></b-form-select>

              <b-input-group-append>
                <b-button
                  variant="info"
                  :disabled="!filter"
                  :class="{ 'cursor-not-allowed': !filter }"
                  @click="filter = null"
                >
                  清空
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>

          <!-- 按钮操作 -->
          <div class="filter-items d-flex ml-auto">
            <!-- 批量删除 -->
            <b-button
              variant="info"
              class="ml-0"
              :class="{ 'cursor-not-allowed': !allSelected }"
              :disabled="!allSelected"
              @click="showDeleteModal = true"
            >
              <span>批量删除</span>
            </b-button>

            <!-- 列设置 -->
            <b-dropdown no-caret variant="info">
              <template v-slot:button-content>
                <b-icon-funnel class="mr-1" />
                <span>列设置</span>
              </template>
              <b-dropdown-item href="#">An item</b-dropdown-item>
              <b-dropdown-item href="#">Another item</b-dropdown-item>
            </b-dropdown>

            <!-- 添加 -->
            <b-button
              variant="info"
              class="btn-add d-flex align-items-center"
              @click="showModal"
            >
              <b-icon-file-earmark-plus class="mr-1" />
              <span>添加</span>
            </b-button>

            <!-- 导出 -->
            <b-button
              title="导出 CSV"
              variant="info"
              class="btn-export d-flex align-items-center"
              @click="onExport"
            >
              <b-icon-file-earmark-text class="mr-1" />
              <span>导出</span>
            </b-button>
          </div>

          <!-- 删除 DeleteModal -->
          <DeleteModal
            :ids="selectedItems"
            :modalVisible="showDeleteModal"
            @refresh="onRefresh"
            @showAlert="showAlert"
            @hideModal="showDeleteModal = false"
          />
        </b-form>

        <!-- 表格 -->
        <b-table
          hover
          fixed
          striped
          selectable
          show-empty
          empty-text="暂无数据"
          empty-filtered-text="暂无数据"
          no-provider-sorting
          no-provider-filtering
          v-model="tableValues"
          :items="fetchTransactions"
          :fields="fields"
          :busy.sync="isTableBusy"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          id="table"
          ref="table"
          class="text-center mb-0"
          @row-selected="onRowSelected"
          @sort-changed="onSortChanged"
          @filtered="onSearch"
        >
          <template v-slot:table-busy>
            <div class="loading text-center text-info my-2">
              <b-spinner type="grow" class="align-middle"></b-spinner>
            </div>
          </template>

          <template v-slot:head(selected)>
            <b-checkbox v-model="allSelected" @change="toggleAllRows" />
          </template>

          <template v-slot:cell(selected)="data">
            <b-form-checkbox-group v-model="selectedItems" stacked>
              <b-checkbox
                :value="data.item._id"
                class="mr-0"
                @change="selectRow(data)"
              />
            </b-form-checkbox-group>
          </template>

          <template v-slot:cell(photo)="data">
            <b-img :src="data.item.photo" class="w-100"></b-img>
          </template>

          <template v-slot:cell(actions)="data">
            <div>
              <!-- 编辑 -->
              <b-icon-pencil-square
                class="cursor-pointer mr-2"
                @click.stop="showModal(data.item)"
              />

              <!-- 删除 -->
              <b-icon-trash
                class="cursor-pointer"
                @click.stop="data.item.showDeleteModal = true"
              />

              <!-- 删除 DeleteModal -->
              <DeleteModal
                :ids="[data.item._id]"
                :modalVisible="data.item.showDeleteModal"
                @refresh="onRefresh"
                @showAlert="showAlert"
                @hideModal="data.item.showDeleteModal = false"
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

        <!-- 保存 SaveModal -->
        <SaveModal
          :item="tableItem"
          :isUpdate="isUpdate"
          @refresh="onRefresh"
          @showAlert="showAlert"
        />

        <!-- 消息提示 -->
        <Alert
          :message="alertMessage"
          :variant="alertVariant"
          :isShow="showDismissibleAlert"
          @hideAlert="showDismissibleAlert = false"
        />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BIconTrash,
  BIconFunnel,
  BIconPencilSquare,
  BIconFileEarmarkPlus,
  BIconFileEarmarkText
} from 'bootstrap-vue'
import {
  getAllTransactions,
  getTransactionsByCategory,
  exportAllTransactions
} from '@/api/transactions'
import Alert from '@/components/Alert'
import SaveModal from './components/SaveModal'
import DeleteModal from './components/DeleteModal'

export default {
  name: 'ThumbView',
  components: {
    Alert,
    SaveModal,
    DeleteModal,
    BIconTrash,
    BIconFunnel,
    BIconPencilSquare,
    BIconFileEarmarkPlus,
    BIconFileEarmarkText
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
      // 账单分类
      categories: [
        {
          label: '消费',
          options: [
            { value: null, text: '选择分类' },
            { value: '餐饮美食', text: '餐饮美食' },
            { value: '服饰美容', text: '服饰美容' },
            { value: '生活日常', text: '生活日常' },
            { value: '日常缴费', text: '日常缴费' },
            { value: '交通出行', text: '交通出行' },
            { value: '通讯物流', text: '通讯物流' },
            { value: '休闲娱乐', text: '休闲娱乐' },
            { value: '医疗保健', text: '医疗保健' },
            { value: '住房物业', text: '住房物业' },
            { value: '文体教育', text: '文体教育' },
            { value: '其他', text: '其他' }
          ]
        },
        {
          label: '更多',
          options: [
            { value: '投资理财', text: '投资理财' },
            { value: '金融保险', text: '金融保险' },
            { value: '信用借还', text: '信用借还' },
            { value: '人情往来', text: '人情往来' },
            { value: '公益慈善', text: '公益慈善' },
            { value: '经营所得', text: '经营所得' },
            { value: '职业酬劳', text: '职业酬劳' },
            { value: '奖金红包', text: '奖金红包' },
            { value: '转账充值', text: '转账充值' }
          ]
        }
      ],
      // 表头
      fields: [
        {
          key: 'selected',
          label: '',
          tdClass: ['align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'photo',
          label: '图片',
          tdClass: 'border-top-0',
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'method',
          label: '付款方式',
          sortable: true,
          tdClass: ['align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'category',
          label: '账单分类',
          tdClass: ['align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'description',
          label: '收支描述',
          tdClass: ['text-truncate', 'align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'expense',
          label: '支出',
          sortable: true,
          tdClass: ['align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'income',
          label: '收入',
          sortable: true,
          tdClass: ['align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'balance',
          label: '账户现金',
          sortable: true,
          tdClass: ['align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'remark',
          label: '备注',
          tdClass: ['text-truncate', 'align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        },
        {
          key: 'actions',
          label: '操作',
          tdClass: ['align-middle', 'border-top-0'],
          thClass: ['border-top-0', 'border-bottom']
        }
      ],
      tableItem: undefined,
      tableValues: [],

      // 已勾选的表格行
      selectedItems: [],
      // 是否勾选所有的表格行
      allSelected: false,

      // 当前显示页
      currentPage: 1,
      // 每页显示行数
      perPage: 20,
      // 总行数
      totalRows: 0,

      filter: null,

      isTableBusy: false,
      isUpdate: false,
      isBtnDisabled: false,
      showSpinner: false,

      alertMessage: '',
      alertVariant: '',
      showDismissibleAlert: false,

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

      showDeleteModal: false
    }
  },
  methods: {
    async fetchTransactions(ctx) {
      try {
        const response = await getAllTransactions(ctx.currentPage, ctx.perPage)
        const { data } = response.data

        this.totalRows = data.totalCount

        const items = data.transactions.map((item) => {
          item.showDeleteModal = false
          return item
        })

        this.tableValues = items

        return items
      } catch (err) {
        this.showAlert({
          variant: 'danger',
          message: '获取失败'
        })

        return []
      }
    },
    // 表格搜索
    async onSearch() {
      try {
        this.isTableBusy = true

        if (this.filter) {
          await getTransactionsByCategory(this.filter)
        }
      } catch (err) {
        this.showAlert({
          variant: 'danger',
          message: '搜索失败'
        })
      } finally {
        this.isTableBusy = false
      }
    },
    // 表格导出
    async onExport() {
      try {
        const result = await exportAllTransactions()
        const { data: csvString } = result.data

        this.downloadFile(csvString, 'my-csv.csv')
      } catch (err) {
        this.showAlert({
          variant: 'danger',
          message: '导出失败'
        })
      }
    },
    // 下载 CSV
    downloadFile(csvString) {
      const blob = new Blob([csvString])

      if (window.navigator.msSaveOrOpenBlob)
        // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveBlob(
          blob,
          `data_${this.moment().format('YYYYMMDD')}.csv`
        )
      else {
        const a = window.document.createElement('a')
        a.href = window.URL.createObjectURL(blob, { type: 'text/plain' })
        a.download = `table-list_${this.moment().format('YYYYMMDD')}.csv`
        document.body.appendChild(a)
        a.click() // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a)
      }
    },
    // 表格刷新
    onRefresh() {
      this.$refs.table.refresh()

      this.fetchTransactions({
        currentPage: this.currentPage,
        perPage: this.perPage
      })
    },
    // 表格行通过 Click 事件选中
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
    // 表格排序
    onSortChanged() {
      this.isTableBusy = true

      setTimeout(() => {
        this.isTableBusy = false
      }, 500)
    },
    // 表格行通过 Checkbox 多选框选中
    selectRow(item) {
      if (!item.rowSelected) {
        this.$refs.table.selectRow(item.index)
      } else {
        this.$refs.table.unselectRow(item.index)
      }
    },
    toggleAllRows() {
      this.allSelected = !this.allSelected

      if (this.allSelected) {
        this.$refs.table.selectAllRows()
      } else {
        this.$refs.table.clearSelected()
        this.selectedItems = []
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

    showAlert(options) {
      this.alertVariant = options.variant
      this.alertMessage = options.message

      this.showDismissibleAlert = true
    },
    showModal(item) {
      if (!item.target) {
        this.tableItem = item
        this.isUpdate = true
      } else {
        this.tableItem = undefined
        this.isUpdate = false
      }

      this.$bvModal.show('modal')
    }
  }
}
</script>

<style lang="scss" scoped>
#data-list-thumb-view {
  .page-title {
    margin-bottom: 30px;
  }

  .form {
    padding-bottom: 1.25rem;

    .input-group-search {
      width: 200px;
    }

    .filter-items {
      & > .btn,
      & > .dropdown {
        margin-left: 17.5px;
      }
    }

    .b-icon {
      width: 14px;
      height: 14px;
    }
  }

  .table {
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
