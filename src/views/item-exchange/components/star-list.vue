<template>
  <div
    v-for="(row, index) in starList.row"
    :key="index"
    class="star-row d-flex align-items-center"
  >
    <div
      v-for="(stargroup, groupIndex) in row"
      :key="groupIndex"
      class="me-1 d-flex"
    >
      <div
        v-for="(star, starIndex) in stargroup"
        :key="starIndex"
        style="margin-right: 2px"
      >
        <i class="bi bi-star-fill" style="font-size: 10px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  data() {
    return {
      starList: {
        row: [
          [
            [
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
            ],
            [
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
            ],
            [
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
            ],
            [
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
            ],
          ],
          [
            [
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
            ],
            [
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
              { selected: false },
            ],
            [{ selected: false }],
          ],
        ],
      },
    };
  },
  methods: {},
});
</script>

<style>
.star-row {
  height: 15px;
}
</style>
