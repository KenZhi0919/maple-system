<template>
  <div style="margin-top: -6px; height: 38px">
    <div class="">
      <span v-for="(star, index) in starListRow1" :key="index">
        <i
          class="bi bi-star-fill"
          :style="{
            'font-size': '10px',
            color: star.selected ? '#F7C448' : '#303943',
            'margin-right': (index + 1) % 5 === 0 ? '4px' : '',
          }"
        />
      </span>
    </div>
    <div style="margin-top: -10px">
      <span v-for="(star, index) in starListRow2" :key="index">
        <i
          class="bi bi-star-fill"
          :style="{
            'font-size': '10px',
            color: star.selected ? '#F7C448' : '#303943',
            'margin-right': (index + 1) % 5 === 0 ? '4px' : '',
          }"
        />
      </span>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue"

export default defineComponent({
  components: {},
  props: {
    star: {
      required: false,
      type: Number,
    },
  },
  mounted() {
    this.setDefault()

    if (this.star) {
      this.setStar(this.star)
    }
  },
  data() {
    return {
      starListRow1: [{ selected: false }],
      starListRow2: [{ selected: false }],
    }
  },
  methods: {
    setDefault() {
      this.starListRow1 = [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
      ]
      this.starListRow2 = [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
      ]
    },
    setStar(star) {
      this.setDefault()
      if (star > 20) {
        this.starListRow1.forEach(el => (el.selected = true))
        this.starListRow2.forEach((el, index) => {
          if (index + 1 <= star - 20) {
            el.selected = true
          }
        })
      } else {
        this.starListRow1.forEach((el, index) => {
          if (index + 1 <= star) {
            el.selected = true
          }
        })
      }
    },
  },
})
</script>
