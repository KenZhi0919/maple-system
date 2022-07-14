<template>
  <!-- table row start -->
  <div class="table-row d-flex">
    <!-- 商品列 -->
    <div class="col-12">
      <div class="items-box d-flex flex-column align-items-center">
        <!-- title row start -->
        <div class="col-12 d-flex title-row">
          <div class="col-4 d-flex justify-content-center">
            <span>標題</span>
          </div>
          <div class="col-3 d-flex justify-content-center">
            <span>支付方式</span>
          </div>
          <div class="col-1 d-flex justify-content-center">
            <span>幣值</span>
          </div>
          <div class="col-1 d-flex justify-content-center">
            <span>總額</span>
          </div>
          <div class="col-1 d-flex justify-content-center">
            <span>伺服器</span>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <span>上架日期</span>
          </div>
        </div>
        <!-- title row end -->

        <div class="product-box d-flex flex-column align-items-center">
          <template v-if="!showDetailCoins">
            <template v-if="coinList.length > 0">
              <div
                v-for="(coin, index) in coinList"
                :key="coin.id"
                class="product-row"
              >
                <item-card
                  :coin="coin"
                  :index="index"
                  @click="showModal(coin)"
                />
              </div>
            </template>
            <div v-else>沒有道具</div>
          </template>

          <template v-else>
            <div
              v-for="productDetail in coinDetailList"
              :key="productDetail.product_id"
              class="product-row"
            >
              <item-card
                :product="productDetail.product_list_data"
                :product-detail="productDetail"
                :is-detail-items="true"
                @click="showModal(productDetail)"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <!-- 大類 end -->
  <!-- table row end -->
  <contact-modal ref="contactModal" />
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import ItemCard from './item-card.vue'
import ContactModal from './contact-modal.vue'
import { apiGetCoin, apiPostCoin, apiGetProductDetail } from '@/services/api'

export default defineComponent({
  name: 'CoinBuy',
  components: {
    ItemCard,
    ContactModal,
  },
  setup() {
    const state = reactive({
      functional: 'buy',
      coinList: [],
      coinDetailList: [],
      showDetailCoins: false,
    })
    return { ...toRefs(state) }
  },
  async mounted() {
    await this.search()
  },
  data() {
    return {
      searchCondition: {
        title: undefined,
        total: undefined,
        value: undefined,
        server_name: undefined,
      },
    }
  },
  methods: {
    async test() {
      try {
        await apiPostCoin({
          title: 'test',
          value: '70',
          total: '50',
          pay_method: 'line',
          contact_method: 'line',
          server_name: 'vindia',
          test: [{ test: 'test', id: '1' }],
        })
      } catch (err) {
        console.error(err)
      }
    },
    async fetchCoin() {
      let loader = this.$loading.show()
      try {
        const {
          data: { result },
        } = await apiGetCoin(this.searchCondition)
        this.coinList = result
      } catch (err) {
        console.error(err)
      } finally {
        loader.hide()
      }
    },
    async fetchCoinDetail(productId) {
      let loader = this.$loading.show()
      try {
        const {
          data: { result },
        } = await apiGetProductDetail({ product_list_id: productId })
        this.coinDetailList = result
      } catch (err) {
        console.error(err)
      } finally {
        loader.hide()
      }
    },
    search(searchCondition) {
      this.showDetailCoins = false
      console.log(searchCondition)
      if (searchCondition) {
        this.searchCondition = searchCondition
      }
      this.fetchCoin()
    },
    async productClickHandler(id) {
      await this.fetchCoinDetail(id)
      this.showDetailCoins = true
    },
    showModal(contactDetail) {
      console.log(123)
      this.$refs['contactModal'].show(contactDetail)
    },
  },
})
</script>
