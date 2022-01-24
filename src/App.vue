<template>
  <nav-bar />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { NavBar } from "@/components"; // @ is an alias to /src

@Options({
  components: {
    NavBar,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700&display=swap");
#app {
  font-family: "Noto Sans TC", sans-serif;
  text-align: center;
  color: #242526;
  background-color: #f4f5f6;
}
</style>
