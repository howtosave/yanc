const fs = require("fs");
const path = require("path");
const { exec, fork, spawn } = require("child_process");
const _ = require("lodash");

var Module = require("module");

const localRootDir = path.join(__dirname, "..");


/**
 * convert object to argument string array
 *
 * @param {object} args
 * @returns {string[]} argumentified array
 */
const _argumentify = (args, useStringify = true) => {
  const arr = [];
  Object.keys(args).forEach((e) => {
    // TODO:
    // How to know whether the arg prefix is '-' or '--'
    if (e === "_") {
      arr.push(...(useStringify ? args[e].map((i) => JSON.stringify(i)) : args[e]));
    } else {
      arr.push(`--${e}`);
      if (typeof args[e] !== "boolean") arr.push(JSON.stringify(args[e]));
    }
  });
  //console.log(">>>>>>>>>>>>>>>>", arr, args["_"].map((i) => JSON.stringify(i)));
  return arr;
};

const _find_bin = (name) => {
  const mpaths = Module._nodeModulePaths(process.cwd());
  for (const mpath of mpaths) {
    const binPath = path.join(mpath, ".bin", name);
    if (fs.existsSync(binPath)) return binPath;
  }
  return "";
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

const _merge_eslint_config = (opts) => {
  const remoteConfigFile = path.resolve(path.join(opts.rootDir, opts.configDir, "eslint-config"));
  let configPath;
  if (fs.existsSync(remoteConfigFile + ".js") || fs.existsSync(remoteConfigFile + ".json")) {
    const cacheDir = _ensure_cache_dir();
    const config = _.merge(require("../.eslintrc"), require(remoteConfigFile));
    configPath = path.join(cacheDir, "eslintrc.json");
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } else {
    configPath = path.join(localRootDir, ".eslintrc.js");
  }

  return configPath;
};

const _merge_jest_config = (opts) => {
  const remoteConfigFile = path.resolve(path.join(opts.rootDir, opts.configDir, "jest-config"));
  let configPath;

  if (fs.existsSync(remoteConfigFile + ".js") || fs.existsSync(remoteConfigFile + ".json")) {
    const cacheDir = _ensure_cache_dir();
    const config = _.merge(require("../jest.config"), require(remoteConfigFile));
    configPath = path.join(cacheDir, "jest.config.json");
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } else {
    configPath = path.join(localRootDir, "jest.config.js");
  }
  return configPath;
};

// run scirpt
const node = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
    console.log(">>> argumentified:", _argumentify(args));
    console.log(">>> stringified:", _argumentify(args).join(" "));
  }

  if (args._.length > 0) {
    // run script file
    const child = fork(`${args._.shift()}`, _argumentify(args), {
      cwd: opts.rootDir,
    });
    child.on("error", (err) => {
      console.error("!!! [yanc-env-babel]", err);
    });
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

const setup = async (opts, args) => {
  /*
  const relativeRoot = path.relative(localRoot, opts.rootDir);
  console.log(">>> ", relativeRoot);
  const err = await fs.symlink(
    path.join(relativeRoot, opts.srcDir), 
    path.join(__dirname, "src"),
    "dir"
  );
  return err ? 1 : 0;
  */
  return 0;
};

const lint = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  const binPath = _find_bin("eslint");
  const configPath = _merge_eslint_config(opts);
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

  const eslit = spawn(binPath, params, options);

  eslit.stdout.on("data", (data) => console.log(`${data}`));
  eslit.stderr.on("data", (data) => console.error(`${data}`));
  eslit.on("close", (code) => code !== 0 && console.error(`lint process exited with code ${code}`));
  eslit.on("error", (err) => console.error("!!! [yanc-env-babel:lint]", err));

  return 0;
};

const test = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }
  const binPath = _find_bin("jest");
  //const configPath = `${path.join(localRootDir, "jest.config.js")}`;
  const configPath = _merge_jest_config(opts);

  if (opts.verbose) {
    console.log(">>> bin path:", binPath);
    console.log(">>> config file path:", configPath);
  }

  const jest = spawn(
    binPath,
    [
      "--config",
      configPath,
      "--rootDir",
      `${opts.rootDir}`,
      "--roots",
      `${opts.rootDir}`,
      ..._argumentify(args),
    ],
    {
      cwd: opts.rootDir,
      env: { ...process.env, FORCE_COLOR: "1" },
    }
  );

  jest.stdout.on("data", (data) => console.log(`${data}`));
  jest.stderr.on("data", (data) => console.error(`${data}`));
  jest.on("close", (code) => code !== 0 && console.error(`jest process exited with code ${code}`));
  jest.on("error", (err) => console.error("!!! [yanc-env-babel:jest]", err));

  return 0;
};

module.exports = {
  node,
  setup,
  lint,
  test,
};

/*
#
# FAILURE trial
#
exec(`./node_modules/.bin/eslint --config ${path.join(localRoot, ".eslintrc.js")} .`,
{
  cwd: opts.rootDir,
},
(error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`${stdout}`);
  console.error(`${stderr}`);
});
*/
