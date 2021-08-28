import React from "react";
import { I18nextProvider } from "react-i18next";

// load i18n
import { loadLanguage, i18next } from "./i18n";

interface Props {
  pageContext: any;
}

const Context: React.FC<Props> = ({ children, pageContext }) => {
  const { locale } = pageContext;

  if (locale !== i18next.language) loadLanguage(locale);

  /*  
  useEffect(() => {
    const updateI18N = async (): Promise<void> => {
      await loadLanguages(locale, "");
      if (locale !== i18nInstance.language) await i18nInstance.changeLanguage(locale);
    };
    updateI18N();
  }, [locale, i18nInstance, loadLanguages]);
*/
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default Context;
