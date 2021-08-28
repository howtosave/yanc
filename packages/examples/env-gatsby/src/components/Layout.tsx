import React from "react";

import View from "../component-views/Layout";

interface Props {
  pageTitle?: string;
  siteMetadata?: SiteMetadata;
  location: Location;
}

const Layout: React.FC<Props> = ({ pageTitle, siteMetadata, location, children }) => {
  return (
    <>
      <View pageTitle={pageTitle} siteMetadata={siteMetadata} location={location}>
        {children}
      </View>
    </>
  );
};

export { Layout };
