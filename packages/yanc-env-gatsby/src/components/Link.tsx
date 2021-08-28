/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import { navigate } from "@reach/router";

import { LocalizedLink } from "gatsby-theme-my-i18n";

const USE_LOCALIZED_LINK = !!process.env.GATSBY_LOCALES;

interface NormalLinkProps extends Omit<GatsbyLinkProps<unknown>, "ref"> {
  localized?: boolean;
  to: string;
  language?: string;
}

interface HashLinkProps {
  to: string;
}

const HashLink: React.FC<HashLinkProps> = ({ to, ...rest }) => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // console.log(">>>>> HASHLINK:", e.currentTarget.hash);
    navigate(e.currentTarget.hash);
  };
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={to} onClick={onClick} {...rest} />;
};

const isHash = (to: string): boolean => {
  return !!to && to[0] === "#";
};

const Link: React.FC<NormalLinkProps> = (args) => {
  const { localized = USE_LOCALIZED_LINK, language, ...rest } = args;
  const { to } = rest;
  if (isHash(to)) {
    return <HashLink {...rest} />;
  }
  if (localized) {
    return <LocalizedLink language={language} {...rest} />;
  }
  // gatsby link
  return <GatsbyLink {...rest} />;
};

export { Link };
