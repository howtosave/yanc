const { babel: aliases } = require("./pathconfig.json");

const presetEnvOptions = {
  targets:
  //"> 0.25%, not dead", OR
  {
    browsers: [
      "edge >= 16",
      "safari >= 9",
      "firefox >= 57",
      "ie >= 11",
      "ios >= 9",
      "chrome >= 49"
    ],
  },
  useBuiltIns: "usage", 
  corejs: {
    version: 3, 
    proposals: true,
  },
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
    // use this plugin ...
    // to reuse code in @babel/runtime and reduce the size of code
    // to create a sandboxed environment and prevent pollution of the global scope
    ["@babel/plugin-transform-runtime", { 
      absoluteRuntime: false,
      corejs: presetEnvOptions.corejs,
      version: "^7.15.4",
    }],
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
