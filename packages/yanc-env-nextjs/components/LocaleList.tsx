/* eslint-disable jsx-a11y/no-onchange */
import React, { useContext } from "react";
import { useRouter } from "next/router";

let s = require("./locale-list.module.css");
s = s.default || s;

interface LocaleInfo {
  code: string;
  localName: string;
}
interface PropsView {
  locales: LocaleInfo[];
  currentLocale: string;
  onChange: (e) => void;
}

const View: React.FC<PropsView> = ({ locales, currentLocale, onChange }) => (
  <select
    onChange={onChange}
    defaultValue={currentLocale}
    className={`form-select-sm ${s.localeSelect}`}
  >
    {locales.map((e) => (
      <option key={e.code} value={e.code}>
        {e.localName}
      </option>
    ))}
  </select>
);

interface Props {}

const getLangCodeFromPath = (langConfig: any[], pathName: string): string => {
  const [, langCode] = pathName.split("/");
  if (langCode.length !== 2 || langConfig.findIndex((e) => e.code === langCode) === -1) return "";
  return langCode;
};

const localeInfo = {
  "ko-KR": {
    localName: "한글",
  },
  "en-US": {
    localName: "English"
  },
};

const makeLocales = (locales: string[]): LocaleInfo[] => (
  locales.map((name) => ({
    code: name,
    localName: localeInfo[name].localName,
  }))
);

const LocaleList: React.FC<Props> = (props) => {
  const { locales, locale: currentLocale, pathname, push: navigate } = useRouter();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value === currentLocale) return;
    // refresh the current page
    navigate(pathname, pathname, { locale: e.target.value });
  }

  return <View locales={makeLocales(locales)} currentLocale={currentLocale} onChange={onChange} />;
};

export { LocaleList };
