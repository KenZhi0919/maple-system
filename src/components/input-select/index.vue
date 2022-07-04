<template>
  <div>
    <div v-if="name">
      <multiselect
        v-model="inputValue"
        :placeholder="placeHolder ? placeHolder : '請選擇'"
        :options="options"
        :track-by="trackBy"
        :label="label"
        :close-on-select="closeOnSelect"
        :searchable="true"
        :mode="multiple ? 'tags' : 'single'"
        :class="[name && !!errorMessage ? 'has-error' : '']"
        :valueProp="valueProp"
        no-options-text="無資料"
        reduce
        @input="changeHandler"
      />
      <div v-if="name">
        <p class="help-message" v-show="errorMessage || meta.valid">
          {{ errorMessage }}
        </p>
      </div>
    </div>
    <multiselect
      v-else
      v-model="selected"
      :placeholder="placeHolder ? placeHolder : '請選擇'"
      :options="options"
      :track-by="trackBy"
      :label="label"
      :close-on-select="closeOnSelect"
      :searchable="true"
      :valueProp="valueProp"
      :mode="multiple ? 'tags' : 'single'"
      no-options-text="無資料"
      reduce
      @input="changeHandler"
    />
  </div>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import Multiselect from '@vueform/multiselect'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'InputText',
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
    // 如果用 schema 請填入 v-model 的 value(初始值)
    value: {
      required: false,
    },
    name: {
      type: String,
    },
    valueProp: {
      type: String,
    },
    modelValue: {
      required: true,
    },
  },
  setup(props) {
    if (props.name) {
      const name = toRef(props, 'name')
      const {
        value: inputValue,
        errorMessage,
        handleChange,
        meta,
      } = useField(name, undefined, {
        initialValue: props.value,
      })
      return {
        handleChange,
        errorMessage,
        inputValue,
        meta,
      }
    }
  },
  mounted() {
    this.selected = this.modelValue
  },
  data() {
    return {
      selected: [],
    }
  },
  methods: {
    changeHandler(e) {
      if (this.name) {
        this.handleChange(e)
      }
      this.$emit('update:modelValue', e)
      this.$emit('input')
    },
  },
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
