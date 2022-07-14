<template>
  <div class="item-card d-flex mb-2">
    <div class="col-7">
      <div class="item-img-box d-flex align-items-center px-2">
        <div class="item-img me-2" :class="setLevelColor(data.potential_level)">
          <img :src="data.product_list_data.image" />
        </div>
        <div
          class="sell-card-detail d-flex flex-column justify-content-between"
        >
          <div>{{ data.product_list_data.name }}</div>
          <div>
            <div class="d-flex w-100">
              <div class="align-self-center me-1">
                <img
                  src="@/assets/images/coin.png"
                  style="width: 20px; height: 20px"
                />
              </div>
              <div class="align-self-center">{{ formatPrice(data.price) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3 d-flex justify-content-center align-self-center">
      <div class="d-flex justify-content-center w-100">
        <div class="align-self-center">
          <span> 2022/03/01 19:43</span>
        </div>
      </div>
    </div>

    <div class="col-2 align-self-center d-flex justify-content-center">
      <span> 販售中 </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { productMixin } from '@/mixins'

export default defineComponent({
  mixins: [productMixin],
  props: { data: Object },
  data() {
    return {}
  },
  methods: {
    setLevelColor(level) {
      switch (level) {
        case '普通':
          return 'stage-1'
        case '稀有':
          return 'stage-2'
        case '史詩':
          return 'stage-3'
        case '罕見':
          return 'stage-4'
        case '傳說':
          return 'stage-5'
        case '神話':
          return 'stage-6'
        case '古代':
          return 'stage-7'
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.sell-card-detail {
  height: 100%;
  padding: 8px 0;
}
</style>
