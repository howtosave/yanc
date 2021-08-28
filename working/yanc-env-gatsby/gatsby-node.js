// gatsby-node.js

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const customWebpackConfig = require("./config/gn-webpack-config");

exports.createPages = async (ctx) => {
  //
  // Create pages
  //
};

exports.onCreateWebpackConfig = (ctx) => {
  //
  // Customize webpack config
  //
  customWebpackConfig(ctx);
};
