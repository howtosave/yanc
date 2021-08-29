const { i18n, i18next, localePath } = require("./i18n");

const basePath = ``;

//
// site metadata for gatsby
const siteMetadata = {
  title: "YANC Next.js",
  shortTitle: "YANC",
  siteUrl: `http://localhost:9001/${basePath}`,
  author: `@peterhs.kang`,
  twitter: `peterhskang`,
  copyright: `Copyright © 2020.`,
};

module.exports = {
  siteMetadata,
  i18n,
  i18next,
  localePath,  
  basePath,
};
