<template>
  <input
    ref="input"
    type="text"
    class="form-control"
    :class="inputClass"
    :style="inputStyle"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputText",
  props: {
    value: String,
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
