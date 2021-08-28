// theme plugins for gatsby-config.js
const {
  localizationConfig: { defaultLangCode, enabledLocales },
} = require("../src/site-config");

module.exports = [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      // Note: Gatsby is using css-loader@^5.0.0
      sassOptions: {
        // Bootstrap 4. See https://getbootstrap.com/docs/4.3/getting-started/theming/#sass
        precision: 6,
        sourceMap: true,
      },
    },
  },
  {
    // See https://www.gatsbyjs.com/plugins/gatsby-theme-i18n/
    resolve: `gatsby-theme-my-i18n`,
    options: {
      defaultLang: defaultLangCode,
      locales: enabledLocales.join(" "),
      prefixDefault: false,
      configPath: require.resolve("../src/site-config/locale-config.json"),
    },
  },
];
