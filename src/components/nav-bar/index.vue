<template>
  <nav class="navbar">
    <!-- Navbar content -->
    <div class="d-flex align-items-center">
      <a class="navbar-brand mx-4" @click.prevent>
        <img class="logo" src="@/assets/images/logo.png" />
      </a>
      <div class="">
        <button type="button" class="btn btn-outline-secondary nav-btn mx-1">
          交易所
        </button>
        <button type="button" class="btn btn-outline-secondary nav-btn mx-1">
          競標
        </button>
        <button type="button" class="btn btn-outline-secondary nav-btn mx-1">
          賣帳號
        </button>
        <button type="button" class="btn btn-outline-secondary nav-btn mx-1">
          找公會
        </button>
        <button type="button" class="btn btn-outline-secondary nav-btn mx-1">
          找戰友
        </button>
        <button type="button" class="btn btn-outline-secondary nav-btn mx-1">
          許願池
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class NavBar extends Vue {
  msg!: string;
}
</script>

<style scoped lang="scss">
.logo {
  width: 35px;
  height: 35px;
}
.nav-btn {
  border: 0px;
  &:focus {
    box-shadow: 0 0 0 0rem;
  }
}
.navbar {
  height: 60px;
  background-color: #fcfcfc;
}
</style>
