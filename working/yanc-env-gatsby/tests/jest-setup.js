/* eslint-disable no-undef */
// jest-setup.js

require(`@testing-library/jest-dom/extend-expect`);

jest.setTimeout(30000);

//
// react-i18next mock
//
// See https://react.i18next.com/misc/testing
// TODO
// See https://react.i18next.com/misc/testing#testing-without-stubbing
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: (k) => k };
    return Component;
  },
}));
