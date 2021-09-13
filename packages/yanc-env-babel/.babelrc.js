const { babel: aliases } = require("./pathconfig.json");

const presetEnvOptions = {
  targets: { node: "current" }
};

module.exports = {
  presets: [
    ["@babel/preset-env", presetEnvOptions],
    [
      "@babel/preset-typescript",
      {
        // See https://babeljs.io/docs/en/babel-preset-typescript
        isTSX: true,
        allExtensions: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
        optimizeConstEnums: true,
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    // path aliases using module-resolve
    ["babel-plugin-module-resolver", aliases],
    // make silence the "loose" warning
    ["@babel/plugin-proposal-private-methods"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-typescript"],
  ],
  env: {
    production: {
      ignore: [
        "**/*.spec.js",
        "**/*.spec.ts",
      ],
      comments: false,
    }
  },
  ignore: [
    "./dist", "./dist-*", "**/*.d.ts",
  ],
};
