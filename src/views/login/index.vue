<template>
  <div
    class="container-lg h-100 d-flex justify-content-center align-items-center"
  >
    <validate-form v-slot="{ meta }">
      <div class="login-box d-flex justify-content-center align-items-center">
        <div class="w-60">
          <div class="d-flex flex-column align-items-center">
            <h1 class="mb-5">{{ isRegister ? "註冊" : "登入" }}</h1>

            <div v-if="!isRegister" class="w-100">
              <field
                name="帳號"
                rules="required"
                as="div"
                class="mb-4"
                v-slot="{ field, meta: { valid, touched }, errorMessage }"
              >
                <input-text
                  v-bind="field"
                  v-model="account"
                  placeholder="帳號"
                  class="login-input"
                  :class="!valid && touched ? 'has-error' : ''"
                />
                <div class="errorMessage w-100 my-2">
                  {{ errorMessage }}
                </div>
              </field>

              <field
                name="password"
                rules="required"
                as="div"
                class="mb-4"
                v-slot="{ field, meta: { valid, touched }, errorMessage }"
              >
                <input-text
                  v-bind="field"
                  v-model="password"
                  type="password"
                  class="login-input"
                  :class="!valid && touched ? 'has-error' : ''"
                  placeholder="密碼"
                />
                <div class="errorMessage w-100 my-2">
                  {{ errorMessage }}
                </div>
              </field>
            </div>

            <div v-else class="w-100">
              <field
                name="regisAccount"
                rules="required"
                as="div"
                class="mb-4"
                v-slot="{ field, meta: { valid, touched }, errorMessage }"
              >
                <input-text
                  v-bind="field"
                  v-model="regisAccount"
                  placeholder="帳號"
                  class="login-input"
                  :class="!valid && touched ? 'has-error' : ''"
                />
                <div class="errorMessage w-100 my-2">
                  {{ errorMessage }}
                </div>
              </field>

              <field
                name="regispassword"
                rules="required"
                as="div"
                class="mb-4"
                v-slot="{ field, meta: { valid, touched }, errorMessage }"
              >
                <input-text
                  v-bind="field"
                  v-model="regisPassword"
                  type="password"
                  class="login-input"
                  :class="!valid && touched ? 'has-error' : ''"
                  placeholder="密碼"
                />
                <div class="errorMessage w-100 my-2">
                  {{ errorMessage }}
                </div>
              </field>

              <field
                name="confirmPassword"
                :rules="`required|confirmed:${regisPassword}`"
                as="div"
                class="mb-4"
                v-slot="{ field, meta: { valid, touched }, errorMessage }"
              >
                <input-text
                  v-bind="field"
                  v-model="confirmPassword"
                  type="password"
                  class="login-input"
                  :class="!valid && touched ? 'has-error' : ''"
                  placeholder="密碼確認"
                />
                <div class="errorMessage w-100 my-2">
                  {{ errorMessage }}
                </div>
              </field>

              <field
                name="email"
                rules="required|email"
                as="div"
                class="mb-4"
                v-slot="{ field, meta: { valid, touched } }"
              >
                <input-text
                  v-model="email"
                  v-bind="field"
                  placeholder="信箱"
                  class="login-input"
                  :class="!valid && touched ? 'has-error' : ''"
                />
                <div class="errorMessage w-100 my-2">
                  <span v-if="!valid && touched">請輸入有效信箱</span>
                </div>
              </field>

              <field
                name="Line ID"
                rules="required"
                as="div"
                class="mb-4"
                v-slot="{ field, meta: { valid, touched }, errorMessage }"
              >
                <input-text
                  v-bind="field"
                  v-model="line_id"
                  placeholder="Line ID"
                  class="login-input"
                  :class="!valid && touched ? 'has-error' : ''"
                />
                <div class="errorMessage w-100 my-2">
                  {{ errorMessage }}
                </div>
              </field>
            </div>

            <button
              class="btn btn-primary mb-2"
              @click.prevent="loginHandler"
              style="border-radius: 20px"
              :disabled="!meta.valid"
            >
              {{ isRegister ? "註冊" : "登入" }}
            </button>

            <div class="d-flex justify-content-end w-100">
              <span class="register-text" @click="setIsRegister">
                {{ isRegister ? "返回登入" : "進行註冊" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { InputText } from "@/components"
import { apiLogin } from "../../services/api"
import { Form as ValidateForm, Field, defineRule } from "vee-validate"
import { email } from "@vee-validate/rules"
import Swal from "sweetalert2"

defineRule("confirmed", (value: any, [target]: any) => {
  if (value === target) {
    return true
  }
  return "請輸入相同的密碼"
})

defineRule("email", email)

export default defineComponent({
  name: "Login",
  components: { InputText, ValidateForm, Field },
  data() {
    return {
      isRegister: false,
      account: "",
      regisAccount: "",
      password: "",
      regisPassword: "",
      confirmPassword: "",
      email: "",
      line_id: "",
    }
  },
  methods: {
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
          this.regisAccount = ""
          this.regisPassword = ""
          this.confirmPassword = ""
          this.email = ""
          this.line_id = ""
          this.$notify({ type: "success", text: "註冊成功!" })
        } else {
          document.cookie = `accessToken=${data.result.access}`
          document.cookie = `refreshToken=${data.result.refresh}`
          this.$router.push("/")
        }
      } catch (e) {
        Swal.fire({
          title: this.isRegister ? "註冊失敗!" : "登入失敗!",
          icon: "error",
          confirmButtonText: "確認",
        })
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
}

.register-text {
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #fff;
  }
}

.login-input {
  border-radius: 20px;
  height: 45px;
}
</style>
