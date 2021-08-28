const fs = require("fs/promises");
const path = require("path");
const { fork, spawn, exec } = require('child_process');

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

// develop
const develop = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  const gatsby = spawn(
    "./node_modules/.bin/gatsby", 
    [
      "develop",
      ..._argumentify(args),
    ],
    {
      //cwd: opts.rootDir,
      cwd: localRootDir,
      env: { ...process.env, FORCE_COLOR: '1' },
    }
  );

  gatsby.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  gatsby.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  gatsby.on('close', (code) => {
    if (code !== 0) {
      console.error(`gatsby process exited with code ${code}`);
    }
  });

  gatsby.on('error', (err) => {
    console.error("!!! [yanc-env-gatsby][develop]", err);
  });

  return 0;
};

// build
const build = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
    console.log(">>> _argumentify:", _argumentify(args));
  }

  const gatsby = spawn(
    "./node_modules/.bin/gatsby", 
    [
      "build",
      "--verbose",
      ..._argumentify(args),
    ],
    {
      //cwd: opts.rootDir,
      cwd: localRootDir,
      env: { ...process.env, FORCE_COLOR: '1' },
    }
  );

  gatsby.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  gatsby.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  gatsby.on('close', (code) => {
    if (code !== 0) {
      console.error(`gatsby process exited with code ${code}`);
    }
  });

  gatsby.on('error', (err) => {
    console.error("!!! [yanc-env-gatsby][build]", err);
  });

  return 0;
};

const setup = async (opts, args) => {
  const relativeRoot = path.relative(localRootDir, opts.rootDir);

  const { envGatsby: { srcDir, staticDir, staticContentDir } } = opts;
  let err = await fs.symlink(
    path.join(relativeRoot, srcDir), 
    path.join(__dirname, "src"),
    "dir"
  );
  if (err) return 1;
  err = await fs.symlink(
    path.join(relativeRoot, staticDir), 
    path.join(__dirname, "static"),
    "dir"
  );
  if (err) return 1;
  err = await fs.symlink(
    path.join(relativeRoot, staticContentDir), 
    path.join(__dirname, "static-content"),
    "dir"
  );
  return err ? 1 : 0;
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
      `${path.join(localRootDir, "tests", "jest.config.js")}`,
      ..._argumentify(args),
    ],
    {
      cwd: localRootDir,
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
  develop,
  build,
  setup,
  lint,
  test,
};

/*
const __build = async (opts, args) => {
  if (opts.verbose) {
    console.log(">>> opts:", opts);
    console.log(">>> args:", args);
  }

  exec(`./node_modules/.bin/gatsby build --verbose`,
  {
    cwd: opts.rootDir,
    env: { ...process.env, FORCE_COLOR: '1' },
  },
  (error, stdout, stderr) => {
    stdout && console.log(`${stdout}`);
    stderr && console.error(`${stderr}`);
    if (error) {
      console.error(`exec error: ${error}`);
    }
  });
  
  return 0;
};
*/
