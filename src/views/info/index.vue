<template>
  <div v-if="user.email" class="container-lg info-container">
    <validate-form v-slot="{ meta }" :validation-schema="schema">
      <div class="info-box d-flex justify-content-center align-items-center">
        <div style="width: 420px">
          <div class="d-flex flex-column align-items-center">
            <h1 class="mb-5">個人資料</h1>
            <div class="w-100 d-flex align-items-center flex-column">
              <input-text
                v-model="user.email"
                name="email"
                placeholder="信箱"
                class="w-100 mb-4"
              />

              <input-text
                v-model="user.new_password"
                name="password"
                type="password"
                placeholder="新密碼"
                class="w-100 mb-4"
              />

              <input-text
                v-model="user.confirmPassword"
                name="confirm_password"
                type="password"
                placeholder="密碼確認"
                class="w-100 mb-4"
              />

              <input-text
                v-model="user.line_id"
                name="line"
                placeholder="Line ID"
                class="w-100 mb-4"
              />
            </div>

            <div class="d-flex justify-content-center">
              <button
                class="btn btn-primary"
                style="border-radius: 20px"
                :disabled="!meta.valid"
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
import { InputText } from '@/components'
import { apiGetUserInfo, apiPatchUserInfo } from '../../services/api'
import { Form as ValidateForm } from 'vee-validate'
import * as Yup from 'yup'

export default defineComponent({
  name: 'Info',
  components: { InputText, ValidateForm },
  setup() {
    const schema = Yup.object().shape({
      email: Yup.string().email('請輸入正確格式').required('必填'),
      password: Yup.string().min(8, '最少8個字元'),
      confirm_password: Yup.string().oneOf([Yup.ref('password')], '密碼不一致'),
      line: Yup.string(),
    })

    return {
      schema,
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        provider: '',
        line_id: '',
        server_name: '',
        confirmPassword: '',
        new_password: '',
      },
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      try {
        const {
          data: { result },
        } = await apiGetUserInfo()
        this.user = result
      } catch (e) {
        console.log(e)
      }
    },
    async updateHandler() {
      console.log(123)
      try {
        await apiPatchUserInfo({ line_id: this.user.line_id })
        await this.getUserData()
      } catch (e) {
        console.log(e)
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
  width: 700px;
  position: relative;
}

.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 130px);
}
</style>
