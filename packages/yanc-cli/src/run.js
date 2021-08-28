const path = require('path');
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const options = {
  "verbose": {
    alias: "V",
    boolean: true,
    default: false,
    desc: "Verbose output",
  },
};

const harg = yargs(hideBin(process.argv));
const argv = harg
  .usage("Usage: $0 <env> <command> [options]")
  .example("$0 babel develop", "")
  .options(options)
  .demandCommand(2)
  .help("h")
  .epilog("copyright 2019").argv;

const pluginName = argv._.shift();
const command = argv._.shift();

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

//console.log(">>>>>>>>>>", argv);

(async () => {
  // yanc options from user's package.json
  const { yanc = {} } = require(path.resolve(path.join(process.cwd(), "package.json")));

  // call plugin
  // @ts-ignore
  const res = await plugin[command](
    withDefaultOpts(yanc),
    Object.keys(argv).reduce((acc, k) => {
      // @ts-ignore
      if (k !== "$0") acc[k] = argv[k];
      return acc;
    }, {})
  );

  if (res !== 0) {
    harg.showHelp();
    process.exit(res);
  }
})();
