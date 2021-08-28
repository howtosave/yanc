const path = require("path");
const { fork, spawn } = require('child_process');

const localRootDir = __dirname;

//
/**
 * convert object to argument string array
 * 
 * @param {object} args 
 * @returns {string[]} argumentified array
 */
const _argumentify = (args) => {
  const arr = [];
  Object.keys(args).forEach((e) => {
    // TODO:
    // How to know whether the arg prefix is '-' or '--'
    if (e !== "_") {
      arr.push(`--${e}`);
      if (typeof args[e] !== "boolean") arr.push(args[e]);
    } else {
      arr.concat(args[e]);
    }
  });
  return arr;
}

// run scirpt
const node = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(
    `${args._.shift()}`, 
    ..._argumentify(args),
    { 
      signal,
      cwd: opts.rootDir,
      execArgv: ['--experimental-abortcontroller'],
    });

  child.on('error', (err) => {
    console.error("!!! [yanc-env-babel]", err);
  });
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

  const eslit = spawn(
    "./node_modules/.bin/eslint", 
    [
      "--config",
      `${path.join(localRootDir, ".eslintrc.js")}`,
      ..._argumentify(args),
    ],
    {
      cwd: opts.rootDir,
      env: { ...process.env, FORCE_COLOR: '1' },
    }
  );

  eslit.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  eslit.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  eslit.on('close', (code) => {
    if (code !== 0) {
      console.error(`eslint process exited with code ${code}`);
    }
  });

  eslit.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
    console.error("!!! [yanc-env-babel][lint]", err);
  });

  return 0;
};

const test = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  const jest = spawn(
    "./node_modules/.bin/jest", 
    [
      "--config",
      `${path.join(localRootDir, "jest.config.js")}`,
      "--rootDir",
      `${opts.rootDir}`,
      "--roots",
      `${opts.rootDir}`,
      ..._argumentify(args),
    ],
    {
      cwd: opts.rootDir,
      env: { ...process.env, FORCE_COLOR: '1' },
    }
  );

  jest.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  jest.stderr.on('data', (data) => {
    console.error(`${data}`);
  });
  
  jest.on('close', (code) => {
    if (code !== 0) {
      console.error(`jest process exited with code ${code}`);
    }
  });

  jest.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
    console.error("!!! [yanc-env-babel][jest]", err);
  });

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
  