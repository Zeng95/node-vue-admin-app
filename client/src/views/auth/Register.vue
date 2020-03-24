<template>
  <div class="register w-100 h-100">
    <div
      class="container h-100 d-flex flex-column justify-content-center align-items-center"
    >
      <!-- Title -->
      <h1 class="title text-black font-weight-normal">后台管理系统</h1>

      <div class="form-container bg-white p-5 rounded-lg position-relative">
        <!-- Subtitle -->
        <h2 class="subtitle text-black text-center font-weight-normal mb-5">
          注册
        </h2>

        <!-- Form -->
        <b-form
          class="form"
          autocomplete="off"
          @submit.prevent="handleRegister"
        >
          <!-- Name -->
          <b-form-group class="position-relative mb-4">
            <!-- Prepend Icon -->
            <div class="icon-prepend d-flex position-absolute z-50">
              <b-icon-person-fill></b-icon-person-fill>
            </div>

            <b-form-input
              lazy
              trim
              lazy-formatter
              size="lg"
              type="text"
              v-model="$v.form.name.$model"
              :state="validateState('name')"
              :formatter="nameFormatter"
              placeholder="用户名（不区分大小写）"
              class="text-sm text-black"
            ></b-form-input>

            <!-- Feedback -->
            <!-- <b-form-valid-feedback></b-form-valid-feedback> -->
            <b-form-invalid-feedback>
              <span v-if="!$v.form.name.required">用户名不能为空</span>
              <span v-else-if="!$v.form.name.minLength">用户名过短</span>
              <span v-else-if="!$v.form.name.maxLength">用户名过长</span>
              <span v-else>用户名已存在</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Email -->
          <b-form-group class="position-relative mb-4">
            <!-- Prepend Icon -->
            <div class="icon-prepend d-flex position-absolute z-50">
              <b-icon-envelope-fill></b-icon-envelope-fill>
            </div>

            <b-form-input
              size="lg"
              type="email"
              v-model="$v.form.email.$model"
              :state="validateState('email')"
              :formatter="emailFormatter"
              placeholder="邮箱（不区分大小写）"
              class="text-sm text-black"
            ></b-form-input>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span v-if="!$v.form.email.required">邮箱不能为空</span>
              <span v-else-if="!$v.form.email.email">邮箱格式错误</span>
              <span v-else>邮箱已存在</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Password -->
          <b-form-group class="position-relative mb-4">
            <!-- Prepend Icon -->
            <div class="icon-prepend d-flex position-absolute z-50">
              <b-icon-lock-fill></b-icon-lock-fill>
            </div>

            <!-- Append Icons -->
            <div
              class="icon-eye d-flex position-absolute z-50"
              @click="togglePwdState"
            >
              <b-icon-eye-fill v-if="form.showPwd"></b-icon-eye-fill>
              <b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill>
            </div>

            <b-input-group>
              <b-form-input
                trim
                size="lg"
                :type="form.pwdType"
                v-model="$v.form.pwd.$model"
                :state="validateState('pwd')"
                placeholder="密码（6 - 16个字符组成，区分大小写）"
                class="text-sm text-black"
              ></b-form-input>

              <!-- Feedback -->
              <b-form-valid-feedback></b-form-valid-feedback>
              <b-form-invalid-feedback>
                <span v-if="!$v.form.pwd.required || !$v.form.pwd.minLength">
                  密码不能小于 6 个字符
                </span>
                <span v-else>
                  密码不能大于 16 个字符
                </span>
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <!-- Repeat Password -->
          <b-form-group class="position-relative mb-4">
            <!-- Prepend Icon -->
            <div class="icon-prepend d-flex position-absolute z-50">
              <b-icon-lock-fill></b-icon-lock-fill>
            </div>

            <b-form-input
              trim
              size="lg"
              type="password"
              v-model="$v.form.repeatPwd.$model"
              :state="validateState('repeatPwd')"
              placeholder="确认密码"
              class="text-sm text-black"
            ></b-form-input>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span
                v-if="
                  !$v.form.repeatPwd.required ||
                    !$v.form.repeatPwd.sameAsPassword
                "
              >
                新密码和确认密码输入不一致
              </span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Role -->
          <b-form-group class="position-relative mb-4">
            <!-- Prepend Icon -->
            <div class="icon-prepend d-flex position-absolute z-50">
              <b-icon-award></b-icon-award>
            </div>

            <!-- Select -->
            <b-form-select
              v-model.trim="$v.form.role.$model"
              :state="validateState('role')"
              class="text-sm text-dark-gray"
              :class="{ active: form.role ? 'active' : '' }"
              size="lg"
            >
              <b-form-select-option value hidden>
                身份
              </b-form-select-option>
              <b-form-select-option value="admin">
                管理员
              </b-form-select-option>
              <b-form-select-option value="user">
                用户
              </b-form-select-option>
            </b-form-select>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span v-if="!$v.form.role.required">身份不能为空</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Submit -->
          <b-button
            type="submit"
            variant="dark"
            class="submit d-block w-100 mx-auto text-sm"
            size="lg"
          >
            注册
          </b-button>
        </b-form>

        <!-- Direct Login -->
        <div class="register_pc_direct_login position-absolute text-sm">
          <router-link
            :to="{ name: 'Login' }"
            class="text-dark text-decoration-none"
          >
            已有账号，直接登录>
          </router-link>
        </div>
      </div>
    </div>

    <b-toast
      id="my-toast"
      :variant="toastVariant"
      title="注册结果"
      no-auto-hide
    >
      {{ toastMessage }}
    </b-toast>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BIconAward,
  BIconLockFill,
  BIconPersonFill,
  BIconEnvelopeFill,
  BIconEyeFill,
  BIconEyeSlashFill
} from 'bootstrap-vue'
import {
  required,
  sameAs,
  minLength,
  maxLength,
  email
} from 'vuelidate/lib/validators'
import auth from '@/api/auth'

export default {
  components: {
    BIconAward,
    BIconLockFill,
    BIconPersonFill,
    BIconEnvelopeFill,
    BIconEyeFill,
    BIconEyeSlashFill
  },
  data() {
    return {
      form: {
        name: '',
        nameAvailable: true,
        email: '',
        emailAvailable: true,
        pwd: '',
        pwdType: 'password',
        repeatPwd: '',
        role: '',
        showPwd: false
      },
      showToast: false,
      toastVariant: '',
      toastMessage: ''
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(16)
      },
      email: {
        required,
        email
      },
      pwd: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(16)
      },
      repeatPwd: {
        required,
        sameAsPassword: sameAs('pwd')
      },
      role: {
        required
      }
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    nameFormatter(value) {
      const { $dirty, $error } = this.$v.form.name
      const newValue = value.toLowerCase()

      if ($dirty && !$error) {
        // 校验用户名是否已被注册
        this.isNameAvailable(newValue)
      }

      return newValue
    },
    emailFormatter(value) {
      const { $dirty, $error } = this.$v.form.email
      const newValue = value.toLowerCase()

      if ($dirty && !$error) {
        // 校验用户名是否已被注册
        this.isEmailAvailable(newValue)
      }

      return newValue
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      const { nameAvailable, emailAvailable } = this.form

      if (name === 'name' && !nameAvailable) {
        return nameAvailable
      } else if (name === 'email' && !emailAvailable) {
        return emailAvailable
      } else {
        return $dirty ? !$error : null
      }
    },
    togglePwdState() {
      this.form.showPwd = !this.form.showPwd

      if (this.form.showPwd) {
        this.form.pwdType = 'text'
      } else {
        this.form.pwdType = 'password'
      }
    },
    async handleRegister() {
      const { nameAvailable, emailAvailable } = this.form
      const { form } = this.$v

      form.$touch()

      if (form.$anyError || !nameAvailable || !emailAvailable) return false

      const data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.pwd,
        role: this.form.role
      }

      try {
        await this.register(data)
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.log(error)
      }
    },
    async isNameAvailable(name) {
      try {
        await auth.checkName({ name })
        this.form.nameAvailable = true
      } catch (error) {
        this.form.nameAvailable = false
      }
    },
    async isEmailAvailable(email) {
      try {
        // 发送请求
        await auth.checkEmail({ email })
        this.form.emailAvailable = true
      } catch (error) {
        this.form.emailAvailable = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  background: url('../../assets/images/bg.jpg') no-repeat center;
  background-size: cover;
  .title {
    margin-bottom: 20px;
    color: rgb(34, 34, 34);
    letter-spacing: 0.2em;
    font-size: 32px;
  }
  .form-container {
    width: 45%;
    .subtitle {
      color: rgb(34, 34, 34);
      letter-spacing: 0.2em;
      font-size: 24px;
    }
    .form {
      .icon-prepend {
        top: 12px;
        left: 16px;
      }
      .icon-eye {
        top: 12px;
        right: 32px;
      }
      input {
        text-indent: 32px;
        &::placeholder {
          color: rgb(117, 117, 117);
        }
      }
      select {
        text-indent: 32px;
        &.active {
          color: #000;
        }
      }
      .invalid-feedback {
        font-size: 14px;
      }
    }
    .register_pc_direct_login {
      right: 48px;
      bottom: 14px;
    }
  }
  .alert-message {
    top: 20px;
    left: 50%;
    width: 380px;
  }
}
</style>
