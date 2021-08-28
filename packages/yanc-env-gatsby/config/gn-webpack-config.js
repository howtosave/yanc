// webpack config for gatsby-node.js

const path = require("path");

const isDevEnv = process.env.NODE_ENV !== "production";
//
// custom webpack config
//
// See https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/

const { webpack: aliases } = require("../pathconfig.json");

const customPathAlias = {
  resolve: {
    roots: [path.resolve(__dirname, "../")],
    alias: Object.keys(aliases).reduce((acc, key) => {
      acc[key] = path.resolve(__dirname, aliases[key]);
      return acc;
    }, {}),
  },
};

const is_css_loader = (item) =>
  (typeof item === "string" && item.match(/css-loader/g)) ||
  (typeof item.loader === "string" && item.loader.match(/[\/\\]css-loader/g));

const find_rule = (config, test) => {
  return config.module.rules.find((r) => r && r.test && r.test.toString() === test);
};

const upsert_rule = (config, rule) => {
  const idx = config.module.rules.findIndex(
    (r) => r && r.test && r.test.toString() === rule.test.toString()
  );
  if (idx >= 0) {
    config.module.rules.splice(idx, 1, rule);
  } else {
    config.module.rules.push(rule);
  }
};

const customizeCss = (
  webpackConfig,
  {
    isDev = false,
    customCssModule = /\.module\.css$/,
    customScss = /\.scss$/,
    customScssModule = /\.module\.scss$/,
  }
) => {
  //
  // support .module.css
  let cssRule = find_rule(webpackConfig, `/\\.css$/`);
  if (!cssRule) {
    cssRule = {
      test: /\.css$/,
      use: [isDev ? "style-loader" : require("mini-css-extract-plugin").loader, "css-loader"],
    };
    webpackConfig.module.rules.push(cssRule);
    webpackConfig.resolve.extensions.push(".css");
  }

  if (customCssModule) {
    //
    // customize .module.css
    //
    const test = customCssModule;
    const existingRule = find_rule(webpackConfig, test.toString());

    // exclude .module.css from css rule
    if (cssRule.exclude) cssRule.exclude.push(test);
    else cssRule.exclude = test;

    // .module.css rule
    const cssModuleRule = {
      ...(existingRule ? existingRule : cssRule),
      test,
      exclude: existingRule ? existingRule.exclude : [],
      use: cssRule.use.map((item) => {
        // override css-loader
        if (is_css_loader(item)) {
          return {
            ...(typeof item === "string" ? { loader: item } : item),
            // see https://github.com/webpack-contrib/css-loader
            // css-loader version in the storybook@^6.3.0 builder is ^5.0.0
            options: {
              ...item.options,
              esModule: true,
              modules: {
                mode: "local",
                localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64]",
                exportLocalsConvention: "camelCaseOnly",
              },
            },
          };
        }
        return item;
      }),
    };
    // add or replace rule
    upsert_rule(webpackConfig, cssModuleRule);
  }

  if (customScss) {
    //
    // customize .css
    //
    const test = customScss;
    const existingRule = find_rule(webpackConfig, test.toString());

    // .scss rule
    const scssRule = {
      ...(existingRule ? existingRule : {}),
      test,
      use: [
        ...(existingRule || cssRule).use.map((item) => {
          if (is_css_loader(item)) {
            // override css-loader
            return {
              ...(typeof item === "string" ? { loader: item } : item),
              options: {
                importLoaders: 1,
                modules: false,
                sourceMap: true,
              },
            };
          }
          return item;
        }),
        // Compiles Sass to CSS
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
    };

    // exclude .module.scss
    if (customScssModule) {
      //exclude: /\.module\.scss$/, // do not process .module.scss
      if (!scssRule.exclude) {
        scssRule.exclude = customScssModule;
      } else {
        scssRule.exclude.push(customScssModule);
      }
    }

    // add or replace rule
    upsert_rule(webpackConfig, scssRule);
    // add scss extension
    if (!existingRule) webpackConfig.resolve.extensions.push(".scss");
  }

  if (customScssModule) {
    //
    // customize .module.scss
    //
    const test = customScssModule;
    const existingRule = find_rule(webpackConfig, test.toString());

    // .module.scss rule
    const scssModuleRule = {
      ...(existingRule ? existingRule : {}),
      test,
      use: [
        ...(existingRule || cssRule).use.map((item) => {
          if (is_css_loader(item)) {
            // override css-loader
            return {
              ...(typeof item === "string" ? { loader: item } : item),
              options: {
                importLoaders: 1,
                esModule: true,
                modules: {
                  mode: "local",
                  localIdentName: isDev
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64]",
                  exportLocalsConvention: "camelCaseOnly",
                },
              },
            };
          }
          return item;
        }),
        // Compiles Sass to CSS
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
    };
    // add or replace rule
    upsert_rule(webpackConfig, scssModuleRule);
    if (!existingRule && !customScss) webpackConfig.resolve.extensions.push(".scss");
  }
};

/*
module.exports = ({ actions, getConfig }) => {
  const config = getConfig();
  
  // customize css
  //customizeCss(config, { isDev: isDevEnv });

  // customize alias
  config.resolve = {
    ...config.resolve,
    ...customPathAlias.resolve,
  };
  
  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config);
};
*/

module.exports = ({ actions, getConfig }) => {
  const config = getConfig();

  //customizeCss(config, { isDev: isDevEnv });
  actions.setWebpackConfig({
    //...config,
    resolve: {
      ...customPathAlias.resolve,
    },
  });
  /*
  console.log(
    ">>>",
    JSON.stringify(
      config.module.rules,
      function (k, v) {
        return k === "test" ? v.toString() : v;
      },
      2
    )
  );
  */
};

module.exports.customPathAlias = customPathAlias;
module.exports.customizeCss = customizeCss;
