<template>
  <div class="register w-100 h-100">
    <div
      class="container h-100 d-flex flex-column justify-content-center align-items-center"
    >
      <!-- Title -->
      <h1 class="title text-black font-weight-normal">后台管理系统</h1>

      <!-- Form -->
      <div class="form-container bg-white p-5 rounded-lg">
        <!-- Subtitle -->
        <h2 class="subtitle text-black text-center font-weight-normal mb-4">
          注册
        </h2>

        <b-form class="form" autocomplete="off" @submit.prevent="handleSubmit">
          <!-- Name -->
          <b-form-group class="mb-4">
            <b-form-input
              trim
              size="lg"
              type="text"
              placeholder="用户名"
              v-model="$v.form.name.$model"
              :state="validateState('name')"
              class="text-sm text-black"
            ></b-form-input>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span v-if="!$v.form.name.required">请告诉我你的用户名吧</span>
              <span v-if="!$v.form.name.minLength">用户名过短</span>
              <span v-if="!$v.form.name.maxLength">用户名过长</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Email -->
          <b-form-group class="mb-4">
            <b-form-input
              size="lg"
              type="email"
              v-model="$v.form.email.$model"
              :state="validateState('email')"
              placeholder="邮箱（6 - 30个字符组成，不区分大小写）"
              class="text-sm text-black"
            ></b-form-input>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span v-if="!$v.form.email.required">请告诉我你的邮箱吧</span>
              <span v-if="!$v.form.email.email">邮箱格式错误</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Password -->
          <b-form-group class="mb-4">
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

              <b-input-group-append>
                <b-input-group-text @click="toggleIcon">
                  <b-icon-eye v-if="form.showPwd"></b-icon-eye>
                  <b-icon-eye-slash v-else></b-icon-eye-slash>
                </b-input-group-text>
              </b-input-group-append>

              <!-- Feedback -->
              <b-form-valid-feedback></b-form-valid-feedback>
              <b-form-invalid-feedback>
                <span v-if="!$v.form.pwd.required || !$v.form.pwd.minLength">
                  密码不能小于 6 个字符
                </span>
                <span v-if="!$v.form.pwd.maxLength">
                  密码不能大于 16 个字符
                </span>
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <!-- Repeat Password -->
          <b-form-group class="mb-4">
            <b-form-input
              trim
              size="lg"
              type="password"
              v-model="$v.form.repeatPwd.$model"
              :state="validateState('repeatPwd')"
              placeholder="请确认密码"
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

          <!-- Identity -->
          <b-form-group class="mb-4">
            <b-form-select
              v-model.trim="$v.form.identity.$model"
              :state="validateState('identity')"
              class="text-sm text-gray"
              :class="{ active: form.identity ? 'active' : '' }"
              size="lg"
            >
              <b-form-select-option value hidden>
                请选择身份
              </b-form-select-option>
              <b-form-select-option value="manager">
                管理员
              </b-form-select-option>
              <b-form-select-option value="employee">员工</b-form-select-option>
            </b-form-select>

            <!-- Feedback -->
            <b-form-valid-feedback></b-form-valid-feedback>
            <b-form-invalid-feedback>
              <span v-if="!$v.form.identity.required">请选择身份</span>
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
            注册
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { BIconEye, BIconEyeSlash } from 'bootstrap-vue'
import {
  required,
  sameAs,
  minLength,
  maxLength,
  email
} from 'vuelidate/lib/validators'

export default {
  components: {
    BIconEye,
    BIconEyeSlash
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        pwd: '',
        pwdType: 'password',
        repeatPwd: '',
        identity: '',
        showPwd: false
      }
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
      identity: {
        required
      }
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    toggleIcon() {
      this.form.showPwd = !this.form.showPwd

      if (this.form.showPwd) {
        this.form.pwdType = 'text'
      } else {
        this.form.pwdType = 'password'
      }
    },
    handleSubmit() {
      const { form } = this.$v
      form.$touch()

      if (form.$anyError) {
        return
      }

      this.register({
        name: this.form.name,
        email: this.form.email,
        password: this.form.pwd
      })
    }
  },
  computed: {
    isDisabled: function() {
      return this.$v.form.$invalid
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
      input {
        &::placeholder {
          color: rgb(117, 117, 117);
        }
      }

      select {
        &.active {
          color: #000;
        }
      }

      .invalid-feedback {
        font-size: 14px;
      }
    }
  }
}
</style>
