// site-config.js

const availableLocales = require("./locale-config.json");

//
// site prefix url for gatsby build
const pathPrefix = "/default";

//
// site metadata for gatsby
const siteMetadata = {
  title: "YANC Gatsby",
  shortTitle: "YANC",
  siteUrl: `http://localhost:9001/${pathPrefix}`,
  author: `@peterhs.kang`,
  twitter: `peterhskang`,
  copyright: `Copyright © 2020.`,
};

//
// enabled locales
const enabledLocales = {
  ko: {
    name: "YANC 개츠비",
    short_name: "YANC",
    description: "YANC 웹 애플리케이션",
    start_url: `/`, // do not append 'pathPrefix'.
    lang: "ko",
  },
  en: {
    name: "YANC Gatsby",
    short_name: "YANC",
    description: "YANC Web Application",
    start_url: `/en/`,
    lang: "en",
  },
};

//
// config for i18n packages
const localizationConfig = {
  defaultNS: "common",
  ns: ["common", "page-index", "page-login"],
  defaultLangCode: `ko`,
  defaultLang: `ko-KR`,
  enabledLocales: Object.keys(enabledLocales),
};

//
// config for gatsby-plugin-manifest
// See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
const appManifest = {
  background_color: `#20232a`,
  theme_color: `#20232a`,
  display: `minimal-ui`, // `stand-alone`
  icons: [
    // path from <root>/static
    {
      src: "/img/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/img/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  // localization
  ...enabledLocales.ko,
  localize: [enabledLocales.en],
};

module.exports = {
  siteMetadata,
  appManifest,
  pathPrefix,
  availableLocales,
  localizationConfig,
};
