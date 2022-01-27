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
          v-model="test"
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
              id="weapon"
              name="categoryBtn"
              value="weapon"
              label="防具"
              label-class="category-btn btn d-flex align-items-center"
              is-checked
            />
          </div>
          <div class="col-6">
            <div class="detail-box py-1">
              <input-radio
                id="weapon"
                name="categoryBtn"
                value="weapon"
                label="雙手劍"
                label-class="detail-btn btn d-flex align-items-center"
                is-checked
              />
              <input-radio
                id="weapon"
                name="categoryBtn"
                value="weapon"
                label="單手劍"
                label-class="detail-btn btn d-flex align-items-center"
                is-checked
              />
            </div>
          </div>
        </div>
        <div class="col-8">
          <!--  -->
        </div>
      </div>
      <!-- 大類 end -->
      <!-- table row end -->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { InputRadio } from "@/components";
@Options({
  props: {
    // msg: String,
  },
  components: {
    InputRadio,
  },
})
export default class NavBar extends Vue {
  test = "test";
}
</script>

<style scoped lang="scss">
.trading-cart {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  background-color: #f0f0f0;
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
  }
}
</style>
