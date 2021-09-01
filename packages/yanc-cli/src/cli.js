//
// cli.js
//

const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const options = {};

const harg = yargs(hideBin(process.argv));
const argv = harg
  .usage("Usage: $0 <env> <command> [options]")
  .example("$0 babel test", "")
  .options(options)
  .demandCommand(2)
  // see https://github.com/yargs/yargs-parser#configuration
  .parserConfiguration({
    "boolean-negation": false,
    "camel-case-expansion": false,
  })
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
  verbose: false,
  rootDir: process.cwd(),
  ...opt,
});

//console.log(">>>>>>>>>>", argv);

(async () => {
  // yanc options from user's package.json
  const { yanc = {} } = require(path.resolve(path.join(process.cwd(), "package.json")));

  // call plugin
  const res = await plugin[command](
    withDefaultOpts(yanc),
    Object.keys(argv).reduce((acc, k) => {
      if (k !== "$0") acc[k] = argv[k];
      return acc;
    }, {})
  );

  if (res !== 0) {
    harg.showHelp();
    process.exit(res);
  }
})();
