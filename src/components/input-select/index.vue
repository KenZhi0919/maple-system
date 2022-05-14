<template>
  <multiselect
    v-model="selected"
    :placeholder="placeHolder ? placeHolder : '請選擇'"
    :options="options"
    :track-by="trackBy"
    :label="label"
    :close-on-select="closeOnSelect"
    :searchable="true"
    :mode="multiple ? 'tags' : 'single'"
    :value-prop="valueProp"
    no-options-text="無資料"
    reduce
    @input="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Multiselect from "@vueform/multiselect"

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
    trackBy: {
      type: String,
    },
    label: {
      type: String,
    },
    placeHolder: {
      type: String,
    },
    valueProp: {
      type: String,
    },
  },

  data() {
    return {
      selected: [] as string[],
    }
  },
  methods: {},
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
