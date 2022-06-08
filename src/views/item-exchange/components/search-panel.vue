<template>
  <div class="exchange-search-panel px-5">
    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-2 d-flex justify-content-end align-self-center pe-3">
          楓底
        </div>
        <div class="col-10 align-self-center">
          <input-select
            v-model="searchCondition.is_maple"
            :options="isMapleOptions"
          />
        </div>
      </div>
      <div class="col-6 d-flex">
        <div class="col-2 d-flex justify-content-end align-self-center pe-3">
          紋章屬性
        </div>
        <div class="col-10 align-self-center">
          <input-select
            v-model="searchCondition.maple_capability"
            :options="mapleCapabilityOptions"
            @input="capabilityHandler"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-2 d-flex justify-content-end align-self-center pe-3">
          階級
        </div>
        <div class="col-10 align-self-center">
          <input-select
            v-model="searchCondition.stage_level"
            multiple
            :options="stageLevelOptions"
            :close-on-select="false"
          />
        </div>
      </div>

      <div class="col-6 d-flex">
        <div class="col-2 d-flex justify-content-end align-self-center pe-3">
          最高等級
        </div>
        <div class="col-10 align-self-center">
          <input-text v-model="searchCondition.total_level" type="number" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-2 d-flex justify-content-end align-self-center pe-3">
          星力
        </div>
        <div class="col-10 align-self-center">
          <input-text v-model="searchCondition.star" type="number" />
        </div>
      </div>

      <div class="col-6 d-flex">
        <div class="col-2 d-flex justify-content-end align-self-center pe-3">
          價格
        </div>
        <div class="col-10 d-flex align-items-center">
          <div class="col-5 align-self-center" style="width: 47.5%">
            <input-text v-model="searchCondition.min_price" type="number" />
          </div>
          <div class="mx-2 d-flex justify-content-center" style="width: 5%">
            ~
          </div>
          <div class="col-5 align-self-center" style="width: 47.5%">
            <input-text v-model="searchCondition.max_price" type="number" />
          </div>
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
import { InputSelect, InputText } from '@/components'

export default defineComponent({
  name: 'SearchPanel',
  components: { InputSelect, InputText },
  data() {
    return {
      searchCondition: {
        category: '',
        type: '',
        stage_level: [],
        star: undefined,
        is_maple: undefined,
        maple_capability: undefined,
        total_level: undefined,
        min_price: undefined,
        max_price: undefined,
        ordering: undefined,
      },
      stageLevelOptions: [
        { label: '普通', value: '1' },
        { label: '稀有', value: '2' },
        { label: '史詩', value: '3' },
        { label: '罕見', value: '4' },
        { label: '傳說', value: '5' },
        { label: '神話', value: '6' },
        { label: '古代', value: '7' },
        { label: '死靈', value: '8' },
      ],
      isMapleOptions: [
        { label: '無', value: 0 },
        { label: '包含', value: 1 },
      ],
      mapleCapabilityOptions: [
        '致命傷害',
        'Boss傷害',
        'Boss防禦',
        '物攻',
        '魔攻',
      ],
    }
  },
  methods: {
    capabilityHandler() {
      this.searchCondition.is_maple = 1
    },
  },
})
</script>
