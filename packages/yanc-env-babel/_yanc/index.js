const fs = require("fs");
const path = require("path");
const _ = require("lodash");

var Module = require("module");

const localRootDir = path.join(__dirname, "..");

const _update_eslint_config = (opts, { reset = false }) => {
  const remoteConfigToMerge =
    opts.envBabel && opts.envBabel.lintConfigFile
      ? path.resolve(path.join(opts.rootDir, opts.envBabel.lintConfigFile))
      : path.resolve(path.join(opts.rootDir, ".eslintrc.json"));

  let configPath;
  let config;
  if (!reset && fs.existsSync(remoteConfigToMerge)) {
    config = _.mergeWith(
      require(remoteConfigToMerge), // remote, obj
      require("../.eslintrc"), // local, src
      (objVal, srcVal, key, object) => {
        if (objVal === undefined) {
          // skip when no key on remote's
          _.unset(object, key);
        } else if (objVal !== srcVal) {
          // use remote's value
          return objVal;
        }
      }
    );
  } else {
    config = require("../.eslintrc");
  }
  configPath = path.join(opts.rootDir, ".eslintrc.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  return configPath;
};

const _update_babel_config = (opts, { reset = false }) => {
  const remoteConfigToMerge =
    opts.envBabel && opts.envBabel.babelConfigFile
      ? path.resolve(path.join(opts.rootDir, opts.envBabel.babelConfigFile))
      : path.resolve(path.join(opts.rootDir, ".babelrc.json"));

  let configPath;
  let config;
  if (!reset && fs.existsSync(remoteConfigToMerge)) {
    config = _.mergeWith(
      require(remoteConfigToMerge), // remote, obj
      require("../.babelrc"), // local, src
      (objVal, srcVal, key, object) => {
        if (objVal === undefined) {
          // skip when no key on remote's
          _.unset(object, key);
        } else if (objVal !== srcVal) {
          // use remote's value
          return objVal;
        }
      }
    );
  } else {
    config = require("../.babelrc");
  }
  configPath = path.join(opts.rootDir, ".babelrc.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  return configPath;
};

const _update_jest_config = (opts, { reset = false }) => {
  const remoteConfigToMerge =
    opts.envBabel && opts.envBabel.jestConfigFile
      ? path.resolve(path.join(opts.rootDir, opts.envBabel.jestConfigFile))
      : path.resolve(path.join(opts.rootDir, "jest.config.js"));

  let configPath;
  let config;
  if (!reset && fs.existsSync(remoteConfigToMerge)) {
    const remote = JSON.parse(JSON.stringify(require(remoteConfigToMerge)));
    const local = JSON.parse(JSON.stringify(require("../jest.config")));

    config = _.mergeWith(
      remote, // remote, obj
      local, // local, src
      (objVal, srcVal, key, object, source) => {
        //if (key === "testEnvironment") console.log(">>>>>>>", objVal, srcVal, object[key], source[key]);
        if (objVal === undefined) {
          // skip when no key on remote's
          //
          // TODO: !!! does not work !!!
          // make this property skip
          _.unset(object, key);
        } else if (objVal !== srcVal) {
          // use remote's value
          return objVal;
        }
      }
    );
  } else {
    config = require("../jest.config");
  }
  configPath = path.join(opts.rootDir, "jest.config.js");
  fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(config, null, 2)};\n`);
  return configPath;
};

// run scirpt
const update = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  const lintConfigPath = _update_eslint_config(opts, args);
  console.log(">>> [yanc-env-babel] updated lint config file:", lintConfigPath);

  const jestConfigPath = _update_jest_config(opts, args);
  console.log(">>> [yanc-env-babel] updated jest config file:", jestConfigPath);

  const babelConfigPath = _update_babel_config(opts, args);
  console.log(">>> [yanc-env-babel] updated babel config file:", babelConfigPath);

  return 0;
};

module.exports = {
  update,
};
