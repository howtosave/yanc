const { customizeCss } = require("./gn-webpack-config");

const webpackConfig = {
  module: {
    rules: [],
  },
  resolve: {
    extensions: [],
  },
};

customizeCss(webpackConfig, { isDev: true });

console.log(
  ">>>",
  JSON.stringify(
    webpackConfig,
    function (k, v) {
      return k === "test" ? v.toString() : v;
    },
    2
  )
);
