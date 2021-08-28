/**
 * Jest Config for Unit testing
 *
 * See https://jestjs.io/docs/en/configuration
 */

const { jest: aliases } = require("../pathconfig.json");

module.exports = {
  rootDir: "..",
  transform: {
    "^.+\\.[jt]sx?$": `<rootDir>/tests/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    // path aliases
    ...aliases,
  },
  testPathIgnorePatterns: [`/node_modules/`, `/.cache/`, `/public/`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFilesAfterEnv: [`<rootDir>/tests/jest-setup.js`],
  setupFiles: [`<rootDir>/tests/loadershim.js`],
  testEnvironment: "jsdom",
};
