<template>
  <div v-if="user.email !== null" class="container-lg info-container">
    <validate-form v-slot="{ meta }" :validation-schema="schema">
      <div class="info-box d-flex justify-content-center align-items-center">
        <div style="width: 600px">
          <div class="d-flex flex-column align-items-center">
            <h1 class="mb-5">個人資料</h1>
            <div class="w-100 d-flex align-items-center flex-column">
              <!-- 信箱 -->
              <div class="w-100 d-flex">
                <div class="label-box">信箱</div>
                <div class="form-box w-100">
                  <input-valid-text
                    v-model="user.email"
                    name="email"
                    class="w-100 mb-4"
                    :disabled="user.provider !== '無'"
                  />
                </div>
              </div>
              <!-- 信箱 -->

              <!-- line_id -->
              <div class="w-100 d-flex">
                <div class="label-box">Line ID</div>
                <div class="form-box w-100">
                  <input-valid-text
                    v-model="user.line_id"
                    name="line"
                    class="w-100 mb-4"
                  />
                </div>
              </div>
              <!-- line_id -->

              <!-- server -->
              <div
                class="w-100 d-flex"
                :class="user.provider === '無' ? 'mb-4' : 'mb-5'"
              >
                <div class="label-box">伺服器</div>
                <div class="form-box w-100">
                  <input-select v-model="user.server_name" :options="server" />
                </div>
              </div>
              <!-- server -->

              <template v-if="this.user.provider === '無'">
                <!-- 新密碼 -->
                <div class="w-100 d-flex">
                  <div class="label-box">新密碼</div>
                  <div class="form-box w-100 mb-4">
                    <input-text
                      v-model="new_password"
                      :class="passwordIsError ? 'has-error' : ''"
                      type="password"
                      class="w-100"
                    />
                    <p v-if="passwordIsError" class="help-message">
                      最少8個字元
                    </p>
                  </div>
                </div>
                <!-- 新密碼 -->

                <!-- 密碼確認 -->
                <div class="w-100 d-flex">
                  <div class="label-box">密碼確認</div>
                  <div class="form-box w-100 mb-5">
                    <input-text
                      v-model="confirmPassword"
                      name="password"
                      type="password"
                      :class="cPasswordIsError ? 'has-error' : ''"
                      class="w-100"
                    />
                    <p v-if="cPasswordIsError" class="help-message">
                      密碼不一致
                    </p>
                  </div>
                </div>
                <!-- 密碼確認 -->
              </template>
            </div>

            <div class="d-flex justify-content-center">
              <button
                class="btn btn-primary"
                style="border-radius: 20px"
                :disabled="!meta.valid || cPasswordIsError || passwordIsError"
                @click.prevent="updateHandler"
              >
                更新
              </button>
            </div>
          </div>
        </div>
      </div>
    </validate-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { InputValidText, InputText, InputSelect } from '@/components'
import { apiGetUserInfo, apiPatchUserInfo } from '../../services/api'
import { Form as ValidateForm } from 'vee-validate'
import * as Yup from 'yup'

export default defineComponent({
  name: 'Info',
  components: { InputValidText, ValidateForm, InputText, InputSelect },
  setup() {
    const schema = Yup.object().shape({
      email: Yup.string().email('請輸入正確格式').required('必填'),
      line: Yup.string(),
    })

    return {
      schema,
    }
  },
  data() {
    return {
      user: {
        id: null,
        email: null,
        provider: '',
        line_id: '',
        server_name: '',
      },
      confirmPassword: '',
      new_password: '',
      server: ['傑尼斯', '斯卡尼亞', '露娜', '溫迪亞', '凱伊尼'],
    }
  },
  mounted() {
    let loader = this.$loading.show()
    try {
      this.getUserData()
    } catch (e) {
      console.log(e)
    } finally {
      loader.hide()
    }
  },
  computed: {
    passwordIsError() {
      return this.new_password !== '' && this.new_password.length < 8
    },
    cPasswordIsError() {
      return this.confirmPassword !== this.new_password
    },
  },
  methods: {
    async getUserData() {
      const {
        data: { result },
      } = await apiGetUserInfo()
      this.user = result
    },
    async updateHandler() {
      let loader = this.$loading.show()
      try {
        await apiPatchUserInfo(this.user.id, {
          email: this.user.email,
          line_id: this.user.line_id,
          new_password:
            this.new_password === '' ? undefined : this.new_password,
          new_password2:
            this.confirmPassword === '' ? undefined : this.confirmPassword,
          server_name: this.user.server_name ? this.user.server_name : '無',
        })
        this.new_password = ''
        this.confirmPassword = ''
        await this.getUserData()
        this.$notify({ type: 'success', text: '更新成功!' })
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },
    passwordHandler() {
      if (
        this.new_password !== '' &&
        this.new_password !== this.confirmPassword
      ) {
        this.cPasswordIsError = true
      } else {
        this.cPasswordIsError = false
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.info-box {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  height: 800px;
  width: 900px;
  position: relative;
}

.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 130px);
}

.label-box {
  width: 110px;
  margin-top: 6px;
}
</style>
