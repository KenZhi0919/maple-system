import { defineComponent } from "vue"

export default defineComponent({
  methods: {
    formatPrice(number: number) {
      const parts = number.toString().split(".")
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return parts.join(".")
    },
  },
})
