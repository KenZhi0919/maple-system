<template>
  <multiselect
    v-model="selected"
    placeholder="請選擇"
    :options="options"
    :close-on-select="closeOnSelect"
    :searchable="true"
    :mode="multiple ? 'tag' : 'single'"
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
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selected: [] as string[],
    };
  },
  methods: {},
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
