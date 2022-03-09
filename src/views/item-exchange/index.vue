<template>
  <div class="container-lg">
    <search-pannel
      v-if="functional === 'buy'"
      ref="searchPannel"
      :search-condition="searchCondition"
      @search="search"
    />
    <div class="trading-cart">
      <!-- title row start -->
      <div class="cart-title-row d-flex align-items-center">
        <span class="cart-title ms-4 me-3">交易所</span>
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

      <item-exchange-buy v-if="functional === 'buy'" ref="itemExchangeBuy" />

      <item-exchange-sell v-else ref="itemExchangeBuy" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { InputRadio } from "@/components";
import { SearchPannel, ItemExchangeBuy, ItemExchangeSell } from "./components";
import { ProductListSearchCondition } from "@/@types/models";

export default defineComponent({
  name: "ItemExchange",
  components: {
    InputRadio,
    SearchPannel,
    ItemExchangeBuy,
    ItemExchangeSell,
  },
  setup() {
    const state = reactive({
      functional: "buy",
    });
    return { ...toRefs(state) };
  },
  async mounted() {
    await this.search();
  },
  data() {
    return {
      searchCondition: {
        category: "武器",
        type: "長槍",
        stage_level: undefined,
        star: undefined,
        is_maple: undefined,
        maple_capability: undefined,
        total_level: undefined,
        min_price: undefined,
        max_price: undefined,
        ordering: undefined,
      } as ProductListSearchCondition,
    };
  },

  methods: {
    search(searchCondition?: ProductListSearchCondition) {
      (this.$refs["itemExchangeBuy"] as typeof ItemExchangeBuy).search(
        searchCondition
      );
    },
  },
});
</script>
