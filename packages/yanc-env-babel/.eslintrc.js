// .eslintrc.js
// off: 0, warn: 1, error: 2

//
// global configuration
//
const targetBrowser = false;
const useReact = false;
const useTypescript = true;

//
// rules for javascript development
const dev_rules = {
  "no-unused-vars": [0],
  "no-empty-pattern": [0],
  "no-empty": [0],
  "camelcase": [0],
  "jest/no-done-callback": [0],
  "jest/no-disabled-tests": [0],
  "jsx-a11y/anchor-is-valid": [0],
};

//
// rules for typescript development
const dev_rules_ts = {
  "@typescript-eslint/no-unused-vars": [0],
  "@typescript-eslint/no-empty-function": [0],
  "@typescript-eslint/no-use-before-define": [0],
  "@typescript-eslint/no-var-requires": [0],
  "@typescript-eslint/no-explicit-any": [0],
  "@typescript-eslint/no-empty-interface": [0],
  "@typescript-eslint/ban-ts-ignore": [0],
  "@typescript-eslint/explicit-function-return-type": [0],
  "@typescript-eslint/camelcase": [0],
};

//
// prettier config
const prettierConfig = {
  endOfLine: "lf",
  semi: true,
  trailingComma: "es5",
  printWidth: 100,
  singleQuote: false,
  quoteProps: "preserve",
  tabWidth: 2,
  proseWrap: "preserve",
  arrowParens: "always",
  bracketSpacing: true,
};

//
// rules for js in common
const _common_rules = {
  "no-use-before-define": [0],
  "no-template-curly-in-string": [0],
  "no-underscore-dangle": [0],
  "no-multi-assign": [0],
  "no-plusplus": [0],
  "no-unused-expressions": [2, { allowShortCircuit: true }],
  "no-useless-escape": [1],
  "linebreak-style": [2, "unix"],
  "max-len": [
    1,
    {
      code: prettierConfig.printWidth,
      ignoreUrls: true,
      ignoreComments: true,
      ignoreTemplateLiterals: true,
    },
  ],
  "quotes": [0, "double", { avoidEscape: true, allowTemplateLiterals: true }],
  "quote-props": [1, "consistent-as-needed"],
  "prettier/prettier": [1, prettierConfig, { usePrettierrc: false }],
  "arrow-body-style": "off",
  "prefer-arrow-callback": "off",
  "spaced-comment": [0],
  "import/prefer-default-export": [0],
  "import/order": [0],
  "import/extensions": [
    2,
    "ignorePackages",
    {
      js: "never",
      jsx: "never",
      ts: "never",
      tsx: "never",
    },
  ],
  "json/*": [2, "allowComments"],
  "jest/no-done-callback": [1],
};

//
// rules for react/jsx
const _rules_react = {
  "react/prop-types": [0],
  "react/require-default-props": [0],
  "react/jsx-curly-brace-presence": [0],
  "react/jsx-one-expression-per-line": [0],
  "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
  "jsx-a11y/control-has-associated-label": [0],
  "jsx-a11y/anchor-has-content": [1],
};

//
// common plugins/extends
//
const common_plugins = ["prettier", "import", "json", "jest"];
const common_extends = [
  "eslint:recommended",
  "plugin:import/recommended",
  "plugin:prettier/recommended",
  "plugin:json/recommended",
  "plugin:jest/recommended",
];

//
// react plugins/extends
//
const _plugins_react = ["react", "react-hooks", "jsx-a11y"];
const _extends_react = [
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  "plugin:jsx-a11y/recommended",
];
const _settings_react = {
  react: { version: "detect" },
};

/**
 * config for *.js
 */
const _config_js = {
  // An environment provides predefined global variables.
  // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
  env: {
    browser: targetBrowser,
    commonjs: true,
    node: true,
    jest: true,
    es6: true,
    es2021: true,
  },
  globals: {},
  // Specifying the JavaScript language options
  // https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: [...common_plugins],
  extends: [...common_extends],
  rules: {
    "no-unused-vars": [0, { argsIgnorePattern: "^_" }],
    ..._common_rules,
    ...(process.env.NODE_ENV === "production" ? {} : dev_rules),
  },
};

/**
 * config for *.jsx
 */
const _config_jsx = {
  files: ["*.jsx"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [...common_plugins, ..._plugins_react],
  extends: [...common_extends, ..._extends_react],
  rules: {
    ..._common_rules,
    ..._rules_react,
    ...(process.env.NODE_ENV === "production" ? {} : dev_rules),
  },
};

/**
 * config for *.ts?x
 */
const _config_ts = {
  files: ["*.ts", "*.tsx"],
  parser: "@typescript-eslint/parser",
  plugins: [...common_plugins, ...(useReact ? _plugins_react : []), "@typescript-eslint"],
  extends: [
    ...common_extends,
    "plugin:import/typescript", // # this line does the trick
    ...(useReact ? _extends_react : []),
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": _config_js.rules["no-unused-vars"],
    ..._common_rules,
    ...(useReact ? _rules_react : {}),
    "@typescript-eslint/triple-slash-reference": [0],
    "@typescript-eslint/quotes": [0, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    "@typescript-eslint/explicit-function-return-type": [0],
    "@typescript-eslint/no-explicit-any": [0],
    "@typescript-eslint/no-var-requires": [0],
    "@typescript-eslint/no-use-before-define": [1],
    "@typescript-eslint/no-empty-function": [1],
    "@typescript-eslint/ban-ts-comment": [1],
    ...(process.env.NODE_ENV === "production" ? {} : dev_rules_ts),
  },
};

module.exports = {
  // do not use parent's props
  root: true,

  ignorePatterns: ["/build", "/dist", "dist-*", "/.cache", "deprecated", "/.yarn"],
  // javascript
  ..._config_js,

  // typescript, jsx, ...
  overrides: [useTypescript && _config_ts, useReact && _config_jsx].filter((e) => e),

  settings: {
    // path aliases
    "import/resolver": {
      // use `eslint-import-resolver-`babel-module for babel-plugin-module-resolver
      "babel-module": {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".es", ".es6", ".mjs"],
      },
    },
    ...(useReact ? _settings_react : {}),
  },
};
