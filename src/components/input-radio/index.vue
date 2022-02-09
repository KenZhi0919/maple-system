<template>
  <div class="d-flex justify-content-center align-content-center">
    <input
      ref="input"
      type="radio"
      class="radio-btn"
      v-model="test"
      :checked="isChecked"
      :name="name"
      :id="id"
      :value="value"
      :class="inputClass"
      :style="inputStyle"
      @input="changeHandler"
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
    return {
      test: "123",
    };
  },
  methods: {
    clickHandler() {
      (this.$refs.input as HTMLInputElement).click();
    },
    changeHandler() {
      console.log(this.test);
      this.$emit("input", this.test);
      // this.$emit("change", value);
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
