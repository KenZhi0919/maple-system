<template>
  <app-nav />
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { AppNav } from '@/components'
export default defineComponent({
  components: {
    AppNav,
  },
  // setup() {},
})
</script>
