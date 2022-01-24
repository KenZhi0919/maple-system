<template>
  <div class="home">test</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Home extends Vue {}
</script>
<style scoped>
.home {
  min-height: calc(100%-60px);
}
</style>
