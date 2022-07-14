<template>
  <app-modal
    ref="appModal"
    header-class="d-flex align-items-start"
    only-close-btn
    scrollable
    @hiddenHandler="reset"
  >
    <template v-slot:header>
      <div class="modal-title">聯絡資訊</div>
    </template>
    <template v-if="isLoaded" v-slot:body> {{ contactDetail }} </template>
  </app-modal>
</template>

<script>
import { defineComponent } from 'vue'
import { AppModal } from '@/components'

export default defineComponent({
  components: {
    AppModal,
  },
  data() {
    return {
      contactDetail: {},
    }
  },
  methods: {
    show(contactDetail) {
      this.contactDetail = contactDetail
      this.$refs['appModal'].show()
    },
    reset() {
      this.contactDetail = {}
    },
  },
  computed: {
    isLoaded() {
      if (this.contactDetail) {
        return true
      } else {
        return false
      }
    },
  },
})
</script>
