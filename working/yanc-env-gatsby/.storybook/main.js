const { customPathAlias, customizeCss } = require("../config/gn-webpack-config");
const devMode = process.env.NODE_ENV !== "production";

const stories = {
  "views": [
    "../src/page-views/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/component-views/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "all": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
};

const find_rule = (config, test) => {
  return config.module.rules.find((r) => r && r.test && r.test.toString() === test);
}

module.exports = {
  "stories": stories[process.env.SB_STORIES || "all"],  
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-apollo-client",
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/|(gatsby-theme).*\/)/];
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push(
      [require.resolve("babel-plugin-remove-graphql-queries"), {
        stage: config.mode === `development` ? "develop-html" : "build-html",
        staticQueryDir: "page-data/sq/d",
      }]
    );
    
    // use css gatsby webpack config
    customizeCss(config, {isDev: true});

    //
    // resolve from gatsby webpack config
    config.resolve = {
      ...config.resolve,
      ...customPathAlias.resolve
    };

    //console.log(">>>>>>>>>>>>>>>>>> RULES");
    //console.log(config.module.rules);
    return config;
  },
}

/*
    //
    // support .module.css
    const cssRule = find_rule(config, `/\\.css$/`);
    // exclude .module.css from css rule
    cssRule.exclude = /\.module\.css$/;

    //
    // .module.css
    const cssModuleRule = {
      ...cssRule,
      test: /\.module\.css$/,
      exclude: [],
      use: cssRule.use.map((item) => {
        if (item && item.loader && item.loader.match(/[\/\\]css-loader/g)) {
          return {
            ...item,
            // see https://github.com/webpack-contrib/css-loader
            // css-loader version in the storybook builder is ^5.0.0
            options: {
              ...item.options,
              esModule: true,
              modules: {
                mode: "local",
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                exportLocalsConvention: "camelCaseOnly",
              },
            },
          };
        }
        return item;
      }),
    };
    config.module.rules.push(cssModuleRule);

    //
    // .scss rule
    let scssRule = find_rule(config, `/\\.scss$/`);
    if (!scssRule) {
      scssRule = {
        test: /\.scss$/,
        exclude: /\.module\.scss$/, // do not process .module.scss
        use: [
          ...cssRule.use.map((item) => {
            if (item && item.loader && item.loader.match(/[\/\\]css-loader/g)) {
              // override css-loader
              const newItem = { ...item };
              newItem.options = {
                importLoaders: 1,
                modules: false,
                sourceMap: true,
              };
              return newItem;
            }
            return item;
          }),
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      };
      // add new scss rule
      config.module.rules.push(scssRule);
      config.resolve.extensions.push(".scss");
    }
    //
    // .module.scss rule
    const scssModuleRule = {
      test: /\.module\.scss$/,
      use: [
        ...cssRule.use.map((item) => {
          if (item && item.loader && item.loader.match(/[\/\\]css-loader/g)) {
            // override css-loader
            return {
              ...item,
              options: {
                importLoaders: 1,
                modules: {
                  mode: "local",
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  exportLocalsConvention: "camelCaseOnly",
                },
              }
            };
          }
          return item;
        }),
        // Compiles Sass to CSS
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    };
    config.module.rules.push(scssModuleRule);
*/