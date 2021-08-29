import React from "react";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "../styles/index.css";


function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
