<template>
  <div class="exchange-search-pannel">
    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          階級
        </div>
        <div class="col-9 align-self-center">
          <input-select multiple :options="stageLevelOptions" />
        </div>
      </div>

      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          星力
        </div>
        <div class="col-9 align-self-center">
          <input-text v-model="star" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          楓底
        </div>
        <div class="col-9 align-self-center">
          <input-select v-model="isMaple" :options="isMapleOptions" />
        </div>
      </div>
      <div class="col-6 d-flex">
        <div class="col-3 d-flex justify-content-end align-self-center pe-3">
          紋章屬性
        </div>
        <div class="col-9 align-self-center">
          <input-select
            v-model="mapleCapability"
            :options="mapleCapabilityOptions"
          />
        </div>
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
        <div class="col-9 d-flex align-items-center">
          <div class="col-3 align-self-center"><input-text /></div>
          <div class="col-1 mx-2 d-flex justify-content-center">~</div>
          <div class="col-3 align-self-center"><input-text /></div>
        </div>
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
    return {
      star: "",
      isMaple: null,
      mapleCapability: "",
      stageLevel: "",
      stageLevelOptions: [
        { label: "普通", value: "1" },
        { label: "稀有", value: "2" },
        { label: "史詩", value: "3" },
        { label: "罕見", value: "4" },
        { label: "傳說", value: "5" },
        { label: "神話", value: "6" },
        { label: "古代", value: "7" },
        { label: "死靈", value: "8" },
      ],
      isMapleOptions: [
        { label: "無", value: 0 },
        { label: "包含", value: 1 },
      ],
      mapleCapabilityOptions: [
        "致命傷害",
        "Boss 傷害",
        "Boss 防禦",
        "物攻",
        "魔攻",
      ],
    };
  },
  methods: {},
  computed: {
    //
  },
});
</script>
