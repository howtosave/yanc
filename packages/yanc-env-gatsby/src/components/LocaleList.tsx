import React, { useContext } from "react";
import { navigate, withPrefix } from "gatsby";
import { LocaleContext, useLocalization } from "gatsby-theme-my-i18n";

import View from "../component-views/LocaleList";

interface Props {
  location: Location;
}

const getLangCodeFromPath = (langConfig: any[], pathName: string): string => {
  const [, langCode] = pathName.split("/");
  if (langCode.length !== 2 || langConfig.findIndex((e) => e.code === langCode) === -1) return "";
  return langCode;
};

const LocaleList: React.FC<Props> = ({ location }) => {
  // path name without path-prefix. /prefixed/en/url => /en/url
  const pathName = location.pathname.replace(withPrefix("/"), "/");
  // current locale
  const locale = useContext<string>(LocaleContext);
  // locale information
  const { config, defaultLang, prefixDefault, localizedPath } = useLocalization();
  // language code from path name
  const urlLangCode = getLangCodeFromPath(config, pathName);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value === locale) return;
    // refresh the current page
    const purePath = urlLangCode ? pathName.substr(3) : pathName;
    const path = localizedPath({
      defaultLang,
      prefixDefault,
      locale: e.target.value,
      path: purePath,
    });

    // N.B.
    // reload the current page with the selected locale
    // The locale in the context will be changed.
    navigate(path);
  }

  return <View items={config} defaultValue={urlLangCode || defaultLang} onChange={onChange} />;
};

export { LocaleList };
