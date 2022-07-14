<template>
  <div class="item-card d-flex mb-2">
    <div class="col-4 align-self-center d-flex">
      <span class="ms-4">{{ index + 1 }}. {{ coin.title }}</span>
    </div>
    <div class="col-3 align-self-center d-flex justify-content-center">
      {{ coin.pay_method }}
    </div>
    <div class="col-1 align-self-center d-flex justify-content-center">
      1 : {{ coin.value }}
    </div>
    <div class="col-1 align-self-center d-flex justify-content-center">
      {{ coin.total }}E
    </div>
    <div class="col-1 align-self-center d-flex justify-content-center">
      {{ coin.server_name }}
    </div>
    <div class="col-2 align-self-center d-flex justify-content-center">
      {{ coin.create_date.slice(0, 10) }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { productMixin } from '@/mixins'
export default defineComponent({
  mixins: [productMixin],
  props: {
    coin: {
      required: true,
    },
    productDetail: {
      required: false,
    },
    isDetailItems: {
      default: false,
    },
    index: {
      required: true,
    },
  },
  data() {
    return {
      isFavorite: false,
    }
  },
})
</script>
