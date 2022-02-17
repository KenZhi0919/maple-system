<template>
  <div class="container-lg">
    <search-pannel />
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

      <!-- table row start -->
      <div class="table-row d-flex">
        <!-- category start -->
        <div class="col-4 h-100 category-box d-flex py-3">
          <div class="col-6 d-flex flex-column">
            <input-radio
              v-model="category"
              v-for="(option, index) in categoryOptions"
              :key="option"
              :id="option"
              :value="option"
              :label="option"
              name="categoryBtn"
              label-class="category-btn btn d-flex align-items-center"
              :is-checked="index === 0"
              @change="categoryChangeHandler"
            />
          </div>
          <!-- category end -->

          <!-- type options start -->
          <div class="col-6">
            <div class="detail-box py-1">
              <input-radio
                v-model="type"
                v-for="(option, index) in typeOptions"
                :key="option"
                :id="option"
                :value="option"
                :label="option"
                name="typeBtn"
                label-class="detail-btn btn d-flex align-items-center"
                :is-checked="index === 0"
                @change="typeChangeHandler"
              />
            </div>
          </div>
        </div>
        <!-- type options end -->

        <!-- 商品列 -->
        <div class="col-8">
          <div class="items-box d-flex flex-column align-items-center">
            <!-- title row start -->
            <div class="col-12 d-flex title-row">
              <div class="col-6">
                <!--  -->
              </div>
              <div class="col-1 d-flex justify-content-center">
                <span v-if="showDetailItems">星力</span>
              </div>
              <div class="col-3 d-flex justify-content-center">登錄價格</div>
              <div class="col-2 d-flex justify-content-center">登錄數量</div>
            </div>
            <!-- title row end -->

            <template v-if="!showDetailItems">
              <div
                v-for="product in productList"
                :key="product.product_list_id"
                style="width: 98%"
              >
                <item-card :product="product" />
              </div>
            </template>

            <template v-else>
              <div
                v-for="product in productList"
                :key="product.product_list_id"
                class="w-100"
              >
                <item-card :product="product" is-detail-items />
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 大類 end -->
      <!-- table row end -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { InputRadio } from "@/components";
import { SearchPannel, ItemCard } from "./components";
import { ProductListMultiItem } from "@/@types/models";
import { apiExchange } from "@/services/api";
import { typeOptions, categoryOptions } from "./data";

import _ from "lodash";
export default defineComponent({
  name: "ItemExchange",
  components: {
    InputRadio,
    SearchPannel,
    ItemCard,
  },
  setup() {
    const state = reactive({
      functional: "buy",
      category: "武器" as string,
      type: "" as string,
      allProducts: [] as ProductListMultiItem[],
      categoryOptions: categoryOptions as string[],
      typeOptions: typeOptions as string[],
      productList: [] as ProductListMultiItem[],
      showDetailItems: false as boolean,
    });
    return { ...toRefs(state) };
  },
  mounted() {
    this.fetchallProducts();
    this.getTypeOptions();
    this.getProductList();
  },
  data() {
    return {};
  },
  methods: {
    getTypeOptions() {
      this.type = this.typeOptions[0];
      this.getProductList();
    },
    getProductList() {
      this.productList = this.allProducts.filter(el => el.type === this.type);
    },
    fetchallProducts() {
      // apiExchange();
      this.allProducts = [
        {
          product_list_id: 13,
          category: "武器",
          type: "雙手劍",
          name: "普錫杰勒雙手劍",
          stage_level: "普通",
          image: null,
          count: 1,
          min_price: 222046,
          max_price: 222046,
        },
        {
          product_list_id: 14,
          category: "武器",
          type: "雙手劍",
          name: "傑伊西恩雙手劍",
          stage_level: "普通",
          image: null,
          count: 2,
          min_price: 10000,
          max_price: 199899,
        },
        {
          product_list_id: 16,
          category: "武器",
          type: "單手劍",
          name: "傑伊西恩單手劍",
          stage_level: "普通",
          image: null,
          count: 1,
          min_price: 199899,
          max_price: 199899,
        },
        {
          product_list_id: 15,
          category: "防具",
          type: "上衣",
          name: "經驗上衣",
          stage_level: "普通",
          image: null,
          count: 1,
          min_price: 87,
          max_price: 199899,
        },
      ];
    },
    categoryChangeHandler() {
      this.getTypeOptions();
    },
    typeChangeHandler() {
      this.getProductList();
    },
  },
});
</script>
