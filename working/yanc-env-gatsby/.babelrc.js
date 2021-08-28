// babel.config.js
const { babel: aliases } = require("./pathconfig.json");

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    [
      "babel-preset-gatsby",
      {
        targets: {
          browsers: [">0.25%", "not dead"],
        },
      },
    ],
  ],
  plugins: [
    // path aliases using module-resolve
    ["babel-plugin-module-resolver", aliases],
    // make silence the "loose" warning on jest
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
  ],
};
