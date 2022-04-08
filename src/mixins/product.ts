import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    formatPrice(number: number) {
      let n = number;
      let r = "";

      do {
        const mod = n % 1000;
        n = n / 1000;
        r = ~~mod + (r ? "," + r : "");
      } while (n > 1);

      const strNumber = number + "";
      const index = strNumber.indexOf(".");
      if (index > 0) {
        r += strNumber.substring(index);
      }
      return r;
    },
  },
});
