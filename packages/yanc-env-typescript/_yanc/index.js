const fs = require("fs");
const path = require("path");
const { spawn, fork, exec } = require("child_process");
const _ = require("lodash");

var Module = require("module");

const localRootDir = path.join(__dirname, "..");

//
// Util function for _export
//

const _update_json_config = (
  jsonFile,
  opts,
  { reset = false },
  skipIfExisting = false,
  isJson5 = false
) => {
  const remoteConfigToMerge = path.resolve(path.join(opts.rootDir, jsonFile));
  if (skipIfExisting && fs.existsSync(remoteConfigToMerge)) return remoteConfigToMerge;

  let config;
  if (isJson5) {
    //
    // TODO: merge json5
    //
    config = fs.readFileSync(path.resolve(path.join(localRootDir, jsonFile)), "utf-8");
  } else {
    if (!reset && fs.existsSync(remoteConfigToMerge)) {
      if (isJson5) {
      } else {
        config = _.mergeWith(
          require(remoteConfigToMerge), // remote, obj
          require(`../${jsonFile}`), // local, src
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
      }
    } else {
      config = require(`../${jsonFile}`);
    }
  }

  const configPath = remoteConfigToMerge;
  fs.writeFileSync(
    configPath,
    typeof config === "object" ? JSON.stringify(config, null, 2) : config
  );

  return configPath;
};

const _update_base_config = (opts, args, skipIfExisting = false) => {
  //_update_json_config("pathconfig.json", opts, args, skipIfExisting, false);
  _update_json_config("jsconfig.json", opts, args, skipIfExisting, true);
  _update_json_config("tsconfig.production.json", opts, args, skipIfExisting, true);
  const tsConfig = _update_json_config("tsconfig.json", opts, args, skipIfExisting, true);
  return tsConfig;
};

const _ensure_base_config = (opts) => _update_base_config(opts, {}, true);

const _update_eslint_config = (opts, { reset = false }, skipIfExisting = false) => {
  const outputConfigPath = path.resolve(path.join(opts.rootDir, ".eslintrc.json"));
  if (skipIfExisting && fs.existsSync(outputConfigPath)) return outputConfigPath;

  const remoteConfigToMerge =
    opts.envBabel && opts.envBabel.lintConfigFile
      ? path.resolve(path.join(opts.rootDir, opts.envBabel.lintConfigFile))
      : outputConfigPath;

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

  fs.writeFileSync(outputConfigPath, JSON.stringify(config, null, 2));

  return outputConfigPath;
};

const _ensure_eslint_config = (opts) =>
  _ensure_base_config(opts) && _update_eslint_config(opts, {}, true);

/**
 * exports config files
 *
 * @param {*} opts yanc options
 * @param {*} args arguments
 */
const _export = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  _update_base_config(opts, args);
  console.log(">>> [yanc-env-typescript] updated base config files");

  const lintConfigPath = _update_eslint_config(opts, args);
  console.log(">>> [yanc-env-typescript] updated lint config file:", lintConfigPath);

  return 0;
};

/**
 * convert object to string array for arguments input
 *
 * @param {object} args
 * @returns {string[]} argumentified array
 */
const _argumentify = (args, useStringify = true) => {
  const arr = [];
  Object.keys(args).forEach((e) => {
    if (e === "_") {
      arr.push(...(useStringify ? args[e].map((i) => JSON.stringify(i)) : args[e]));
    } else {
      // TODO:
      // How to know whether the arg prefix is '-' or '--'
      // Assume if the length of arg name is 1 then the prefix is '-', otherwise '--'
      arr.push(e.length === 1 ? `-${e}` : `--${e}`);
      if (typeof args[e] !== "boolean") arr.push(useStringify ? JSON.stringify(args[e]) : args[e]);
    }
  });
  //console.log(">>>>>>>>>>>>>>>>", arr, args["_"].map((i) => JSON.stringify(i)));
  return arr;
};

// ===========================
// Util funcitons
//

const _find_bin = (name) => {
  //
  // TODO: find bin on yarn virtual env
  //
  const mpaths = Module._nodeModulePaths(process.cwd());
  for (const mpath of mpaths) {
    const binPath = path.join(mpath, ".bin", name);
    if (fs.existsSync(binPath)) return binPath;
  }
  return "";
};

/**
 * run eslint process
 *
 * @param {*} opts yanc options
 * @param {*} args arguments
 */
const eslint = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  const binPath = _find_bin("eslint");
  if (!binPath) {
    console.error(`!!! not found eslint. set 'nodeLinker: node-modules' if using yarn`);
    return -1;
  }
  const configPath = _ensure_eslint_config(opts);
  const params = ["--no-eslintrc", "--config", configPath, ..._argumentify(args, false)];
  const options = {
    cwd: opts.rootDir,
    env: { ...process.env, FORCE_COLOR: "1" },
  };

  if (opts.verbose) {
    console.log(">>> bin path:", binPath);
    console.log(">>> config file path:", configPath);
    console.log(">>> params:", params);
    //console.log(">>> options:", options);
  }

  const eslintProcess = spawn(binPath, params, options);

  eslintProcess.stdout.on("data", (data) => console.log(`${data}`));
  eslintProcess.stderr.on("data", (data) => console.error(`${data}`));
  eslintProcess.on(
    "close",
    (code) => code !== 0 && console.error(`lint process exited with code ${code}`)
  );
  eslintProcess.on("error", (err) => console.error("!!! [yanc-env-typescript:lint]", err));

  return 0;
};

/**
 * run tsc process
 *
 * @param {*} opts yanc options
 * @param {*} args arguments
 */
const tsc = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  const binPath = _find_bin("tsc");
  if (!binPath) {
    console.error(`!!! not found tsc. set 'nodeLinker: node-modules' if using yarn`);
    return -1;
  }
  const configPath = _ensure_base_config(opts);
  const params = [..._argumentify(args, false)];
  const options = {
    cwd: opts.rootDir,
    env: { ...process.env, FORCE_COLOR: "1" },
  };

  if (opts.verbose) {
    console.log(">>> bin path:", binPath);
    console.log(">>> config file path:", configPath);
    console.log(">>> params:", params);
    //console.log(">>> options:", options);
  }

  const tscProcess = spawn(binPath, params, options);

  tscProcess.stdout.on("data", (data) => console.log(`${data}`));
  tscProcess.stderr.on("data", (data) => console.error(`${data}`));
  tscProcess.on(
    "close",
    (code) => code !== 0 && console.error(`tsc process exited with code ${code}`)
  );
  tscProcess.on("error", (err) => console.error("!!! [yanc-env-typescript:tsc]", err));

  return 0;
};



module.exports = {
  eslint,
  lint: eslint,
  export: _export,
  configure: _export,
  tsc,
};
