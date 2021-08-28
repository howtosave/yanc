// jest.config.js
const pathconfig = require("./pathconfig.json");

module.exports = {
  // module resolution
  rootDir: ".",
  moduleNameMapper: {
    ...pathconfig.jest,
  },
  // test env
  testEnvironment: "node",
  preset: "ts-jest/presets/js-with-ts",
};
