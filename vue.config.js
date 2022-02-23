module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/maple-system/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/scss/style.scss";
        `,
      },
    },
  },
};
