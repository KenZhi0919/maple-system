<template>
  <multiselect
    v-model="selected"
    :options="options"
    placeholder="請選擇"
    :searchable="true"
    @input="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "InputText",
  components: {
    Multiselect,
  },
  props: {
    options: {
      required: true,
    },
  },

  data() {
    return {
      selected: "" as string,
    };
  },
  methods: {},
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
