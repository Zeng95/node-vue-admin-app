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
    <template v-slot:modal-title>{{ getTitle }}</template>

    <div v-if="form && form.photo" class="modify-image mb-3 text-center">
      <b-img :src="getPhotoUrl" fluid />

      <div class="actions d-flex justify-content-between mt-3">
        <b-form-file
          ref="file"
          class="d-none"
          v-model="file"
          accept="image/*"
          plain
          @input="handleUploadPhoto"
        ></b-form-file>
        <b-button
          class="btn-update d-flex align-items-center justify-content-center flex-fill text-info mr-3 px-4 py-2"
          variant="transparent"
          @click="$refs.file.$el.click()"
          :disabled="isUploadDisabled"
        >
          <b-spinner class="mr-1" small v-if="showUploadSpinner"></b-spinner>
          更新图片
        </b-button>
        <b-button
          class="btn-remove d-flex align-items-center justify-content-center flex-fill text-secondary px-4 py-2"
          variant="transparent"
          @click="handleRemovePhoto"
          :disabled="isDeleteDisabled"
        >
          <b-spinner class="mr-1" small v-if="showDeleteSpinner"></b-spinner>
          删除图片
        </b-button>
      </div>
    </div>

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

        <b-form-invalid-feedback>请输入支出</b-form-invalid-feedback>
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

        <b-form-invalid-feedback>请输入收入</b-form-invalid-feedback>
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

        <b-form-invalid-feedback>请输入账户现金</b-form-invalid-feedback>
      </b-form-group>

      <!-- 备注 -->
      <b-form-group label="备注" label-for="remark" class="mb-0">
        <b-form-textarea
          trim
          id="remark"
          v-model="$v.form.remark.$model"
          :state="validateState('remark')"
        ></b-form-textarea>
      </b-form-group>

      <!-- 上传图片 -->
      <div class="upload-photo mt-3" v-if="!form.photo">
        <b-form-file
          ref="file"
          class="d-none"
          v-model="file"
          accept="image/*"
          plain
          @input="handleUploadPhoto"
        ></b-form-file>
        <b-button
          class="d-flex align-items-center"
          variant="info"
          @click="$refs.file.$el.click()"
          :disabled="isUploadDisabled"
        >
          <b-spinner class="mr-1" small v-if="showUploadSpinner"></b-spinner>
          上传图片
        </b-button>
      </div>
    </b-form>

    <template v-slot:modal-footer>
      <b-button
        class="d-flex align-items-center"
        variant="info"
        @click="handleSubmit"
        :disabled="isSubmitDisabled"
      >
        <b-spinner class="mr-1" small v-if="showSubmitSpinner"></b-spinner>
        提交
      </b-button>
      <b-button variant="outline-danger" @click="hideModal">取消</b-button>
    </template>
  </b-modal>
</template>

<script>
import {
  createTransaction,
  createTransactionPhoto,
  updateTransaction,
  deleteTransactionPhoto
} from '@/api/transactions'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        photo: null,
        category: null,
        method: '',
        description: '',
        expense: 0,
        income: 0,
        balance: 0,
        remark: null
      })
    },
    isUpdate: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    getTitle() {
      return this.isUpdate ? '编辑账单' : '新增账单'
    },
    getPhotoUrl() {
      const { photo } = this.form

      return photo && photo.url ? photo.url : photo
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
        minValue: minValue(0)
      },
      income: {
        required,
        minValue: minValue(0)
      },
      balance: {
        required,
        minValue: minValue(0)
      },
      remark: {}
    }
  },
  data() {
    return {
      categories: [
        {
          label: '消费',
          options: [
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
      form: { ...this.item },
      file: null,
      isSubmitDisabled: false,
      showSubmitSpinner: false,

      isUploadDisabled: false,
      showUploadSpinner: false,

      isDeleteDisabled: false,
      showDeleteSpinner: false
    }
  },
  watch: {
    item(val) {
      this.form = { ...val }
    }
  },
  methods: {
    handleSubmit() {
      if (this.isUpdate) {
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

        this.isSubmitDisabled = true
        this.showSubmitSpinner = true

        const transaction = {
          photo: this.form.photo ? this.form.photo.url : '',
          category: this.form.category,
          method: this.form.method,
          description: this.form.description,
          expense: this.form.expense,
          income: this.form.income,
          balance: this.form.balance,
          remark: this.form.remark
        }
        await createTransaction(transaction)

        this.hideModal().then(() => {
          this.$emit('showAlert', {
            variant: 'success',
            message: '添加成功'
          })

          this.$emit('refresh')
        })
      } catch (error) {
        this.hideModal().then(() => {
          this.$emit('showAlert', {
            variant: 'danger',
            message: '添加失败'
          })
        })
      } finally {
        this.isSubmitDisabled = false
        this.showSubmitSpinner = false
      }
    },
    async handleUpdateTransaction() {
      try {
        // 校验表单
        this.$v.$touch()
        // 校验不通过，退出函数
        if (this.$v.$invalid) return false

        this.isSubmitDisabled = true
        this.showSubmitSpinner = true

        const transactionId = this.form._id
        const transaction = {
          photo: this.form.photo ? this.form.photo.url : '',
          category: this.form.category,
          method: this.form.method,
          description: this.form.description,
          expense: this.form.expense,
          income: this.form.income,
          balance: this.form.balance,
          remark: this.form.remark
        }

        await updateTransaction(transactionId, transaction)

        this.hideModal().then(() => {
          this.$emit('showAlert', {
            variant: 'success',
            message: '修改成功'
          })

          this.$emit('refresh')
        })
      } catch (error) {
        this.hideModal().then(() => {
          this.$emit('showAlert', {
            variant: 'danger',
            message: '修改失败'
          })
        })
      } finally {
        this.isSubmitDisabled = false
        this.showSubmitSpinner = false
      }
    },
    async handleUploadPhoto() {
      try {
        this.isUploadDisabled = true
        this.showUploadSpinner = true

        const formData = new FormData()
        formData.append('photo', this.file)

        const result = await createTransactionPhoto(formData)
        const { photo } = result.data

        this.$set(this.form, 'photo', photo)
      } catch (err) {
        this.hideModal().then(() => {
          this.$emit('showAlert', {
            variant: 'danger',
            message: err
          })
        })
      } finally {
        this.isUploadDisabled = false
        this.showUploadSpinner = false
      }
    },
    async handleRemovePhoto() {
      try {
        this.isDeleteDisabled = true
        this.showDeleteSpinner = true

        let filename

        if (this.form.photo.filename) {
          filename = this.form.photo.filename
        } else {
          filename = this.getFilename(this.form.photo)
        }

        await deleteTransactionPhoto(filename)

        this.$set(this.form, 'photo', null)
      } catch (err) {
        this.hideModal().then(() => {
          this.$emit('showAlert', {
            variant: 'danger',
            message: '删除失败'
          })
        })
      } finally {
        this.isDeleteDisabled = false
        this.showDeleteSpinner = false
      }
    },
    showModal() {
      let modalEle = document.getElementById('modal')
      modalEle.classList.add('slideInRight')
    },
    hideModal(event) {
      return new Promise((resolve) => {
        if (event) event.preventDefault()

        let modalEle = document.getElementById('modal')
        modalEle.classList.add('slideOutRight')

        setTimeout(() => {
          this.$bvModal.hide('modal')
          this.form = { ...this.item }

          // 一定要用 setTimeout，不然 reset 会有问题
          setTimeout(() => this.$v.$reset(), 0)

          resolve()
        }, 450)
      })
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    getFilename(url) {
      return url.substring(url.lastIndexOf('/') + 1)
    }
  }
}
</script>
