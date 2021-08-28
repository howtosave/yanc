import React from "react";

import View from "../component-views/Footer";

interface Props {
  location: Location;
  siteMetadata?: SiteMetadata;
  pure?: boolean;
}

const Footer: React.FC<Props> = ({ location, siteMetadata = {}, pure = false }) => {
  return <View location={location} siteMetadata={siteMetadata} pure={pure} />;
};

export { Footer };
