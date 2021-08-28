const fs = require("fs/promises");
const path = require("path");
const { fork, exec, spawn } = require('child_process');

const localRoot = __dirname;

// run scirpt
const node = async (opts, args) => {
  console.log(">>> node: opts:", opts);
  console.log(">>> args:", args);

  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(
    "./src/index.js", 
    ['child'],
    { 
      signal,
      cwd: opts.rootDir,
      execArgv: ['--experimental-abortcontroller'],
    });

  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
    console.error("!!! [yanc-env-babel]", err);
  });
  //controller.abort(); // Stops the child process

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
  const eslit = spawn(
    "./node_modules/.bin/eslint", 
    [
      "--config",
      `${path.join(localRoot, ".eslintrc.js")}`,
      "."
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
  const jest = spawn(
    "./node_modules/.bin/jest", 
    [
      "--config",
      `${path.join(localRoot, "jest.config.js")}`,
      "--roots",
      `${opts.rootDir}`,
      "."
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
  