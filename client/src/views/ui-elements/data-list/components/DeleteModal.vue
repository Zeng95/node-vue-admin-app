<template>
  <b-modal
    centered
    v-model="showModal"
    content-class="rounded-xl"
    header-class="border-bottom-0"
    footer-class="border-top-0"
    title="提示"
    @hide="hideModal"
  >
    <div class="d-flex align-items-center">
      <b-icon-exclamation-circle-fill variant="warning" class="mr-3 text-xl" />
      <span>您确定要删除选中的 {{ modals.length }} 条消息吗？</span>
    </div>

    <template v-slot:modal-footer>
      <b-button
        class="d-flex align-items-center"
        variant="info"
        :disabled="isBtnDisabled"
        @click="onOk"
      >
        <b-spinner class="mr-1" small v-if="showSpinner"></b-spinner>
        <span>确认</span>
      </b-button>
      <b-button variant="outline-danger" @click="hideModal">
        <span>取消</span>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BIconExclamationCircleFill } from 'bootstrap-vue'
import { deleteTransaction, deleteManyTransactions } from '@/api/transactions'

export default {
  components: {
    BIconExclamationCircleFill
  },
  props: {
    modals: {
      type: Array,
      required: true
    },
    modalVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isBtnDisabled: false,
      showModal: this.modalVisible,
      showSpinner: false
    }
  },
  watch: {
    modalVisible(val) {
      this.showModal = val
    }
  },
  methods: {
    async onOk() {
      try {
        this.isBtnDisabled = true
        this.showSpinner = true

        if (this.modals.length === 1) {
          const id = this.modals[0]._id
          const photo = this.modals[0].photo
          const filename = photo.substring(photo.lastIndexOf('/') + 1)
          // 删除一条交易记录
          await deleteTransaction(id, filename)
        } else {
          // 删除多条交易记录
          await deleteManyTransactions(this.ids)
        }

        this.hideModal()

        this.$emit('showAlert', {
          variant: 'success',
          message: '删除成功'
        })

        this.$emit('refresh')
      } catch (err) {
        this.$emit('showAlert', {
          variant: 'danger',
          message: '删除失败'
        })
      } finally {
        this.isBtnDisabled = false
        this.showSpinner = false
      }
    },
    hideModal() {
      this.$emit('hideModal')
    }
  }
}
</script>
