<template>
  <validate-form
    :validation-schema="schema"
    validateOnMount
    v-slot="{ meta: { valid } }"
  >
    <app-modal
      ref="appModal"
      size="xl"
      header-class="d-flex align-items-start"
      :valid="valid"
      @hiddenHandler="reset"
      @submit="submitHandler"
    >
      <template v-slot:header>
        <div class="modal-title">賣幣</div>
      </template>

      <template v-if="showDialogContent" v-slot:body>
        <div style="overflow-y: scroll; max-height: 60vh; padding: 0 20px">
          <div class="row">
            <div class="col-6 d-flex mb-2">
              <div class="col-3 pt-2">標題</div>
              <div class="col-9">
                <input-text v-model="postData.title" name="title" />
              </div>
            </div>

            <div class="col-6 d-flex mb-2">
              <div class="col-3 pt-2">付款方式</div>
              <div class="col-9">
                <input-text v-model="postData.pay_method" name="payMethod" />
              </div>
            </div>

            <div class="col-6 d-flex mb-2">
              <div class="col-3 pt-2">幣值</div>
              <div class="col-9">
                <input-text
                  v-model="postData.value"
                  name="value"
                  type="number"
                />
              </div>
            </div>

            <div class="col-6 d-flex mb-2">
              <div class="col-3 pt-2">總額(億)</div>
              <div class="col-9">
                <input-text
                  v-model="postData.total"
                  name="total"
                  type="number"
                />
              </div>
            </div>

            <div class="col-6 d-flex mb-2">
              <div class="col-3 pt-2">聯絡方式</div>
              <div class="col-9">
                <input-text name="contactMethod" />
              </div>
            </div>

            <div class="col-6 d-flex mb-2">
              <div class="col-3 pt-2">聯絡資訊</div>
              <div class="col-9">
                <input-text name="contactExplanation" />
              </div>
            </div>

            <div class="col-6 d-flex mb-2">
              <div class="col-3 pt-2">伺服器</div>
              <div class="col-9">
                <input-select
                  v-model="postData.server_name"
                  :options="serverOptions"
                  name="server"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </app-modal>
  </validate-form>
</template>

<script>
import { defineComponent } from 'vue'
import { AppModal, InputText, InputSelect } from '@/components'
import { serverOptions } from '@/data'
import {} from '@/services/api'
import * as yup from 'yup'
import { Form as ValidateForm } from 'vee-validate'

export default defineComponent({
  components: {
    AppModal,
    InputSelect,
    InputText,
    ValidateForm,
  },
  setup() {
    const schema = yup.object().shape({
      title: yup.string(),
      payMethod: yup.string().required('必填'),
      value: yup.string().required('必填'),
      total: yup.string().required('必填'),
      contactMethod: yup.string().required('必填'),
      contactExplanation: yup.string().required('必填'),
      serverName: yup.string().required('必填'),
    })

    return {
      schema,
    }
  },
  data() {
    return {
      serverOptions: serverOptions,
      showDialogContent: false,
      postData: {
        title: '',
        pay_method: '',
        value: '',
        total: '',
        server_name: '',
      },
    }
  },
  methods: {
    show() {
      this.showDialogContent = true
      this.$refs['appModal'].show()
    },
    setDefaultProduct() {
      this.postData = {
        title: '',
        pay_method: '',
        value: '',
        total: '',
        server_name: '',
      }
    },
    reset() {
      this.postData = {}
    },
    async submitHandler() {
      let loader = this.$loading.show()

      try {
        // await apiPostProduct({})
        this.$refs['appModal'].hide()
        this.$emit('reload')
        this.$notify({ type: 'success', text: '登錄成功!' })
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },
  },
  computed: {
    isLoaded() {
      if (this.postData && this.postData.title) {
        return true
      } else {
        return false
      }
    },
  },
})
</script>
