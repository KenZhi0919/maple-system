<template>
  <div
    class="container-lg h-100 d-flex justify-content-center align-items-center"
  >
    <div class="login-box d-flex justify-content-center align-items-center">
      <div class="w-60">
        <div class="d-flex flex-column align-items-center">
          <h1 class="mb-5">{{ isRegister ? "註冊" : "登入" }}</h1>
          <input-text
            v-model="account"
            class="mb-5"
            placeholder="帳號"
            style="border-radius: 20px; height: 45px"
          />
          <input-text
            v-model="password"
            class="mb-5"
            placeholder="密碼"
            style="border-radius: 20px; height: 45px"
          />
          <input-text
            v-if="isRegister"
            v-model="password2"
            class="mb-5"
            placeholder="密碼確認"
            style="border-radius: 20px; height: 45px"
          />
          <input-text
            v-if="isRegister"
            v-model="email"
            class="mb-5"
            placeholder="信箱"
            style="border-radius: 20px; height: 45px"
          />
          <input-text
            v-if="isRegister"
            v-model="line_id"
            class="mb-5"
            placeholder="Line ID"
            style="border-radius: 20px; height: 45px"
          />
          <button
            class="btn btn-primary mb-2"
            @click="loginHandler"
            style="border-radius: 20px"
          >
            登入
          </button>

          <div class="d-flex justify-content-end w-100">
            <span class="register-text" @click="setIsRegister">
              {{ isRegister ? "返回登入" : "進行註冊" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { InputText } from "@/components";
import { apiLogin } from "../../services/api";

export default defineComponent({
  name: "Login",
  components: { InputText },
  data() {
    return {
      isRegister: false,
      account: "",
      password: "",
      password2: "",
      email: "",
      line_id: "",
    };
  },
  methods: {
    async loginHandler() {
      this.$notify({ type: "success", text: "註冊成功!請登入" });
      let loader = this.$loading.show();
      try {
        const { data } = await apiLogin({
          username: this.account,
          password: this.password,
          password2: this.isRegister ? this.password2 : undefined,
          email: this.isRegister ? this.email : undefined,
          line_id: this.isRegister ? this.line_id : undefined,
        });

        if (this.isRegister) {
          this.isRegister = false;
          this.account = "";
          this.password = "";
          this.password2 = "";
          this.email = "";
          this.line_id = "";
          this.$notify({ type: "success", text: "註冊成功!請登入" });
        } else {
          document.cookie = `accessToken=${data.result.access}`;
          document.cookie = `refreshToken=${data.result.refresh}`;
          this.$router.push("/");
        }
      } catch (e) {
        console.log(e);
      } finally {
        loader.hide();
      }
    },
    setIsRegister() {
      this.isRegister = !this.isRegister;
    },
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 30px;
  height: 800px;
  width: 700px;
}

.register-text {
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #fff;
  }
}
</style>
