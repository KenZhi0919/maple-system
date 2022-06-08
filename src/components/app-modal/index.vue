<template>
  <!-- Modal -->
  <div class="modal fade" id="appModal" tabindex="-1" data-focus="false">
    <div
      class="modal-dialog modal-dialog-centered"
      :class="`modal-${size} ${scrollable ? 'modal-dialog-scrollable' : ''}`"
    >
      <div
        class="modal-content"
        style="background-color: #f1f1f1; color: #555b62"
      >
        <validate-form v-slot="{ meta: { valid } }" :validation-schema="schema">
          <div class="modal-header" :class="headerClass">
            <slot name="header" />
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              style="opacity: 0.9"
            />
          </div>
          <div class="modal-body" style="max-height: 65vh">
            <slot name="body" />
          </div>
          <div class="modal-footer" style="background-color: #f1f1f1">
            <div
              class="w-100 d-flex justify-content-center"
              v-if="onlyCloseBtn"
            >
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                關閉
              </button>
            </div>
            <div v-else>
              <button
                type="button"
                class="btn btn-secondary me-3"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                :disabled="!valid"
                @click="$emit('submit')"
              >
                販售登錄
              </button>
            </div>
          </div>
        </validate-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Modal } from 'bootstrap'
import { Form as ValidateForm } from 'vee-validate'

export default defineComponent({
  name: 'AppModal',
  components: {
    ValidateForm,
  },
  mounted() {
    const myModalEl = document.querySelector('#appModal')
    if (myModalEl) {
      this.modal = Modal.getOrCreateInstance(myModalEl) // Returns a Bootstrap modal instance
      myModalEl.addEventListener('hidden.bs.modal', () => {
        this.$emit('hidden-handler')
      })
    }
  },
  props: {
    headerClass: {
      type: String,
    },
    size: {
      type: String,
      default: 'lg',
    },
    onlyCloseBtn: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    schema: {
      required: false,
    },
  },
  data() {
    return {
      modal: {},
    }
  },
  methods: {
    show() {
      this.modal.show()
    },
    hide() {
      this.modal.hide()
    },
  },
})
</script>
