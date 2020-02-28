<template>
  <div class="login w-100 h-100">
    <div
      class="container h-100 d-flex flex-column justify-content-center align-items-center"
    >
      <!-- Title -->
      <h1 class="title text-black font-weight-normal">后台管理系统</h1>

      <!-- Form Container -->
      <div class="form-container bg-white p-5 rounded-lg">
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
              <span v-if="!$v.form.username.required">请输入账户</span>
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
              <span v-if="!$v.form.pwd.required">请输入密码</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Submit -->
          <b-button
            type="submit"
            variant="dark"
            class="submit d-block w-100 mx-auto text-sm"
            size="lg"
          >
            登录
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BIconEyeFill,
  BIconEyeSlashFill,
  BIconLockFill,
  BIconPersonFill
} from 'bootstrap-vue'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    BIconEyeFill,
    BIconEyeSlashFill,
    BIconLockFill,
    BIconPersonFill
  },
  data() {
    return {
      form: {
        username: '',
        pwd: '',
        pwdType: 'password',
        showPwd: false
      }
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
    handleLogin() {
      this.$v.form.$touch()

      if (this.$v.form.$anyError) return false
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
    letter-spacing: 0.2em;
    font-size: 32px;
    color: rgb(34, 34, 34);
  }
  .form-container {
    width: 45%;
    .subtitle {
      letter-spacing: 0.2em;
      font-size: 24px;
      color: rgb(34, 34, 34);
    }
    .form {
      .icon-username,
      .icon-password {
        top: 12px;
        left: 16px;
      }
      .icon-eye {
        top: 11px;
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
  }
}
</style>
