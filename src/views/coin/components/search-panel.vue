<template>
  <div class="exchange-search-panel px-5">
    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          標題
        </div>
        <div class="col-9 align-self-center">
          <input-text v-model="searchCondition.title" />
        </div>
      </div>
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          伺服器
        </div>
        <div class="col-9 align-self-center">
          <input-select
            v-model="searchCondition.server_name"
            label="label"
            trackBy="value"
            :options="serverOptions"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          幣值
        </div>
        <div class="col-9 align-self-center">
          <input-text v-model="searchCondition.value" type="number" />
        </div>
      </div>

      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          總額(億)
        </div>
        <div class="col-9 align-self-center">
          <input-text v-model="searchCondition.total" type="number" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <button
          class="btn search-btn"
          @click="$emit('search', searchCondition)"
        >
          查詢
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { InputText, InputSelect } from '@/components'
import { serverOptions } from '@/data'

export default defineComponent({
  name: 'SearchPanel',
  components: { InputSelect, InputText },
  data() {
    return {
      searchCondition: {
        title: '',
        total: '',
        value: '',
        server_name: '',
      },
      serverOptions: serverOptions,
    }
  },
  methods: {},
})
</script>
