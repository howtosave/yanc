import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import LocaleList from "./LocaleList";

export default {
  title: "Component-views/LocaleList",
  component: LocaleList,
} as ComponentMeta<typeof LocaleList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LocaleList> = (args: any) => <LocaleList {...args} />;

export const LocaleListDefault = Template.bind({});
LocaleListDefault.args = {
  items: [
    { code: "ko", localName: "한글" },
    { code: "en", localName: "English" },
  ],
  defaultValue: "ko",
  onChange: () => {},
};
