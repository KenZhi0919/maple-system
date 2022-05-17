<template>
  <!-- sell btn row start -->
  <div class="sell-btn-row d-flex align-items-center justify-content-end px-5">
    <button class="btn btn-primary" @click="showModal">上架商品</button>
  </div>
  <!-- sell btn row end -->
  <!-- table row start -->
  <div class="table-row d-flex">
    <!-- 商品列 -->
    <div class="col-12">
      <div class="items-box d-flex flex-column align-items-center">
        <!-- title row start -->
        <div class="col-12 d-flex title-row">
          <div class="col-7 d-flex justify-content-center">
            <span>物品情報</span>
          </div>
          <div class="col-3 d-flex justify-content-center">
            登錄價格到期時間
          </div>
          <div class="col-2 d-flex justify-content-center">
            <span>狀態</span>
          </div>
        </div>
        <!-- title row end -->

        <div class="product-box d-flex flex-column align-items-center">
          <div class="product-row">
            <sell-item-card />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 大類 end -->
  <!-- table row end -->
  <item-sell-modal ref="itemSellModal" />
</template>

<script lang="js">
import { defineComponent } from "vue"

import SellItemCard from "./sell-item-card.vue"
import ItemSellModal from "./item-sell-modal.vue"

export default defineComponent({
  name: "ItemExchangeBuy",
  components: {
    SellItemCard,
    ItemSellModal,
  },
  data() {
    return {}
  },
  methods: {
    showModal() {
      ;(this.$refs["itemSellModal"]).show()
    },
  },
})
</script>

<style lang="scss" scoped>
.sell-btn-row {
  width: 100%;
  height: 45px;
  background-color: #e9e9e9ea;
}
</style>
