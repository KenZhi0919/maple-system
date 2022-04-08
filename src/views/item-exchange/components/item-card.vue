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
    <!-- 星力 start -->
    <!-- <div class="col-1 align-self-center d-flex justify-content-center">
      <span v-if="isDetailItems">
        <span v-if="productDetail">{{ productDetail.star }}</span>
      </span>
    </div> -->
    <!-- 星力 end -->
    <div class="col-4 d-flex justify-content-center align-self-center">
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

          <span v-else-if="productDetail">
            {{ formatPrice(productDetail.price) }}</span
          >
        </div>
      </div>
    </div>

    <div class="col-2 align-self-center d-flex justify-content-center">
      <span v-if="!isDetailItems">
        {{ product.count }}
      </span>
      <div v-else-if="productDetail" class="align-self-center me-2">
        <img src="@/assets/images/coin.png" style="width: 20px; height: 20px" />
      </div>
      <div class="align-self-center">
        <!-- <span> {{ formatPrice(productDetail.price) }}</span> -->
      </div>
      <!-- <i
        v-else
        class="bi bi-heart-fill favorite-btn"
        :class="isFavorite ? 'isFavorite' : ''"
        @click="isFavorite = !isFavorite"
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ProductListMultiItem, ProductDetailItem } from "@/@types/models";
import { productMixin } from "@/mixins";
export default defineComponent({
  mixins: [productMixin],
  props: {
    product: {
      required: true,
      type: Object as () => ProductListMultiItem,
    },
    productDetail: {
      required: false,
      type: Object as () => ProductDetailItem,
    },
    isDetailItems: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isFavorite: false,
    };
  },
});
</script>
