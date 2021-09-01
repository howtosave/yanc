// site-config/i18n.js

const path = require("path");

//
// enabled locales
const enabledLocales = {
  ko: {
    name: "YANC 넥스트",
    short_name: "YANC",
    description: "YANC 웹 애플리케이션",
    start_url: `/`, // do not append 'pathPrefix'.
    lang: "ko",
  },
  en: {
    name: "YANC Next.js",
    short_name: "YANC",
    description: "YANC Web Application",
    start_url: `/en/`,
    lang: "en",
  },
};

//
// config for i18next packages
const i18nextConfig = {
  defaultNS: "common",
  ns: ["common", "page-index", "page-login"],
  defaultLangCode: `ko-KR`,
  defaultLang: `Korean`,
  fallbackLng: "en-US",
  enabledLocales: Object.keys(enabledLocales),
};

// See https://nextjs.org/docs/advanced-features/i18n-routing
const nextjsConfig = {
  // These are all the locales you want to support in
  // your application
  locales: ['ko-KR', 'en-US'],
  // This is the default locale you want to be used when visiting
  // a non-locale prefixed path e.g. `/hello`
  defaultLocale: 'ko-KR',
  //localeDetection: false,
};

module.exports = {
  i18n: nextjsConfig,
  i18next: i18nextConfig,
  localePath: path.join(__dirname, "..", "static", "locales"),
};
