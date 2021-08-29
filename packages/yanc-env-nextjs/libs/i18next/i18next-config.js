const {
  i18next: { defaultLangCode, defaultNS, ns, fallbackLng, enabledLocales, langResourcesDir },
} = require("../../site-config");

const i18nextOptions = {
  lng: defaultLangCode,
  defaultNS,
  ns,
  fallbackLng,
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  missingKeyHandler: (lng, ns, key, fallbackValue) =>
    // eslint-disable-next-line no-console
    console.log(`*** Missing Key: ${lng}:${ns}.${key} => ${fallbackValue}`),
};

module.exports = {
  defaultNS,
  i18nextOptions,
  enabledLocales,
  defaultLangCode,
  langResourcesDir,
};
