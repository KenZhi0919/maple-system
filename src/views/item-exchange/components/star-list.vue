<template>
  <div class="">
    <div
      v-for="(star, index) in starList"
      :key="index"
      :style="`display:${index === 19 ? 'inline' : 'inline-block'};`"
    >
      <i
        class="bi bi-star-fill"
        :style="{
          'font-size': '10px',
          color: star.selected ? 'rgb(255, 208, 0)' : '#3B3F49',
          'margin-right': (index + 1) % 5 === 0 ? '4px' : '',
        }"
      />
      <br v-if="index === 19" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    star: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      starList: [
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
      ],
    };
  },
  methods: {
    setStar() {
      const group = Math.floor(this.star / 5);
    },
  },
});
</script>
