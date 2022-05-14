<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { AppNav } from "@/components"
import { DefaultLayout, LoginLayout } from "@/layout"
export default defineComponent({
  name: "App",
  components: {
    AppNav,
    DefaultLayout,
    LoginLayout,
  },
  // setup(props) {
  //   const computedPractice = computed(() => {
  //     return "test";
  //   });
  // },
  computed: {
    layout() {
      return this.$route.meta.layout || "DefaultLayout"
    },
  },
})
</script>

<style lang="scss">
#app {
}
</style>
