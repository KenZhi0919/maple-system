<template>
  <input
    ref="input"
    type="text"
    class="form-control"
    :class="inputClass"
    :style="inputStyle"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputText",
  props: {
    modelValue: String,
    inputClass: String,
    inputStyle: Object || String,
    labelClass: String,
    labelStyle: Object || String,
  },
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

<style scoped>
.form-control {
  max-width: 300px;
}
</style>
