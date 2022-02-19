<template>
  <div class="container-lg">
    <search-pannel
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

      <!-- table row start -->
      <div class="table-row d-flex">
        <!-- category start -->
        <div class="col-4 h-100 category-box d-flex py-3">
          <div class="col-6 d-flex flex-column">
            <input-radio
              v-model="searchCondition.category"
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
                v-model="searchCondition.type"
                v-for="(option, index) in currentTypeOptions"
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
                <button
                  v-if="showDetailItems"
                  class="btn previous-page-btn"
                  @click="showDetailItems = false"
                >
                  <i class="bi bi-caret-left-fill" />
                </button>
              </div>
              <div class="col-1 d-flex justify-content-center">
                <span v-if="showDetailItems">星力</span>
              </div>
              <div class="col-3 d-flex justify-content-center">登錄價格</div>
              <div class="col-2 d-flex justify-content-center">
                <span v-if="!showDetailItems">登錄數量</span>
                <span v-else>收藏</span>
              </div>
            </div>
            <!-- title row end -->

            <div
              class="product-box w-100 d-flex flex-column align-items-center"
            >
              <template v-if="!showDetailItems">
                <div
                  v-for="product in productList"
                  :key="product.product_list_id"
                  class="product-row"
                >
                  <item-card
                    :product="product"
                    @click="productClickHandler(product.product_list_id)"
                  />
                </div>
              </template>
              <template v-else>
                <div
                  v-for="product in productDetailList"
                  :key="product.product_id"
                  class="product-row"
                >
                  <item-card
                    :product="product.product_list_data"
                    :product-detail="product"
                    :is-detail-items="true"
                  />
                </div>
              </template>
            </div>
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
import {
  ProductListMultiItem,
  typeOption,
  ProductDetailItem,
  ProductListSearchCondition,
} from "@/@types/models";
import { apiGetProductList, apiGetProductDetail } from "@/services/api";
import { typeOptions, categoryOptions } from "./data";

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
      categoryOptions: categoryOptions as string[],
      allTypeOptions: typeOptions as typeOption[],
      productList: [] as ProductListMultiItem[],
      productDetailList: [] as ProductDetailItem[],
      showDetailItems: false as boolean,
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
  computed: {
    currentTypeOptions(): typeOption["type"] {
      return (
        this.allTypeOptions.find(
          el => el.category === this.searchCondition.category
        )?.type || []
      );
    },
  },
  methods: {
    async fetchProducts() {
      let loader = this.$loading.show();
      try {
        const {
          data: { result },
        } = await apiGetProductList(this.searchCondition);
        this.productList = result;
      } catch (err) {
        console.error(err);
      } finally {
        loader.hide();
      }
    },
    async fetchProductDetail(productId: string) {
      let loader = this.$loading.show();
      try {
        const {
          data: { result },
        } = await apiGetProductDetail({ product_list_id: productId });
        this.productDetailList = result;
      } catch (err) {
        console.error(err);
      } finally {
        loader.hide();
      }
    },
    search(searchCondition?: ProductListSearchCondition) {
      if (searchCondition) {
        this.searchCondition = {
          ...searchCondition,
          is_maple: searchCondition.is_maple === 1 ? true : false,
          type: this.searchCondition.type,
          category: this.searchCondition.category,
        };
      }
      this.fetchProducts();
    },
    categoryChangeHandler() {
      this.searchCondition.type = this.currentTypeOptions[0];
      this.showDetailItems = false;
      this.fetchProducts();
    },
    typeChangeHandler() {
      this.showDetailItems = false;
      this.fetchProducts();
    },
    async productClickHandler(id: string) {
      await this.fetchProductDetail(id);
      this.showDetailItems = true;
    },
  },
});
</script>
