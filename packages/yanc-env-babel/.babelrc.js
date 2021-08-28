const { babel: aliases } = require("./pathconfig.json");

const useReact = false;

module.exports = {
  test: [
    /\.js$/,
    /\.ts$/,
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        targets: {
          node: "current",
        },
      },
    ],
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
    // path aliases using module-resolve
    ["babel-plugin-module-resolver", aliases],
    // make silence the "loose" warning
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
  ],
  parserOpts: {
    sourceType: "module",
  },
  targets: {
    node: "current",
  },
  env: {
    development: {
      presets: [
        ...(useReact ? ["@babel/preset-react", { development: true }] : []),
      ]
    },
    production: {
      ignore: [/\.spec\.js$/,/\.spec\.ts$/],
      comments: false,
    }
  },
};
