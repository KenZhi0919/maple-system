<template>
  <div class="container-lg"><button @click="loginHandler">login</button></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const state = reactive({});
    return { ...toRefs(state) };
  },
  methods: {
    loginHandler() {
      this.$example.sayHello();
    },
  },
});
</script>
