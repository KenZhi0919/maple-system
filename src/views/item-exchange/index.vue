<template>
  <div class="container-lg">
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
          id="buy"
          name="functionalBtn"
          value="buy"
          label="購買"
          label-class="functional-btn btn d-flex align-items-center justify-content-center ms-3"
          is-checked
        />
        <input-radio
          id="sell"
          name="functionalBtn"
          value="sell"
          label="販售"
          label-class="functional-btn btn d-flex align-items-center justify-content-center ms-3"
        />
      </div>
      <!-- function row end -->

      <!-- table row start -->
      <!-- 大類 start -->
      <div class="table-row d-flex">
        <div class="col-4 h-100 category-box d-flex py-3">
          <div class="col-6 d-flex flex-column">
            <input-radio
              id="weapon"
              name="categoryBtn"
              value="weapon"
              label="武器"
              label-class="category-btn btn d-flex align-items-center"
              is-checked
            />
            <input-radio
              id="armor"
              name="categoryBtn"
              value="armor"
              label="防具"
              label-class="category-btn btn d-flex align-items-center"
            />
          </div>

          <div class="col-6">
            <div class="detail-box py-1">
              <input-radio
                id="hands"
                name="detailBtn"
                value="hands"
                label="雙手劍"
                label-class="detail-btn btn d-flex align-items-center"
                is-checked
              />
              <input-radio
                id="hand"
                name="detailBtn"
                value="hand"
                label="單手劍"
                label-class="detail-btn btn d-flex align-items-center"
              />
            </div>
          </div>
        </div>
        <!-- 商品列 -->
        <div class="col-8">
          <div class="items-box d-flex flex-column align-items-center">
            <div class="item-card d-flex mb-2">
              <div class="item-img-box d-flex align-items-center px-2">
                <div class="item-img">
                  <!--  -->
                </div>
              </div>
              <div
                class="item-detail-box d-flex align-items-center w-100 justify-content-lg-between"
              >
                傑伊西恩雙手劍

                <div class="me-5"><i class="bi bi-coin" /> 7,777,777</div>
              </div>
            </div>
            <div class="item-card d-flex">
              <div class="item-img-box d-flex align-items-center px-2">
                <div class="item-img">
                  <!--  -->
                </div>
              </div>
              <div
                class="item-detail-box d-flex align-items-center w-100 justify-content-lg-between"
              >
                普錫杰勒雙手劍
                <div class="me-5"><i class="bi bi-coin" /> 7,777,777</div>
              </div>
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
import { defineComponent } from "vue";
import { InputRadio } from "@/components";
export default defineComponent({
  name: "ItemExchange",
  components: {
    InputRadio,
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.trading-cart {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  background-color: #e2e2e2;
  border-radius: 10px;
  box-shadow: 0 0 15px #8f8f8f;
  .cart-title-row {
    width: 100%;
    height: 60px;
    background-color: #415067;
    border-radius: 10px 10px 0 0;
    i {
      color: white;
    }
    .cart-title {
      color: white;
      font-size: 24px;
    }
  }

  .functional-row {
    width: 100%;
    height: 45px;
    background-color: #fffefe;
  }

  .table-row {
    height: calc(100% - 105px);
    .category-box {
      background-color: #cacaca;
      border-radius: 0 0 0 10px;
    }
    .detail-box {
      width: 90%;
      height: 100%;
      border-radius: 10px;
      background-color: #5f6d78;
    }
    .items-box {
      padding: 15px 10px;
      .item-card {
        width: 98%;
        height: 90px;
        border-radius: 10px;
        background-color: #ffffff;
        transition: background-color 0.15s, color 0.15s;
        &:hover {
          background-color: #727272;
          color: white;
        }
        .item-img-box {
          height: 100%;
          width: 100px;
          .item-img {
            width: 75px;
            height: 75px;
            border-radius: 4px;
            background-color: rgb(211, 211, 211);
          }
        }
      }
    }
  }
}
</style>
