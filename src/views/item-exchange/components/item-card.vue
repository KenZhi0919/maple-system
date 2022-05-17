<template>
  <div class="item-card d-flex mb-2">
    <div class="col-6">
      <div class="w-100 h-100">
        <div class="item-img-box d-flex align-items-center px-2">
          <div class="item-img me-2" :class="`stage-${product.stage_level}`">
            <img :src="product.image" />
          </div>
          {{ product.name }}
        </div>
      </div>
    </div>

    <div class="col-3 d-flex justify-content-center align-self-center">
      <!-- 星力 start -->
      <span v-if="isDetailItems">
        <span v-if="productDetail">{{ productDetail.star }}</span>
      </span>
      <!-- 星力 end -->

      <div v-if="!productDetail" class="d-flex justify-content-center w-100">
        <div class="align-self-center me-2">
          <img
            src="@/assets/images/coin.png"
            style="width: 20px; height: 20px"
          />
        </div>
        <div class="align-self-center">
          <span v-if="!isDetailItems">
            {{ formatPrice(product.min_price) }} ~<br />{{
              formatPrice(product.max_price)
            }}
          </span>
        </div>
      </div>
    </div>

    <div class="col-3 align-self-center d-flex justify-content-center">
      <span v-if="!isDetailItems">
        {{ product.count }}
      </span>
      <div v-else-if="productDetail" class="align-self-center me-2">
        <img src="@/assets/images/coin.png" style="width: 20px; height: 20px" />
        <span> {{ formatPrice(productDetail.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue"
import { productMixin } from "@/mixins"
export default defineComponent({
  mixins: [productMixin],
  props: {
    product: {
      required: true,
    },
    productDetail: {
      required: false,
    },
    isDetailItems: {
      default: false,
    },
  },
  data() {
    return {
      isFavorite: false,
    }
  },
})
</script>
