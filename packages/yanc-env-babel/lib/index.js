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
  _update_json_config("pathconfig.json", opts, args, skipIfExisting, false);
  _update_json_config("tsconfig.json", opts, args, skipIfExisting, true);
  _update_json_config("jsconfig.json", opts, args, skipIfExisting, true);
  return true;
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

const _update_babel_config = (opts, { reset = false }, skipIfExisting = false) => {
  const outputConfigPaths = [".babelrc", ".babelrc.browser"].map((configFile) => {
    const outputConfigPath = path.resolve(path.join(opts.rootDir, `${configFile}.json`));
    if (skipIfExisting && fs.existsSync(outputConfigPath)) return outputConfigPath;

    const remoteConfigToMerge =
      opts.envBabel && opts.envBabel.babelConfigFile
        ? path.resolve(path.join(opts.rootDir, opts.envBabel.babelConfigFile))
        : outputConfigPath;

    let config;
    if (!reset && fs.existsSync(remoteConfigToMerge)) {
      config = _.mergeWith(
        require(remoteConfigToMerge), // remote, obj
        require(`../${configFile}`), // local, src
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
      config = require(`../${configFile}`);
    }
    fs.writeFileSync(outputConfigPath, JSON.stringify(config, null, 2));
    return outputConfigPath;
  });

  return outputConfigPaths.length > 0 ? outputConfigPaths : null;
};

const _ensure_babel_config = (opts) =>
  _ensure_base_config(opts) && _update_babel_config(opts, {}, true);

const _update_jest_config = (opts, { reset = false }, skipIfExisting = false) => {
  const outputConfigPath = path.resolve(path.join(opts.rootDir, "jest.config.js"));
  if (skipIfExisting && fs.existsSync(outputConfigPath)) return outputConfigPath;

  const remoteConfigToMerge =
    opts.envBabel && opts.envBabel.jestConfigFile
      ? path.resolve(path.join(opts.rootDir, opts.envBabel.jestConfigFile))
      : outputConfigPath;

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

  fs.writeFileSync(outputConfigPath, `module.exports = ${JSON.stringify(config, null, 2)};\n`);
  return outputConfigPath;
};

const _ensure_jest_config = (opts) =>
  _ensure_base_config(opts) && _update_jest_config(opts, {}, true);

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
  console.log(">>> [yanc-env-babel] updated base config files");

  const lintConfigPath = _update_eslint_config(opts, args);
  console.log(">>> [yanc-env-babel] updated lint config file:", lintConfigPath);

  const jestConfigPath = _update_jest_config(opts, args);
  console.log(">>> [yanc-env-babel] updated jest config file:", jestConfigPath);

  const babelConfigPath = _update_babel_config(opts, args);
  console.log(">>> [yanc-env-babel] updated babel config file:", babelConfigPath);

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
  const hasConfigArg = Object.keys(args).find((e) => e === "config" || e === "c");
  const params = [
    ...(hasConfigArg ? [] : ["--config", configPath]),
    "--no-eslintrc",
    ..._argumentify(args, false),
  ];
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
  eslintProcess.on("error", (err) => console.error("!!! [yanc-env-babel:lint]", err));

  return 0;
};

/**
 * run jest process
 *
 * @param {*} opts yanc options
 * @param {*} args arguments
 */
const jest = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }
  const binPath = _find_bin("jest");
  if (!binPath) {
    console.error(`!!! not found jest. set 'nodeLinker: node-modules' if using yarn`);
    return -1;
  }
  const configPath = _ensure_jest_config(opts);
  const hasConfigArg = Object.keys(args).find((e) => e === "config" || e === "c");
  const params = [
    ...(hasConfigArg ? [] : ["--config", configPath]),
    "--rootDir",
    `${opts.rootDir}`,
    "--roots",
    `${opts.rootDir}`,
    ..._argumentify(args),
  ];
  const options = {
    cwd: opts.rootDir,
    env: { ...process.env, FORCE_COLOR: "1" },
  };

  if (opts.verbose) {
    console.log(">>> bin path:", binPath);
    console.log(">>> config file path:", configPath);
    console.log(">>> params:", params);
  }

  const jestProcess = spawn(binPath, params, options);

  jestProcess.stdout.on("data", (data) => console.log(`${data}`));
  jestProcess.stderr.on("data", (data) => console.error(`${data}`));
  jestProcess.on(
    "close",
    (code) => code !== 0 && console.error(`jest process exited with code ${code}`)
  );
  jestProcess.on("error", (err) => console.error("!!! [yanc-env-babel:jest]", err));

  return 0;
};

/**
 * run babel process
 *
 * @param {*} opts yanc options
 * @param {*} args arguments
 */
const babel = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }
  const binPath = _find_bin("babel");
  if (!binPath) {
    console.error(`!!! not found babel. set 'nodeLinker: node-modules' if using yarn`);
    return -1;
  }
  const configPaths = _ensure_babel_config(opts);
  const hasConfigArg = Object.keys(args).find((e) => e === "config-file");
  const params = [
    ...(hasConfigArg ? [] : ["--config-file", configPaths[0]]),
    "--no-babelrc",
    ..._argumentify(args, false),
  ];
  const options = {
    cwd: opts.rootDir,
    env: { ...process.env, FORCE_COLOR: "1" },
  };

  if (opts.verbose) {
    console.log(">>> bin path:", binPath);
    console.log(">>> config file path:", configPaths);
    console.log(">>> params:", params);
  }

  const babelProcess = spawn(binPath, params, options);

  babelProcess.stdout.on("data", (data) => console.log(`${data}`));
  babelProcess.stderr.on("data", (data) => console.error(`${data}`));
  babelProcess.on(
    "close",
    (code) => code !== 0 && console.error(`babel process exited with code ${code}`)
  );
  babelProcess.on("error", (err) => console.error("!!! [yanc-env-babel:babel]", err));

  return 0;
};

const _find_module_dir = (name, name2) => {
  const mpaths = Module._nodeModulePaths(process.cwd());
  for (const mpath of mpaths) {
    const modPath = path.join(mpath, name);
    if (fs.existsSync(modPath)) return modPath;
  }
  return "";
};

const _ensure_cache_dir = () => {
  const cacheDir = path.join(
    _find_module_dir("@yanc", "env-bable"),
    "..",
    ".cache",
    "@yanc",
    "env-bable"
  );
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  return cacheDir;
};

const _create_script_file = (input, opts) => {
  const cacheDir = _ensure_cache_dir();
  const fileName = `tmpScript@${Date.now()}.js`;
  const scriptFile = path.join(cacheDir, fileName);
  fs.writeFileSync(
    scriptFile,
    `require("@babel/register")({ extensions: [".js", ".ts"] }); require("${path.resolve(
      path.join(opts.rootDir, input)
    )}");`
  );
  // cleanup
  fs.readdir(cacheDir, (err, files) => {
    err ||
      files.forEach(
        (file) =>
          file.startsWith("tmpScript@") &&
          file !== fileName &&
          fs.unlink(path.join(cacheDir, file), () => {})
      );
  });
  return scriptFile;
};

// run scirpt
const node = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  // babel config file should be located in the remote root directory
  _ensure_babel_config(opts);

  if (args._.length > 0) {
    // run script file
    // remove script file arguement from args array
    const scriptPath = _create_script_file(args._.shift(), opts);
    const params = [..._argumentify(args, false)];
    const options = {
      cwd: opts.rootDir,
    };

    if (opts.verbose) {
      console.log(">>> script file path:", scriptPath);
      console.log(">>> params:", params);
    }

    const childProcess = fork(scriptPath, params, options);

    childProcess.on(
      "close",
      (code) => code !== 0 && console.error(`node process exited with code ${code}`)
    );
    childProcess.on("error", (err) => console.error("!!! [yanc-env-babel:node]", err));
  } else {
    // run node
    exec(
      `node ${_argumentify(args).join(" ")}`,
      {
        cwd: opts.rootDir,
      },
      (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.error(`${stderr}`);
        if (error) {
          console.error(`!!! [yanc-env-babel]: ${error}`);
        }
      }
    );
  }
  return 0;
};

module.exports = {
  eslint,
  jest,
  babel,
  node,
  lint: eslint,
  test: jest,
  build: babel,
  exec: node,
  export: _export,
  configure: _export,
};
