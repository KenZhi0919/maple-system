<template>
  <div class="login-page">
    <slot />
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue"

export default defineComponent({})
</script>

<style lang="scss" scoped>
.login-page {
  background-image: linear-gradient(161deg, #fad961 0%, #fc8b51 72%);
  height: 100vh;
}
</style>
