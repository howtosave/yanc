import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Layout from "./Layout";

export default {
  title: "Components/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Layout> = (args: any) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Default Layout",
};
