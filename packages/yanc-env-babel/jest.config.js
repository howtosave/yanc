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
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
