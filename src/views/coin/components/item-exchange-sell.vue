<template>
  <!-- sell btn row start -->
  <div class="sell-btn-row d-flex align-items-center justify-content-end px-5">
    <button class="btn btn-primary" @click="showModal">我要賣幣</button>
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
          <div
            v-for="item in sellList"
            :key="item.product_id"
            class="product-row"
          >
            <sell-item-card :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 大類 end -->
  <!-- table row end -->
  <coin-sell-modal ref="coinSellModal" @reload="fetchSellProduct" />
</template>

<script>
import { defineComponent } from 'vue'

import SellItemCard from './sell-item-card.vue'
import CoinSellModal from './coin-sell-modal.vue'
import { apiGetUserSellProduct } from '@/services/api'

export default defineComponent({
  name: 'ItemExchangeSell',
  components: {
    SellItemCard,
    CoinSellModal,
  },
  data() {
    return {
      sellList: [],
    }
  },
  async mounted() {
    await this.fetchSellProduct()
  },
  methods: {
    async fetchSellProduct() {
      let loader = this.$loading.show()
      try {
        const {
          data: { result },
        } = await apiGetUserSellProduct()
        this.sellList = result
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },
    showModal() {
      console.log(this.$refs['coinSellModal'])
      this.$refs['coinSellModal'].show()
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
