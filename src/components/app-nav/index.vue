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
          style="width: 110px"
        >
          道具交易所
        </router-link>
        <router-link
          to="/coin"
          class="btn btn-outline-secondary nav-btn mx-1"
          style="width: 110px"
        >
          楓幣交易所
        </router-link>
        <!-- <div to="/bid" class="btn btn-outline-secondary nav-btn mx-1">競標</div>
        <div to="/sellaccount" class="btn btn-outline-secondary nav-btn mx-1">
          賣帳號
        </div>
        <div to="/guild" class="btn btn-outline-secondary nav-btn mx-1">
          找公會
        </div>
        <div to="/partner" class="btn btn-outline-secondary nav-btn mx-1">
          找戰友
        </div>
        <div to="/wish" class="btn btn-outline-secondary nav-btn mx-1">
          許願池
        </div> -->
      </div>
    </div>
    <div class="d-flex">
      <div class="icon-box" @click="infoHandler">
        <i class="bi bi-person-fill icon" />
      </div>
      <div class="icon-box" @click="logoutHandler">
        <i class="bi bi-box-arrow-right icon" />
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppNav',
  components: {},
  methods: {
    logoutHandler() {
      document.cookie = `accessToken=;expires=Wed, 31 Oct 2012 08:50:17 UTC`
      document.cookie = `refreshToken=;expires=Wed, 31 Oct 2012 08:50:17 UTC`
      this.$router.push('/login')
    },
    infoHandler() {
      this.$router.push('/info')
    },
  },
})
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
  background-color: rgba(255, 255, 255, 0.637);
  width: 100%;
}

.icon {
  font-size: 20px;
  margin: auto;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-self: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: #6c757d;
  margin-right: 20px;
  transition: background-color 0.15s, color 0.15s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #6c757d;
  }
}
</style>
