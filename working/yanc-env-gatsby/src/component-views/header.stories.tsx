import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from "./Header";

export default {
  title: "Component-views/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Header> = (args: any) => <Header {...args} />;

export const HeaderDefault = Template.bind({});
HeaderDefault.args = {
  siteTitle: "My header",
};
