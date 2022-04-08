<template>
  <app-nav />
  <div class="content" style="margin-top: 60px">
    <slot />
    <notifications position="bottom right" width="150px" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppNav } from "@/components";
export default defineComponent({
  components: {
    AppNav,
  },
  // setup() {},
});
</script>
