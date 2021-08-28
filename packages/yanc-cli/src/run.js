const path = require('path');
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const options = {
};

const harg = yargs(hideBin(process.argv));
const argv = harg
  .usage("Usage: $0 <env> <command> [options]")
  .example("$0 babel develop", "")
  .options(options)
  .demandCommand(2)
  .help("h")
  .epilog("copyright 2019").argv;

const pluginName = argv._[0];
const command = argv._[1];

/**
 * @param {number} code exit code
 */
function exit(code, showHelp = false) {
  if (showHelp) harg.showHelp();
  process.exit(code);
}

const plugin = require(`@yanc/env-${pluginName}`);
if (!plugin) {
  console.error("!!! no plugin:", pluginName);
  exit(1, true);
}

/**
 * @param {any} opt user option
 */
 const withDefaultOpts = (opt) => ({
  srcDir: "./src",
  configDir: "./config",
  rootDir: process.cwd(),
  ...opt,
});

(async () => {
  // yanc options from user's package.json
  const { yanc = {} } = require(path.resolve(path.join(process.cwd(), "package.json")));

  // call plugin
  const res = await plugin[command](
    withDefaultOpts(yanc),
    Object.keys(argv).reduce((acc, k) => {
      // @ts-ignore
      if (k !== "_" && k !== "$0") acc[k] = argv[k];
      return acc;
    }, {})
  );

  if (res !== 0) {
    harg.showHelp();
    process.exit(res);
  }
})();
