// i18n.ts using react-i18next

import i18next, { Resource, ResourceLanguage, i18n as I18N } from "i18next";
import { initReactI18next } from "react-i18next";

import { i18nextOptions, enabledLocales } from "../../i18n/i18next-config";

const useStaticLoading = true;

const loadLanguageResource = (locale: string, ns: string) =>
  require(`~/langs/${locale}/${ns}.json`);

//
// language resources
//
const resources: Resource = !useStaticLoading
  ? {}
  : enabledLocales.reduce((acc, locale) => {
      acc[locale] = {} as ResourceLanguage;
      i18nextOptions.ns.forEach((ns) => {
        acc[locale][ns] = loadLanguageResource(locale, ns);
      });
      return acc;
    }, {} as Resource);

//
// init i18n
//
i18next.use(initReactI18next).init({
  resources,
  ...i18nextOptions,
});

const loadLanguage = async (locale: string): Promise<void> => {
  if (resources[locale]) {
    i18next.language !== locale && i18next.changeLanguage(locale);
    return;
  }
  // load language
  resources[locale] = {};
  i18nextOptions.ns.forEach((ns) => {
    resources[locale][ns] = loadLanguageResource(locale, ns);
  });
  await i18next.loadLanguages(locale);
};

export { loadLanguage, i18next };
