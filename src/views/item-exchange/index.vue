<template>
  <div class="container-lg">
    <div class="trading-cart">
      <!-- title row start -->
      <div class="cart-title-row d-flex align-items-center">
        <span class="cart-title ms-4 me-3">交易所</span>
        <i class="bi bi-cash fs-2" />
      </div>
      <!-- title row end -->

      <!-- function row start -->
      <div class="function-row d-flex align-items-center">
        <function-btn msg="購買" />
        <function-btn msg="販售" />
      </div>
      <!-- function row end -->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FunctionBtn from "./components/function-btn.vue";
@Options({
  props: {
    msg: String,
  },
  components: {
    FunctionBtn,
  },
})
export default class NavBar extends Vue {
  msg!: string;
}
</script>

<style scoped lang="scss">
.trading-cart {
  width: 100%;
  height: 80vh;
  min-height: 600px;
  background-color: #f0f0f0;
  border-radius: 10px;
  .cart-title-row {
    width: 100%;
    height: 60px;
    background-color: #445060;
    border-radius: 10px 10px 0 0;
    i {
      color: white;
    }
    .cart-title {
      color: white;
      font-size: 24px;
    }
  }

  .function-row {
    width: 100%;
    height: 40px;
    background-color: #fffefe;
  }
}
</style>
