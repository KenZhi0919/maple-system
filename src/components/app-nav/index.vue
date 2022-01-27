<template>
  <nav class="navbar">
    <!-- Navbar content -->
    <div class="d-flex align-items-center">
      <router-link to="/" class="navbar-brand mx-4">
        <img class="logo" src="@/assets/images/logo.png" />
      </router-link>
      <div class="">
        <router-link
          to="/itemexchange"
          class="btn btn-outline-secondary nav-btn mx-1"
        >
          交易所
        </router-link>
        <router-link to="/bid" class="btn btn-outline-secondary nav-btn mx-1">
          競標
        </router-link>
        <router-link
          to="/sellaccount"
          class="btn btn-outline-secondary nav-btn mx-1"
        >
          賣帳號
        </router-link>
        <router-link to="/guild" class="btn btn-outline-secondary nav-btn mx-1">
          找公會
        </router-link>
        <router-link
          to="/partner"
          class="btn btn-outline-secondary nav-btn mx-1"
        >
          找戰友
        </router-link>
        <router-link to="/wish" class="btn btn-outline-secondary nav-btn mx-1">
          許願池
        </router-link>
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
export default class extends Vue {
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
