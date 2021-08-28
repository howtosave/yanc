// static pages plugins for gatsby-config.js

module.exports = [
  {
    resolve: `gatsby-plugin-page-creator`,
    options: {
      path: `${__dirname}/../src/pages`,
      ignore: {
        // default value: template-*, __tests__/*, *.test.jsx?, *.spec.jsx?, *.d.tsx?,
        // *.json, *.yaml, _*, .*
        patterns: [
          // story files
          `**/*.stories.(jsx|tsx)`,
        ],
      },
    },
  },
];
