<template>
  <div class="TextInput" :class="{ 'has-error': !!errorMessage }">
    <input
      ref="input"
      class="form-control"
      :class="[!!errorMessage ? 'has-error' : '', inputClass]"
      :placeholder="placeholder"
      :type="type"
      :value="inputValue"
      :style="inputStyle"
      @input="handlerInputChange"
      @blur="handleBlur"
    />
    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage }}
    </p>
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
    placeholder: String,
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // use `toRef` to create reactive references to `name` prop which is passed to `useField`
    // this is important because vee-validte needs to know if the field name changes
    // https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
    const name = toRef(props, 'name')

    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
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
  },
  methods: {
    handlerInputChange(e) {
      this.handleChange(e)
      this.$emit('update:modelValue', e.target.value)
    },
  },
})
</script>

<style lang="scss" scoped>
::placeholder {
  color: #9ca3af;
}

.help-message {
  color: #f23648;
  font-size: 14px;
}
</style>
