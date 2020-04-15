<template>
  <b-modal
    id="modal"
    dialog-class="min-vh-100 m-0 ml-auto"
    content-class="min-vh-100 border-0 rounded-0"
    scrollable
    ok-disabled
    no-fade
    no-close-on-esc
    no-close-on-backdrop
    @shown="showModal"
    @close="hideModal"
  >
    <template v-slot:modal-title>
      <h5>{{ getTitle }}</h5>
    </template>

    <b-form class="form">
      <!-- 账单分类 -->
      <b-form-group label="账单分类" label-for="category">
        <b-form-select
          id="category"
          v-model="$v.form.category.$model"
          :state="validateState('category')"
          :options="categories"
        ></b-form-select>

        <b-form-invalid-feedback>请输入账单分类</b-form-invalid-feedback>
      </b-form-group>

      <!-- 付款方式 -->
      <b-form-group label="付款方式" label-for="method">
        <b-form-input
          trim
          id="method"
          v-model="$v.form.method.$model"
          :state="validateState('method')"
        ></b-form-input>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback>请输入付款方式</b-form-invalid-feedback>
      </b-form-group>

      <!-- 收支描述 -->
      <b-form-group label="收支描述" label-for="description">
        <b-form-input
          trim
          id="description"
          v-model="$v.form.description.$model"
          :state="validateState('description')"
        ></b-form-input>

        <b-form-invalid-feedback>请输入收支描述</b-form-invalid-feedback>
      </b-form-group>

      <!-- 支出 -->
      <b-form-group label="支出" label-for="expense">
        <!-- Prepend Icon -->
        <span class="dollar text-secondary position-absolute z-50">$</span>

        <b-form-input
          number
          id="expense"
          class="hasDollar"
          type="number"
          v-model="$v.form.expense.$model"
          :state="validateState('expense')"
        ></b-form-input>
      </b-form-group>

      <!-- 收入 -->
      <b-form-group label="收入" label-for="income">
        <span class="dollar text-secondary position-absolute z-50">$</span>

        <b-form-input
          number
          id="income"
          class="hasDollar"
          type="number"
          v-model="$v.form.income.$model"
          :state="validateState('income')"
        ></b-form-input>
      </b-form-group>

      <!-- 账户现金 -->
      <b-form-group label="账户现金" label-for="balance">
        <span class="dollar text-secondary position-absolute z-50">$</span>

        <b-form-input
          number
          id="balance"
          class="hasDollar"
          type="number"
          v-model="$v.form.balance.$model"
          :state="validateState('balance')"
        ></b-form-input>
      </b-form-group>

      <!-- 备注 -->
      <b-form-group label="备注" label-for="remark">
        <b-form-textarea
          trim
          id="remark"
          v-model="$v.form.remark.$model"
          :state="validateState('remark')"
        ></b-form-textarea>
      </b-form-group>

      <b-button variant="info">上传图片</b-button>
    </b-form>

    <template v-slot:modal-footer>
      <b-button
        class="d-flex align-items-center"
        variant="info"
        @click="handleSubmit"
        :disabled="isDisabled"
      >
        <b-spinner small v-if="showSpinner"></b-spinner>
        提交
      </b-button>
      <b-button variant="outline-danger" @click="hideModal">取消</b-button>
    </template>
  </b-modal>
</template>

<script>
import { createTransaction, updateTransaction } from '@/api/transactions'
import { required, numeric } from 'vuelidate/lib/validators'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        category: null,
        method: '',
        description: '',
        expense: 0,
        income: 0,
        balance: 0,
        remark: ''
      })
    },
    updateTransaction: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    getTitle() {
      return this.updateTransaction ? '编辑账单' : '新增账单'
    }
  },
  data() {
    return {
      categories: [
        {
          label: '消费',
          options: [
            { value: null, text: '账单分类' },
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
      isDisabled: false,
      showSpinner: false,
      form: this.item
    }
  },
  validations: {
    form: {
      category: {
        required
      },
      method: {
        required
      },
      description: {
        required
      },
      expense: {
        required,
        numeric
      },
      income: {
        required,
        numeric
      },
      balance: {
        required,
        numeric
      },
      remark: {}
    }
  },
  watch: {
    item(val) {
      this.form = { ...val }
    }
  },
  methods: {
    handleSubmit() {
      if (this.updateTransaction) {
        // 更新已获取的交易记录
        this.handleUpdateTransaction()
      } else {
        // 创建新的交易记录
        this.handleCreateTransaction()
      }
    },
    async handleCreateTransaction() {
      try {
        // 校验表单
        this.$v.$touch()
        // 校验不通过，退出函数
        if (this.$v.$invalid) return false

        this.isDisabled = true
        this.showSpinner = true

        const transaction = {
          category: this.form.category,
          method: this.form.method,
          description: this.form.description,
          expense: this.form.expense,
          income: this.form.income,
          balance: this.form.balance,
          remark: this.form.remark
        }
        await createTransaction(transaction)

        this.hideModal()
        this.$emit('refreshTable')
      } catch (error) {
        console.log(error)
      } finally {
        this.isDisabled = false
        this.showSpinner = false
      }
    },
    async handleUpdateTransaction() {
      try {
        // 校验表单
        this.$v.$touch()
        // 校验不通过，退出函数
        if (this.$v.$invalid) return false

        this.isDisabled = true
        this.showSpinner = true

        const transaction = {
          category: this.form.category,
          method: this.form.method,
          description: this.form.description,
          expense: this.form.expense,
          income: this.form.income,
          balance: this.form.balance,
          remark: this.form.remark
        }
        const transactionId = this.form._id

        await updateTransaction(transactionId, transaction)

        this.hideModal()
        this.$emit('refreshTable')
      } catch (error) {
        console.log(error)
      } finally {
        this.isDisabled = false
        this.showSpinner = false
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    showModal() {
      let modalEle = document.getElementById('modal')
      modalEle.classList.add('slideInRight')
    },
    hideModal(event) {
      if (event) event.preventDefault()

      let modalEle = document.getElementById('modal')
      modalEle.classList.add('slideOutRight')

      setTimeout(() => {
        this.$bvModal.hide('modal')
        this.$v.$reset()
      }, 450)
    }
  }
}
</script>
