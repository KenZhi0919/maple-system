<template>
  <app-modal ref="appModal" header-class="d-flex align-items-start">
    <template v-slot:header>
      <div class="modal-header-row d-flex">
        <div class="item-img-box d-flex align-items-center px-2">
          <div class="item-img me-2" :class="`stage-${product.stage_level}`">
            <img :src="product.image" />
          </div>
        </div>
        <div class="ms-1">
          <span class="modal-title">
            <div class="">
              <start-list />
            </div>
            <div class="">
              {{ product.name }}
            </div>
          </span>
        </div>
      </div>
    </template>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppModal } from "@/components";
import StartList from "./star-list.vue";
import { ProductDetailItem, product_list_data } from "@/@types/models";

export default defineComponent({
  components: {
    AppModal,
    StartList,
  },
  data() {
    return {
      product: {} as product_list_data,
      productDetail: {} as ProductDetailItem,
    };
  },
  methods: {
    show(productDetail: ProductDetailItem) {
      this.productDetail = productDetail;
      this.product = productDetail.product_list_data;
      (this.$refs["appModal"] as typeof AppModal).show();
    },
  },
});
</script>
