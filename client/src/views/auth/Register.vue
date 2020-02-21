<template>
  <div class="register">
    <div class="container h-100">
      <div
        class="row h-100 flex-column justify-content-center align-items-center"
      >
        <!-- Title -->
        <h1 class="title text-black font-weight-normal">后台管理系统</h1>

        <!-- Form -->
        <div class="form-container bg-white p-5 rounded-lg">
          <!-- Subtitle -->
          <h2 class="subtitle text-black text-center font-weight-normal mb-4">
            注册
          </h2>

          <b-form class="form" autocomplete="off" @submit="handleSubmit">
            <!-- Name -->
            <b-form-group label="用户名" label-for="name">
              <b-form-input
                type="text"
                id="name"
                v-model="form.name"
                required
                placeholder="请输入用户名"
                class="rounded-lg"
              ></b-form-input>
            </b-form-group>

            <!-- Email -->
            <b-form-group label="邮箱" label-for="email">
              <b-form-input
                type="email"
                id="email"
                v-model="form.email"
                required
                placeholder="请输入邮箱"
                class="rounded-lg"
              ></b-form-input>
            </b-form-group>

            <!-- Password -->
            <b-form-group label="密码" label-for="name">
              <b-form-input
                type="password"
                id="name"
                v-model="form.pwd"
                required
                placeholder="请输入密码"
                class="rounded-lg"
              ></b-form-input>
            </b-form-group>

            <!-- Confirm Password -->
            <b-form-group label="确认密码" label-for="name">
              <b-form-input
                type="password"
                id="name"
                v-model="form.confirmPwd"
                required
                placeholder="请确认密码"
                class="rounded-lg"
              ></b-form-input>
            </b-form-group>

            <!-- Identity -->
            <b-form-group label="选择身份">
              <b-form-select
                v-model="form.identity"
                class="rounded-lg"
                :class="{ active: form.selected ? 'active' : '' }"
              >
                <b-form-select-option :value="null" hidden>
                  请选择身份
                </b-form-select-option>
                <b-form-select-option value="manager">
                  管理员
                </b-form-select-option>
                <b-form-select-option value="employee">
                  员工
                </b-form-select-option>
              </b-form-select>
            </b-form-group>

            <!-- Submit -->
            <b-button
              type="submit"
              variant="dark"
              class="submit d-block w-100 mx-auto mt-4 rounded-lg"
              size="lg"
            >
              注册
            </b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        pwd: '',
        confirmPwd: '',
        identity: null
      }
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
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
      font-size: 14px;

      input,
      &::placeholder {
        font-size: 14px;
      }

      select {
        font-size: 14px;
        color: #6c757d;

        &.active {
          color: #495057;
        }
      }

      .submit {
        font-size: 14px;
      }
    }
  }
}
</style>
