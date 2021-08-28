import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Footer from "./Footer";

export default {
  title: "Component-views/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Footer> = (args: any) => <Footer {...args} />;

export const FooterDefault = Template.bind({});
FooterDefault.args = {
  siteMetadata: {
    title: "Site title",
  },
  location: window.location,
};
