<template>
  <div class="search-pannel">
    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          職業
        </div>
        <div class="col-9 align-self-center"><input-select /></div>
      </div>

      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          階級
        </div>
        <div class="col-9 align-self-center"><input-select /></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          星力
        </div>
        <div class="col-9 align-self-center"><input-text /></div>
      </div>
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          紋章屬性
        </div>
        <div class="col-9 align-self-center"><input-text /></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          最高等級
        </div>
        <div class="col-9 align-self-center"><input-text /></div>
      </div>
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          價格
        </div>
        <div class="col-9 align-self-center"><input-text /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { InputSelect, InputText } from "@/components";
export default defineComponent({
  name: "SearchPannel",
  components: { InputSelect, InputText },
  props: {},
  setup() {
    //
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    //
  },
});
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
}
.search-pannel {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 40px;
  padding: 20px 0;
  background-color: white;
  box-shadow: 0 0 35px #dfdede;
}
</style>
