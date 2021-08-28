import React from "react";
import { graphql, PageProps } from "gatsby";

import View from "../page-views/index";

interface DataType {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

interface Props extends PageProps<DataType> {}

const Index: React.FC<Props> = ({ data, location }) => {
  return <View location={location} data={data} />;
};

export default Index;

export const staticQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
