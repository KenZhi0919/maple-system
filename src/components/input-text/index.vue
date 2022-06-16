<template>
  <div class="TextInput" :class="{ 'has-error': name && !!errorMessage }">
    <input
      ref="input"
      class="form-control"
      :class="[name && !!errorMessage ? 'has-error' : '', inputClass]"
      :placeholder="placeholder"
      :type="type"
      :value="name ? inputValue : modelValue"
      :style="inputStyle"
      :disabled="disabled"
      @input="handleInputChange"
      @blur="handleInputBlur"
    />
    <div v-if="name">
      <p class="help-message" v-show="errorMessage || meta.valid">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'InputText',
  props: {
    modelValue: String,
    inputClass: String,
    inputStyle: Object || String,
    labelClass: String,
    labelStyle: Object || String,
    type: String,
    placeholder: {
      type: String,
      default: '請輸入',
    },
    disabled: Boolean,
    name: {
      type: String,
    },
  },
  setup(props) {
    if (props.name) {
      const name = toRef(props, 'name')
      const {
        value: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
        meta,
      } = useField(name, undefined, {
        initialValue: props.modelValue,
      })

      return {
        handleChange,
        handleBlur,
        errorMessage,
        inputValue,
        meta,
      }
    }
  },
  methods: {
    handleInputChange(e) {
      if (this.name) {
        this.handleChange(e)
      }
      this.$emit('update:modelValue', e.target.value)
    },
    handleInputBlur(e) {
      if (this.name) {
        this.handleBlur(e)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
::placeholder {
  color: #9ca3af;
}
</style>
