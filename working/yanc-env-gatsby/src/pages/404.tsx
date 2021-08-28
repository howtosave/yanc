import * as React from "react";
import { PageProps } from "gatsby";

import { Layout } from "../components";
import { siteMetadata } from "~/site-config";

interface Props extends PageProps {}

const NotFoundPage: React.FC<Props> = ({ location }) => (
  <Layout siteMetadata={siteMetadata} location={location} pageTitle="404: Not found">
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
