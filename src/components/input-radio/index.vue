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
    />
    <label :for="id" :class="labelClass" :style="inputStyle" @click="test">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
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
  ref: {
    input: HTMLInputElement,
  },
})
export default class FunctionBtn extends Vue {}
</script>

<style scoped lang="scss">
.radio-btn {
  display: none;
}
</style>
