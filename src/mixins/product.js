import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    formatPrice(number) {
      const parts = number.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    setPotentialColor(level) {
      switch (level) {
        case '普通':
          return 1
        case '稀有':
          return 2
        case '史詩':
          return 3
        case '罕見':
          return 4
        case '傳說':
          return 5
        case '神話':
          return 6
        case '古代':
          return 7
        default:
          return ''
      }
    },
    sparkLevelColor(sparkLevel) {
      switch (sparkLevel) {
        case '稀有':
          return 'blue-text'
        case '罕見':
          return 'orange-text'
        case '傳說':
          return 'green-text'
        case '神話':
          return 'red-text'
        default:
          return ''
      }
    },
  },
})
