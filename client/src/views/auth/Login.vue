<template>
  <div class="login w-100 vh-100">
    <div
      class="container d-flex flex-column justify-content-center align-items-center h-100"
    >
      <!-- Title -->
      <h1 class="title text-black font-weight-normal">后台管理系统</h1>

      <!-- Form Container -->
      <div class="form-container bg-white p-5 rounded-lg position-relative">
        <!-- Subtitle -->
        <h2 class="subtitle text-black text-center font-weight-normal mb-5">
          登录
        </h2>

        <!-- Form -->
        <b-form class="form" autocomplete="off" @submit.prevent="handleLogin">
          <!-- Username -->
          <b-form-group class="position-relative mb-4">
            <!-- Prepend Icon -->
            <div class="icon-username d-flex position-absolute z-50">
              <b-icon-person-fill></b-icon-person-fill>
            </div>

            <b-form-input
              trim
              size="lg"
              type="text"
              placeholder="用户名或者邮箱"
              v-model="$v.form.username.$model"
              :state="validateState('username')"
              class="text-sm text-black"
            ></b-form-input>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span v-if="!$v.form.username.required">账户不能为空</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Password -->
          <b-form-group class="position-relative mb-4">
            <!-- Prepend Icon -->
            <div class="icon-password d-flex position-absolute z-50">
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

            <b-form-input
              trim
              size="lg"
              :type="form.pwdType"
              v-model="$v.form.pwd.$model"
              :state="validateState('pwd')"
              placeholder="密码"
              class="text-sm text-black"
            ></b-form-input>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span v-if="!$v.form.pwd.required">密码不能为空</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Submit -->
          <b-button
            type="submit"
            variant="dark"
            class="submit d-block w-100 mx-auto text-sm"
            size="lg"
            :disabled="isDisabled"
          >
            <b-spinner small v-if="showSpinner"></b-spinner>
            登录
          </b-button>
        </b-form>

        <!-- Direct Register -->
        <div class="register_pc_direct_register position-absolute text-sm">
          <router-link
            :to="{ name: 'Register' }"
            class="text-dark text-decoration-none"
          >
            还没有账号？现在注册>
          </router-link>
        </div>
      </div>
    </div>

    <b-toast
      toast-class="rounded-xl"
      body-class="px-4"
      :visible="true"
      :no-auto-hide="true"
      solid
    >
      <template v-slot:toast-title>
        <div class="d-flex align-items-center">
          <div class="h4 mb-0 mr-2">
            <b-icon-bell-fill variant="warning"></b-icon-bell-fill>
          </div>
          <strong class="mr-auto text-black">提示</strong>
        </div>
      </template>

      <p class="mb-0 text-dark-gray">
        目前有两个登陆角色：管理员和普通用户。
        <br />
        账号为：admin、user，密码为：123456。
      </p>
    </b-toast>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BIconEyeFill,
  BIconEyeSlashFill,
  BIconLockFill,
  BIconPersonFill,
  BIconBellFill
} from 'bootstrap-vue'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    BIconEyeFill,
    BIconEyeSlashFill,
    BIconLockFill,
    BIconPersonFill,
    BIconBellFill
  },
  data() {
    return {
      form: {
        username: '',
        pwd: '',
        pwdType: 'password',
        showPwd: false
      },
      isDisabled: false,
      showSpinner: false
    }
  },
  validations: {
    form: {
      username: {
        required
      },
      pwd: {
        required
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    togglePwdState() {
      this.form.showPwd = !this.form.showPwd

      if (this.form.showPwd) {
        this.form.pwdType = 'text'
      } else {
        this.form.pwdType = 'password'
      }
    },
    emailIsValid(email) {
      const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return emailFormat.test(email)
    },
    async handleLogin() {
      // 表单校验
      this.$v.form.$touch()

      if (this.$v.form.$anyError) return false

      const emailIsValid = this.emailIsValid(this.form.username)
      const fomrData = {
        password: this.form.pwd
      }

      // 登录按钮禁用
      this.isDisabled = true
      // 显示 spinner
      this.showSpinner = true

      if (emailIsValid) {
        fomrData.email = this.form.username
      } else {
        fomrData.name = this.form.username
      }

      await this.login(fomrData)

      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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
      .icon-username,
      .icon-password {
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
      .invalid-feedback {
        font-size: 14px;
      }
    }
    .register_pc_direct_register {
      right: 48px;
      bottom: 14px;
    }
  }
}
</style>
