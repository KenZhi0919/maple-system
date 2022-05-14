<template>
  <input
    ref="input"
    class="form-control"
    placeholder="請輸入"
    :type="type"
    :class="inputClass"
    :style="inputStyle"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "InputText",
  props: {
    modelValue: String,
    inputClass: String,
    inputStyle: Object || String,
    labelClass: String,
    labelStyle: Object || String,
    type: String,
  },
  setup() {
    //
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    //
  },
})
</script>
<style lang="scss" scoped>
::placeholder {
  color: #9ca3af;
}
</style>
