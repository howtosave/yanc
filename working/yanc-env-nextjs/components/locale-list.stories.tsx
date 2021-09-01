import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LocaleList } from "./LocaleList";

export default {
  title: "Components/LocaleList",
  component: LocaleList,
} as ComponentMeta<typeof LocaleList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LocaleList> = (args: any) => <LocaleList {...args} />;

export const Default = Template.bind({});
Default.args = {};
