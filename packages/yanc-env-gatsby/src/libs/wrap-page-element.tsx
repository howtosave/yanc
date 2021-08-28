import React from "react";

import { ThemeProvider } from "./theme";
import I18NProvider from "./i18n/context";

interface Props {
  element: any;
  props: any;
}

const wrapPageElement: React.FC<Props> = ({ element, props: { pageContext, location } }) => (
  <ThemeProvider pageContext={pageContext} location={location}>
    <I18NProvider pageContext={pageContext}>{element}</I18NProvider>
  </ThemeProvider>
);

export { wrapPageElement };
