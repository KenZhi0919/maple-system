<template>
  <div class="d-flex justify-content-center align-content-center">
    <input
      ref="input"
      type="radio"
      class="radio-btn"
      :checked="isChecked"
      :name="name"
      :id="id"
      :value="modelValue"
      :class="inputClass"
      :style="inputStyle"
      @input="$emit('update:modelValue', this.value)"
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
import { defineComponent } from "vue"

export default defineComponent({
  name: "InputRadio",
  props: {
    id: String,
    name: String,
    value: String,
    modelValue: String,
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
    return {}
  },
  methods: {
    clickHandler() {
      ;(this.$refs.input as HTMLInputElement).click()
    },
  },
})
</script>

<style scoped lang="scss">
.radio-btn {
  display: none;
}
</style>
