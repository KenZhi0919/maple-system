<template>
  <app-nav />
  <div class="content">
    <slot />
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue"
import { AppNav } from "@/components"
export default defineComponent({
  components: {
    AppNav,
  },
  // setup() {},
})
</script>
