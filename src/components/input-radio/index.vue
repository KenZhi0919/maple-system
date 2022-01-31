<template>
  <div class="d-flex justify-content-center align-content-center">
    <input
      ref="input"
      type="radio"
      class="radio-btn"
      :checked="isChecked"
      :name="name"
      :id="id"
      :value="value"
      :class="inputClass"
      :style="inputStyle"
      @change="changeHandler"
    />
    <label
      :for="id"
      :class="labelClass"
      :style="inputStyle"
      @click="clickHandler"
    >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputRadio",
  props: {
    id: String,
    name: String,
    value: String,
    label: String,
    inputClass: String,
    inputStyle: Object || String,
    labelClass: String,
    labelStyle: Object || String,
    isChecked: Boolean,
  },
  setup() {
    //
  },
  data() {
    return {};
  },
  methods: {
    clickHandler() {
      (this.$refs.input as HTMLInputElement).click();
    },
    changeHandler() {
      this.$emit("input", this.value);
      this.$emit("change", this.value);
    },
  },
  computed: {
    //
  },
});
</script>

<style scoped lang="scss">
.radio-btn {
  display: none;
}
</style>
