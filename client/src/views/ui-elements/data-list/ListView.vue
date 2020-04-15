<template>
  <div id="data-list-list-view">
    <b-card no-body class="rounded-xl shadow">
      <!-- 头部 -->
      <b-card-header class="d-flex justify-content-between rounded-0">
        <div class="card-header-title">
          <h4 class="mb-0 text-info">List View</h4>
        </div>
      </b-card-header>

      <!-- 内容 -->
      <b-card-body>
        <!-- 表单 -->
        <b-form inline class="form">
          <b-form-input type="search"></b-form-input>

          <!-- 添加 -->
          <b-button
            variant="outline-info"
            class="d-flex align-items-center ml-auto"
            @click="handleShowModal"
          >
            <b-icon-plus></b-icon-plus>添加
          </b-button>
        </b-form>

        <!-- 表格 -->
        <b-table
          :items="table"
          :fields="fields"
          :busy="isTableBusy"
          class="text-center mb-0"
        >
          <template v-slot:table-busy>
            <div class="loading text-center text-info">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <template v-slot:cell(createdAt)="data">
            {{ formatDate(data.value) }}
          </template>

          <template v-slot:cell(actions)="data">
            <div>
              <!-- 编辑 -->
              <b-icon-pencil-square
                class="cursor-pointer"
                @click="handleShowModal(data.item)"
              />

              <!-- 删除 -->
              <b-icon-trash
                class="cursor-pointer ml-2"
                @click="$bvModal.show(data.item._id)"
              />

              <!-- 提示 Modal -->
              <b-modal
                :id="data.item._id"
                title="提示"
                centered
                content-class="rounded-xl"
                header-class="border-bottom-0"
                footer-class="border-top-0"
              >
                <div class="d-flex align-items-center">
                  <b-icon-exclamation-circle-fill
                    variant="warning"
                    class="mr-3 text-xl"
                  />
                  <span class="mb-0">确认删除该交易记录吗?</span>
                </div>

                <template v-slot:modal-footer="{ cancel }">
                  <b-button
                    variant="info"
                    :disabled="isDisabled"
                    @click="handleDeleteTransaction(data.item._id)"
                  >
                    <b-spinner small v-if="showSpinner"></b-spinner>确认
                  </b-button>
                  <b-button variant="outline-danger" @click="cancel()">
                    取消
                  </b-button>
                </template>
              </b-modal>
            </div>
          </template>
        </b-table>

        <!-- 对话框 -->
        <Modal
          :item="tableItem"
          :updateTransaction="updateTransaction"
          @refreshTable="handleRefresh"
        />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BIconPlus,
  BIconTrash,
  BIconPencilSquare,
  BIconExclamationCircleFill
} from 'bootstrap-vue'
import { getAllTransactions, deleteTransaction } from '@/api/transactions'
import Modal from './components/Modal'

export default {
  components: {
    Modal,
    BIconPlus,
    BIconTrash,
    BIconPencilSquare,
    BIconExclamationCircleFill
  },
  data() {
    return {
      fields: [
        { key: 'method', label: '付款方式', sortable: true },
        { key: 'createdAt', label: '创建时间', sortable: true },
        { key: 'category', label: '账单分类' },
        { key: 'description', label: '收支描述' },
        { key: 'expense', label: '支出', sortable: true },
        { key: 'income', label: '收入', sortable: true },
        { key: 'balance', label: '账户现金', sortable: true },
        { key: 'remark', label: '备注' },
        { key: 'actions', label: '操作' }
      ],
      table: [],
      tableItem: undefined,
      isTableBusy: true,
      isDisabled: false,
      showSpinner: false,
      updateTransaction: false
    }
  },
  methods: {
    async handlefetchTransactions() {
      try {
        const response = await getAllTransactions()
        const { transactions } = response.data

        this.table = transactions
      } catch (err) {
        console.log(err)
      } finally {
        this.isTableBusy = false
      }
    },
    async handleDeleteTransaction(itemId) {
      try {
        this.isDisabled = true
        this.showSpinner = true

        await deleteTransaction(itemId)

        this.$bvModal.hide(itemId)
        this.handleRefresh()
      } catch (err) {
        console.log(err)
      } finally {
        this.isDisabled = false
        this.showSpinner = false
      }
    },
    handleRefresh() {
      this.isTableBusy = true
      this.handlefetchTransactions()
    },
    handleShowModal(item) {
      if (!item.target) {
        this.tableItem = item
        this.updateTransaction = true
      } else {
        this.tableItem = undefined
        this.updateTransaction = false
      }

      this.$bvModal.show('modal')
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
  },
  created() {
    this.handlefetchTransactions()
  }
}
</script>

<style lang="scss" scoped>
#data-list-list-view {
  .form {
    padding-bottom: 1.25rem;
  }

  .b-table {
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
}
</style>
