// gatsby-config.js

const { appManifest, siteMetadata } = require("./src/site-config");

const plugins_static_pages = require("./config/gc-plugins-static-pages");
const plugins_common = require("./config/gc-plugins-common");
const plugins_theme = require("./config/gc-plugins-theme");

const flags = {
  DEV_SSR: false,
};

module.exports = {
  siteMetadata,
  plugins: [
    // web app manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: appManifest,
    },

    // static pages plugins
    ...plugins_static_pages,

    // common plugins
    ...plugins_common,

    // theme plugins
    ...plugins_theme,
  ],
  flags,
};
