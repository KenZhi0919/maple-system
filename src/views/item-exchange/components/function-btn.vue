<template>
  <div
    class="function-btn d-flex align-items-center justify-content-center ms-2"
  >
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class FunctionBtn extends Vue {}
</script>

<style scoped lang="scss">
.function-btn {
  background-color: #444f61;
  color: white;
  width: 120px;
  height: 25px;
  border-radius: 5px;
  font-size: 0.9rem;
  &:target {
    background-color: red;
  }
}
</style>
