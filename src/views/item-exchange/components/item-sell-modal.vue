<template>
  <app-modal ref="appModal" size="xl" header-class="d-flex align-items-start">
    <template v-slot:header>
      <div class="modal-title">上架商品</div>
    </template>

    <template v-slot:body>
      <div class="row">
        <div class="col-6">目前等級</div>
        <div class="col-6">總等級</div>
        <div class="col-6">星數</div>
        <div class="col-6">剪刀數</div>
        <div class="col-6">是否楓底</div>
        <div class="col-6">楓底能力</div>
        <div class="col-6">楓底等級</div>
        <div class="col-6">攻擊力</div>
        <div class="col-6">主屬性</div>
      </div>
    </template>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppModal } from "@/components";
import StartList from "./star-list.vue";
// import { ProductDetailItem, product_list_data } from "@/@types/models";

export default defineComponent({
  components: {
    AppModal,
    StartList,
  },
  data() {
    return {};
  },
  methods: {
    show() {
      (this.$refs["appModal"] as typeof AppModal).show();
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-title {
  font-size: 130%;
}
</style>
