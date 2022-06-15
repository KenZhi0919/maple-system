<template>
  <div class="container-lg login-container">
    <div class="login-box d-flex justify-content-center align-items-center">
      <div class="w-60">
        <div class="d-flex flex-column align-items-center">
          <h1 class="mb-5">{{ isRegister ? '註冊' : '登入' }}</h1>
          <!-- 登入 start -->
          <div v-if="!isRegister" class="w-100">
            <validate-form :validation-schema="loginSchema" v-slot="{ meta }">
              <input-text
                v-model="account"
                name="account"
                placeholder="帳號"
                class="mb-4"
              />

              <input-text
                v-model="password"
                name="password"
                type="password"
                placeholder="密碼"
                class="mb-4"
              />

              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-primary"
                  @click.prevent="loginHandler"
                  style="border-radius: 20px"
                  :disabled="!meta.valid"
                >
                  登入
                </button>
              </div>
            </validate-form>
          </div>
          <!-- 登入 end -->

          <!-- 註冊 start -->
          <div v-else class="w-100">
            <validate-form
              :validation-schema="registerSchema"
              v-slot="{ meta }"
            >
              <input-text
                v-model="regisAccount"
                name="account"
                placeholder="帳號"
                class="mb-4"
              />

              <input-text
                v-model="regisPassword"
                name="password"
                type="password"
                placeholder="密碼"
                class="mb-4"
              />

              <input-text
                v-model="confirmPassword"
                name="confirm_password"
                type="password"
                placeholder="密碼確認"
                class="mb-4"
              />

              <input-text
                v-model="email"
                name="email"
                placeholder="信箱"
                class="mb-4"
              />

              <input-text
                v-model="line_id"
                name="line"
                placeholder="Line ID"
                class="mb-4"
              />

              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-primary"
                  @click.prevent="loginHandler"
                  style="border-radius: 20px"
                  :disabled="!meta.valid"
                >
                  註冊
                </button>
              </div>
            </validate-form>
          </div>

          <div v-if="!isRegister" class="my-4 d-flex align-items-center">
            <div class="line" />
            <span class="mx-3"> OR </span>
            <div class="line" />
          </div>

          <google-login v-if="!isRegister" :callback="callback" />

          <div class="d-flex justify-content-center w-100 regis-btn">
            <span class="register-text" @click="setIsRegister">
              {{ isRegister ? '返回登入' : '點我註冊' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { InputText } from '@/components'
import { apiLogin, apiLoginThirdParty } from '../../services/api'
import { Form as ValidateForm } from 'vee-validate'
import { decodeCredential } from 'vue3-google-login'
import * as Yup from 'yup'

export default defineComponent({
  name: 'Login',
  components: { InputText, ValidateForm },
  setup() {
    const loginSchema = Yup.object().shape({
      account: Yup.string().min(6, '最少6個字元'),
      password: Yup.string().min(8, '最少8個字元').required('必填'),
    })
    const registerSchema = Yup.object().shape({
      account: Yup.string()
        .min(6, '最少6個字元')
        .max(30, '最多30個字元')
        .required('必填'),
      password: Yup.string().min(8, '最少8個字元').required('必填'),
      email: Yup.string().email('請輸入正確格式').required('必填'),
      confirm_password: Yup.string()
        .required('必填')
        .oneOf([Yup.ref('password')], '密碼不一致'),
      line: Yup.string(),
    })

    return {
      loginSchema,
      registerSchema,
    }
  },
  data() {
    return {
      isRegister: false,
      account: '',
      regisAccount: '',
      password: '',
      regisPassword: '',
      confirmPassword: '',
      email: '',
      line_id: '',
    }
  },
  methods: {
    async callback(res) {
      let loader = this.$loading.show()
      try {
        const userData = await decodeCredential(res.credential)
        const {
          data: { result },
        } = await apiLoginThirdParty({
          token: res.credential,
          type: 'google',
        })
        this.$store.dispatch('setUser', {
          name: userData.name,
          email: userData.email,
        })
        document.cookie = `accessToken=${result.access}`
        document.cookie = `refreshToken=${result.refresh}`
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },
    async loginHandler() {
      let loader = this.$loading.show()
      try {
        const { data } = await apiLogin({
          username: this.isRegister ? this.regisAccount : this.account,
          password: this.isRegister ? this.regisPassword : this.password,
          password2: this.isRegister ? this.confirmPassword : undefined,
          email: this.isRegister ? this.email : undefined,
          line_id: this.isRegister ? this.line_id : undefined,
        })

        if (this.isRegister) {
          this.isRegister = false
          this.regisAccount = ''
          this.regisPassword = ''
          this.confirmPassword = ''
          this.email = ''
          this.line_id = ''
          this.$notify({ type: 'success', text: '註冊成功!' })
        } else {
          document.cookie = `accessToken=${data.result.access}`
          document.cookie = `refreshToken=${data.result.refresh}`
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },
    setIsRegister() {
      this.isRegister = !this.isRegister
    },
  },
})
</script>

<style lang="scss" scoped>
.login-box {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  height: 800px;
  width: 700px;
  position: relative;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh);
}

.register-text {
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #fff;
  }
}

.line {
  height: 1px;
  width: 180px;
  background-color: #6c757d;
}

#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  width: 230px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}

#customBtn:hover {
  cursor: pointer;
}

span.label {
  font-family: serif;
  font-weight: normal;
}

span.icon {
  background: url('https://developers-dot-devsite-v2-prod.appspot.com/identity/sign-in/g-normal.png')
    transparent 5px 50% no-repeat;
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
}

span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: 'Roboto', sans-serif;
}

.regis-btn {
  position: absolute;
  bottom: 60px;
}
</style>
