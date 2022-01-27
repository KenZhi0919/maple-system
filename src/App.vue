<template>
  <app-nav />

  <div class="content">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AppNav } from "@/components"; // @ is an alias to /src

@Options({
  components: {
    AppNav,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700&display=swap");
#app {
  font-family: "Noto Sans TC", sans-serif;
  color: #242526;
  background-color: #f4f5f6;
  p {
    margin: 0;
  }
}

.content {
  min-height: calc(100vh - 60px);
  padding-top: 50px;
  padding-bottom: 20px;
}
</style>
