
module.exports = {
  "stories": [
    "../components/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../pages-view/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    //"storybook-addon-apollo-client",
  ],
  core: {
    builder: "webpack5",
  },
}
