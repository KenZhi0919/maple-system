<template>
  <select class="form-select" id="validationCustom04" required>
    <option selected disabled value="">Choose...</option>
    <option>...</option>
  </select>
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
.form-select {
  max-width: 300px;
}
</style>
