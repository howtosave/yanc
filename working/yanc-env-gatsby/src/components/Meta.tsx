import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  siteMetadata?: SiteMetadata;
  pageTitle?: string;
}

const Meta: React.FC<Props> = ({ siteMetadata = {}, pageTitle }) => {
  const { title = "", siteUrl = "", description = "" } = siteMetadata;
  const titleBar = pageTitle ? `${pageTitle} | ${title}` : title;
  const siteImage = siteUrl ? `${siteUrl}/img/icon.png` : "";
  return (
    <Helmet titleTemplate={`%s | ${title}`} defaultTitle={title} title={pageTitle}>
      <title>{pageTitle}</title>
      <meta property="og:title" content={titleBar} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />
    </Helmet>
  );
};

export { Meta };
