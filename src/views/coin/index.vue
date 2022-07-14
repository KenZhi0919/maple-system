<template>
  <div class="container-lg">
    <search-panel
      v-if="functional === 'buy'"
      ref="searchPanel"
      :search-condition="searchCondition"
      @search="search"
    />

    <div class="trading-cart">
      <!-- title row start -->
      <div class="cart-title-row d-flex align-items-center">
        <span class="cart-title ms-4 me-3">楓幣交易</span>
        <i class="bi bi-cash fs-2" />
      </div>
      <!-- title row end -->

      <!-- functional row start -->
      <div class="functional-row d-flex align-items-center">
        <input-radio
          v-model="functional"
          id="buy"
          name="functionalBtn"
          value="buy"
          label="購買"
          label-class="functional-btn btn d-flex align-items-center justify-content-center ms-3"
          is-checked
        />
        <input-radio
          v-model="functional"
          id="sell"
          name="functionalBtn"
          value="sell"
          label="販售"
          label-class="functional-btn btn d-flex align-items-center justify-content-center ms-3"
        />
      </div>
      <!-- function row end -->

      <coin-buy v-if="functional === 'buy'" ref="coinBuy" />

      <item-exchange-sell v-else />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { InputRadio } from '@/components'
import { SearchPanel, CoinBuy, ItemExchangeSell } from './components'

export default defineComponent({
  name: 'Coin',
  components: {
    InputRadio,
    SearchPanel,
    CoinBuy,
    ItemExchangeSell,
  },
  setup() {
    const state = reactive({
      functional: 'buy',
    })
    return { ...toRefs(state) }
  },
  async mounted() {
    await this.search()
  },
  data() {
    return {
      searchCondition: {
        title: '',
        total: '',
        value: '',
        server_name: '',
      },
    }
  },

  methods: {
    search(searchCondition) {
      this.$refs['coinBuy'].search(searchCondition)
    },
  },
})
</script>
