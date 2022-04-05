<template>
  <div class="item-card d-flex mb-2">
    <div class="col-7">
      <div class="item-img-box d-flex align-items-center px-2">
        <div class="item-img me-2" :class="`stage-7`">
          <img
            src="https://mapleweb.herokuapp.com/media/product_list_image_default/8_1.jpg"
          />
        </div>
        <div
          class="sell-card-detail d-flex flex-column justify-content-between"
        >
          <div>傑伊希恩之槍</div>
          <div>
            <div class="d-flex w-100">
              <div class="align-self-center me-1">
                <img
                  src="@/assets/images/coin.png"
                  style="width: 20px; height: 20px"
                />
              </div>
              <div class="align-self-center">6666666</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3 d-flex justify-content-center align-self-center">
      <div class="d-flex justify-content-center w-100">
        <div class="align-self-center">
          <span> 2022/03/01 19:43</span>
        </div>
      </div>
    </div>

    <div class="col-2 align-self-center d-flex justify-content-center">
      <span> 販售中 </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {},
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.sell-card-detail {
  height: 100%;
  padding: 8px 0;
}
</style>
