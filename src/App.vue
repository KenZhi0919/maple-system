<template>
  <component :is="layout">
    <router-view />
    <notifications position="bottom right" width="150px" />
  </component>
</template>

<script lang="js">
import { defineComponent } from "vue"
import { AppNav } from "@/components"
import { DefaultLayout, LoginLayout } from "@/layout"
import GAuth from "vue3-google-oauth2"
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
.notification-content {
  font-size: 16px;
}
</style>
