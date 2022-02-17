<template>
  <div class="item-card d-flex mb-2">
    <div class="col-6">
      <div class="w-100 h-100">
        <div class="item-img-box d-flex align-items-center px-2">
          <div class="item-img me-2">
            <!--  -->
          </div>
          {{ product.name }}
        </div>
      </div>
    </div>
    <!-- 星力 start -->
    <div class="col-1 align-self-center d-flex justify-content-center">
      <span v-if="isDetailItems">0</span>
    </div>
    <!-- 星力 end -->
    <div class="col-3 d-flex justify-content-center align-self-center">
      <div class="d-flex justify-content-center w-100">
        <div class="align-self-center me-2">
          <i class="bi bi-coin" />
        </div>
        <div>{{ product.min_price }} ~<br />{{ product.max_price }}</div>
      </div>
    </div>

    <div class="col-2 align-self-center d-flex justify-content-center">
      {{ product.count }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // setup() {},
  props: {
    product: {
      required: true,
    },
    isDetailItems: {
      default: false,
    },
  },
});
</script>
